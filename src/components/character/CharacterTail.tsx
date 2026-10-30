"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  MeshPhysicalMaterial,
  Quaternion,
  SphereGeometry,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import {
  TAIL_CONTROL_POINT_COUNT,
  useCharacterStyle,
  type CharacterDimensions,
  type CharacterPalette,
  type CharacterPartProps,
  type QualitySettings,
} from "./characterConfig";

/* -------------------------------------------------------------------------- */
/*  Public interface                                                          */
/* -------------------------------------------------------------------------- */

export type CharacterTailProps = CharacterPartProps;

/**
 * Animation interface for the tail. Control points live in the tail's local
 * space (origin = tail root, inside the pelvis; the tail extends toward -Z).
 *
 * Per-frame update without allocations:
 *
 *   const pts = tail.controlPoints;      // live Vector3[] (length TAIL_CONTROL_POINT_COUNT)
 *   pts[i].set(x, y, z);                 // mutate in place
 *   tail.commit();                       // rewrites the vertex buffers once
 *
 * Or replace everything with `setControlPoints(points)`. Geometry topology
 * never changes, so no React re-render or scene rebuild is involved.
 */
export interface CharacterTailHandle {
  readonly root: Group | null;
  /** Pivot at the tail root. Rotate it to swing the whole tail. */
  readonly base: Group | null;
  readonly mesh: Mesh | null;
  /** Live control points. Mutate in place, then call `commit()`. */
  readonly controlPoints: Vector3[];
  /** Rest-pose control points (a copy; safe to read every frame). */
  readonly restPoints: ReadonlyArray<Vector3>;
  /** Copies the given points into the curve and updates the geometry. */
  setControlPoints(points: ReadonlyArray<Vector3>): void;
  /** Rebuilds the vertex buffers from `controlPoints`. */
  commit(): void;
  /** Restores the rest pose. */
  reset(): void;
}

/* -------------------------------------------------------------------------- */
/*  Tail rig (non-React): curve + fixed-topology tube geometry                */
/* -------------------------------------------------------------------------- */

interface TailRig {
  geometry: BufferGeometry;
  curve: CatmullRomCurve3;
  /** Position of the last ring centre; updated by `rebuild`. */
  tip: Vector3;
  rest: Vector3[];
  rebuild(): void;
}

/** Planar rest curve: trails backward and down, then sweeps up in a curl. */
function createRestPoints(d: CharacterDimensions): Vector3[] {
  const count = TAIL_CONTROL_POINT_COUNT;
  const step = d.tailLength / (count - 1);
  const points: Vector3[] = [new Vector3(0, 0, 0)];
  for (let i = 0; i < count - 1; i += 1) {
    const u = i / (count - 1);
    const angle = -0.4 + 2.9 * Math.pow(u, 1.3);
    const previous = points[i];
    points.push(
      new Vector3(previous.x, previous.y + Math.sin(angle) * step, previous.z - Math.cos(angle) * step),
    );
  }
  return points;
}

function createTailRig(d: CharacterDimensions, qs: QualitySettings, palette: CharacterPalette): TailRig {
  const tubular = qs.tailTubularSegments;
  const radial = qs.tailRadialSegments;
  const rings = tubular + 1;
  const vertexCount = rings * radial;

  const rest = createRestPoints(d);
  const curve = new CatmullRomCurve3(rest.map((p) => p.clone()), false, "catmullrom", 0.5);

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const indices: number[] = [];

  for (let i = 0; i < tubular; i += 1) {
    for (let j = 0; j < radial; j += 1) {
      const jNext = (j + 1) % radial;
      const a = i * radial + j;
      const b = i * radial + jNext;
      const c = (i + 1) * radial + jNext;
      const e = (i + 1) * radial + j;
      indices.push(a, b, e, b, c, e);
    }
  }

  // Static colour gradient: gold -> bronze -> dark bronze tip.
  const gold = new Color(palette.gold);
  const bronze = new Color(palette.bronze);
  const dark = new Color(palette.bronzeDark);
  const color = new Color();
  for (let i = 0; i < rings; i += 1) {
    const u = i / tubular;
    if (u < 0.55) {
      color.lerpColors(gold, bronze, u / 0.55);
    } else {
      color.lerpColors(bronze, dark, (u - 0.55) / 0.45);
    }
    for (let j = 0; j < radial; j += 1) {
      const o = (i * radial + j) * 3;
      colors[o] = color.r;
      colors[o + 1] = color.g;
      colors[o + 2] = color.b;
    }
  }

  const geometry = new BufferGeometry();
  const positionAttribute = new BufferAttribute(positions, 3);
  const normalAttribute = new BufferAttribute(normals, 3);
  positionAttribute.setUsage(35048); // THREE.DynamicDrawUsage
  normalAttribute.setUsage(35048);
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("normal", normalAttribute);
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setIndex(indices);

  // Scratch objects, reused on every rebuild.
  const samples = Array.from({ length: rings }, () => new Vector3());
  const tangents = Array.from({ length: rings }, () => new Vector3());
  const normalVec = new Vector3();
  const binormal = new Vector3();
  const offset = new Vector3();
  const rotation = new Quaternion();
  const tip = new Vector3();

  function rebuild(): void {
    for (let i = 0; i < rings; i += 1) {
      curve.getPoint(i / tubular, samples[i]);
    }
    for (let i = 0; i < rings; i += 1) {
      tangents[i]
        .subVectors(samples[Math.min(i + 1, tubular)], samples[Math.max(i - 1, 0)])
        .normalize();
    }

    // Parallel-transport frames avoid twisting when the curve bends.
    normalVec.set(1, 0, 0);
    if (Math.abs(tangents[0].x) > 0.9) normalVec.set(0, 1, 0);
    normalVec.addScaledVector(tangents[0], -normalVec.dot(tangents[0])).normalize();

    for (let i = 0; i < rings; i += 1) {
      if (i > 0) {
        rotation.setFromUnitVectors(tangents[i - 1], tangents[i]);
        normalVec.applyQuaternion(rotation);
        normalVec.addScaledVector(tangents[i], -normalVec.dot(tangents[i])).normalize();
      }
      binormal.crossVectors(tangents[i], normalVec);

      const u = i / tubular;
      const radius = d.tailBaseRadius + (d.tailTipRadius - d.tailBaseRadius) * Math.pow(u, 0.85);

      for (let j = 0; j < radial; j += 1) {
        const angle = (j / radial) * Math.PI * 2;
        offset
          .copy(normalVec)
          .multiplyScalar(Math.cos(angle))
          .addScaledVector(binormal, Math.sin(angle));
        const o = (i * radial + j) * 3;
        normals[o] = offset.x;
        normals[o + 1] = offset.y;
        normals[o + 2] = offset.z;
        positions[o] = samples[i].x + offset.x * radius;
        positions[o + 1] = samples[i].y + offset.y * radius;
        positions[o + 2] = samples[i].z + offset.z * radius;
      }
    }

    tip.copy(samples[tubular]);
    positionAttribute.needsUpdate = true;
    normalAttribute.needsUpdate = true;
  }

  rebuild();
  return { geometry, curve, tip, rest, rebuild };
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const CharacterTail = forwardRef<CharacterTailHandle, CharacterTailProps>(
  function CharacterTail(
    {
      quality,
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow,
      receiveShadow,
      ...groupProps
    },
    ref,
  ) {
    const style = useCharacterStyle({
      quality,
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow,
      receiveShadow,
    });
    const { dimensions: d, quality: qs, layout, palette: pal, materialSettings: settings, materials } = style;

    const rig = useMemo(() => createTailRig(d, qs, pal), [d, qs, pal]);
    useEffect(() => () => rig.geometry.dispose(), [rig]);

    // Vertex colours carry the gradient, so the tube needs its own material.
    const tubeMaterial = useMemo(
      () =>
        new MeshPhysicalMaterial({
          color: "#ffffff",
          vertexColors: true,
          roughness: settings.fur.roughness,
          metalness: settings.fur.metalness,
          clearcoat: settings.fur.clearcoat,
          clearcoatRoughness: settings.fur.clearcoatRoughness,
        }),
      [settings],
    );
    useEffect(() => () => tubeMaterial.dispose(), [tubeMaterial]);

    const tipGeometry = useMemo(
      () => new SphereGeometry(1, qs.sphereWidthSegments, qs.sphereHeightSegments),
      [qs],
    );
    useEffect(() => () => tipGeometry.dispose(), [tipGeometry]);

    const rootRef = useRef<Group>(null);
    const baseRef = useRef<Group>(null);
    const meshRef = useRef<Mesh>(null);
    const tipRef = useRef<Mesh>(null);

    const restPointsCache = useMemo(() => rig.rest.map((p) => p.clone()), [rig]);

    useImperativeHandle(
      ref,
      () => {
        const commit = (): void => {
          rig.rebuild();
          tipRef.current?.position.copy(rig.tip);
        };
        return {
          get root() {
            return rootRef.current;
          },
          get base() {
            return baseRef.current;
          },
          get mesh() {
            return meshRef.current;
          },
          get controlPoints() {
            return rig.curve.points;
          },
          get restPoints() {
            return restPointsCache;
          },
          setControlPoints(points: ReadonlyArray<Vector3>) {
            const target = rig.curve.points;
            while (target.length < points.length) target.push(new Vector3());
            target.length = points.length;
            points.forEach((p, i) => target[i].copy(p));
            commit();
          },
          commit,
          reset() {
            rig.rest.forEach((p, i) => rig.curve.points[i].copy(p));
            commit();
          },
        };
      },
      [rig],
    );

    return (
      <group ref={rootRef} {...groupProps}>
        <group ref={baseRef} position={layout.tailRoot}>
          {/* The tube's vertices are rewritten in place, so culling uses no stale bounds. */}
          <mesh
            ref={meshRef}
            geometry={rig.geometry}
            material={tubeMaterial}
            frustumCulled={false}
            castShadow={style.castShadow}
            receiveShadow={style.receiveShadow}
          />
          <mesh
            ref={tipRef}
            geometry={tipGeometry}
            material={materials.bronzeDark}
            position={rig.tip}
            scale={d.tailTipRadius * 1.25}
            castShadow={style.castShadow}
            receiveShadow={style.receiveShadow}
          />
        </group>
      </group>
    );
  },
);