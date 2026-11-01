"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  BufferGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  Euler,
  Matrix4,
  Quaternion,
  SphereGeometry,
  Vector3,
  type Group,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  createSphereCapGeometry,
  disposeGeometries,
  useCharacterStyle,
  type CharacterDimensions,
  type CharacterLayout,
  type CharacterPartProps,
  type QualitySettings,
  type Vec3,
} from "./characterConfig";

/* -------------------------------------------------------------------------- */
/*  Public interface                                                          */
/* -------------------------------------------------------------------------- */

export type CharacterBodyProps = CharacterPartProps;

/**
 * Joint pivots for animation. Every joint is a `THREE.Group` positioned at the
 * joint centre; rotate it to bend the limb. Values are `null` until mounted.
 * Left = character's left (+X). Rest pose values are the group's initial
 * rotation, so animate by writing to `rotation` (or add offsets to it).
 */
export interface CharacterBodyHandle {
  readonly root: Group | null;
  /** Chest (scale it slightly for breathing). */
  readonly chest: Group | null;
  readonly leftShoulder: Group | null;
  readonly rightShoulder: Group | null;
  readonly leftElbow: Group | null;
  readonly rightElbow: Group | null;
  readonly leftWrist: Group | null;
  readonly rightWrist: Group | null;
  readonly leftHip: Group | null;
  readonly rightHip: Group | null;
  readonly leftKnee: Group | null;
  readonly rightKnee: Group | null;
  readonly leftAnkle: Group | null;
  readonly rightAnkle: Group | null;
}

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                  */
/* -------------------------------------------------------------------------- */

const UNIT_SCALE = new Vector3(1, 1, 1);

function placed<T extends BufferGeometry>(
  geometry: T,
  position: Vec3,
  rotation: Vec3 = [0, 0, 0],
): T {
  const matrix = new Matrix4().compose(
    new Vector3(...position),
    new Quaternion().setFromEuler(new Euler(...rotation)),
    UNIT_SCALE,
  );
  geometry.applyMatrix4(matrix);
  return geometry;
}

/** Capsule whose cylindrical part hangs down from the origin (-Y). */
function hangingCapsule(
  radius: number,
  length: number,
  qs: QualitySettings,
  position: Vec3,
  rotation: Vec3,
): BufferGeometry {
  const radial = Math.max(6, Math.floor(qs.radialSegments * 0.6));
  const geometry = new CapsuleGeometry(radius, length, qs.capSegments, radial);
  geometry.translate(0, -length / 2, 0);
  return placed(geometry, position, rotation);
}

/** Tapered cylinder that starts at the origin and hangs down along -Y. */
function hangingLimb(
  topRadius: number,
  bottomRadius: number,
  length: number,
  radialSegments: number,
): CylinderGeometry {
  const geometry = new CylinderGeometry(topRadius, bottomRadius, length, radialSegments, 1, false);
  geometry.translate(0, -length / 2, 0);
  return geometry;
}

function mergeAndDispose(parts: BufferGeometry[]): BufferGeometry {
  const merged = mergeGeometries(parts, false);
  if (!merged) {
    throw new Error("CharacterBody: could not merge procedural geometry.");
  }
  parts.forEach((part) => part.dispose());
  return merged;
}

/** Left hand (+X side) hanging from the wrist. The right hand mirrors it with scale.x = -1. */
function createHandGeometry(d: CharacterDimensions, qs: QualitySettings): BufferGeometry {
  const palm = new SphereGeometry(1, qs.sphereWidthSegments, qs.sphereHeightSegments);
  palm.scale(d.palmRadius * 0.62, d.palmRadius * 1.05, d.palmRadius * 0.95);
  palm.translate(0, -d.palmRadius * 0.8, 0);

  const parts: BufferGeometry[] = [palm];
  const spacing = d.fingerRadius * 2.15;
  const fingerLengthFactors = [0.92, 1, 0.96, 0.78];

  fingerLengthFactors.forEach((factor, index) => {
    parts.push(
      hangingCapsule(
        d.fingerRadius,
        d.fingerLength * factor,
        qs,
        [-d.palmRadius * 0.12, -d.palmRadius * 1.45, (index - 1.5) * spacing],
        [0, 0, -0.2],
      ),
    );
  });

  parts.push(
    hangingCapsule(
      d.fingerRadius * 1.2,
      d.thumbLength,
      qs,
      [-d.palmRadius * 0.2, -d.palmRadius * 0.5, d.palmRadius * 0.78],
      [-0.85, 0, -0.3],
    ),
  );

  return mergeAndDispose(parts);
}

/** Left foot (+X side) relative to the ankle joint. The right foot mirrors it with scale.x = -1. */
function createFootGeometry(
  d: CharacterDimensions,
  qs: QualitySettings,
  ankleY: number,
): BufferGeometry {
  const soleY = -ankleY;
  const body = new SphereGeometry(1, qs.sphereWidthSegments, qs.sphereHeightSegments);
  body.scale(d.footWidth * 0.5, d.footHeight * 0.5, d.footLength * 0.42);
  body.translate(0, soleY + d.footHeight * 0.5, d.footLength * 0.22);

  const parts: BufferGeometry[] = [body];
  const frontZ = d.footLength * 0.22 + d.footLength * 0.42 - d.toeRadius * 1.2;
  const sizeFactors = [1.25, 1, 0.95, 0.9, 0.82];
  const lengthFactors = [1, 1, 0.95, 0.85, 0.7];

  sizeFactors.forEach((size, index) => {
    const radius = d.toeRadius * size;
    const offset = index - 2; // index 0 is the big toe on the inner (-X) side
    parts.push(
      hangingCapsule(
        radius,
        d.toeLength * lengthFactors[index],
        qs,
        [offset * d.toeRadius * 1.7, soleY + radius * 1.05, frontZ - Math.abs(offset) * d.toeRadius * 0.35],
        [-Math.PI / 2, 0, 0],
      ),
    );
  });

  return mergeAndDispose(parts);
}

function createBodyGeometries(d: CharacterDimensions, qs: QualitySettings, layout: CharacterLayout) {
  const neckHeight = layout.neckPivot[1] + d.neckLength - layout.shoulderY;
  const neck = new CylinderGeometry(d.neckRadius * 0.95, d.neckRadius, neckHeight, qs.radialSegments, 1);
  neck.translate(0, layout.shoulderY + neckHeight / 2, 0);

  return {
    sphere: new SphereGeometry(1, qs.sphereWidthSegments, qs.sphereHeightSegments),
    bellyPatch: createSphereCapGeometry(0.95, qs.sphereWidthSegments, qs.sphereHeightSegments),
    neck,
    upperArm: hangingLimb(d.upperArmRadius, d.upperArmRadius * 0.9, d.upperArmLength, qs.radialSegments),
    forearm: hangingLimb(d.forearmRadius * 1.05, d.forearmRadius * 0.8, d.forearmLength, qs.radialSegments),
    thigh: hangingLimb(d.thighRadius, d.thighRadius * 0.85, d.thighLength, qs.radialSegments),
    shin: hangingLimb(d.shinRadius, d.shinRadius * 0.75, d.shinLength, qs.radialSegments),
    hand: createHandGeometry(d, qs),
    foot: createFootGeometry(d, qs, layout.ankleY),
  };
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const SIDES = [
  { key: "left", sign: 1 },
  { key: "right", sign: -1 },
] as const;

/** Initial joint rotations (radians). */
const REST_POSE = {
  shoulderRoll: 0.16,
  elbowBend: -0.22,
  kneeBend: 0.06,
} as const;

function useLimbRefs() {
  return {
    shoulder: useRef<Group>(null),
    elbow: useRef<Group>(null),
    wrist: useRef<Group>(null),
    hip: useRef<Group>(null),
    knee: useRef<Group>(null),
    ankle: useRef<Group>(null),
  };
}

export const CharacterBody = forwardRef<CharacterBodyHandle, CharacterBodyProps>(
  function CharacterBody(
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
    const { dimensions: d, quality: qs, layout, materials: m } = style;
    const shadows = { castShadow: style.castShadow, receiveShadow: style.receiveShadow };

    const geo = useMemo(() => createBodyGeometries(d, qs, layout), [d, qs, layout]);
    useEffect(() => () => disposeGeometries(Object.values(geo)), [geo]);

    const rootRef = useRef<Group>(null);
    const chestRef = useRef<Group>(null);
    const limbs = { left: useLimbRefs(), right: useLimbRefs() };

    useImperativeHandle(
      ref,
      () => ({
        get root() {
          return rootRef.current;
        },
        get chest() {
          return chestRef.current;
        },
        get leftShoulder() {
          return limbs.left.shoulder.current;
        },
        get rightShoulder() {
          return limbs.right.shoulder.current;
        },
        get leftElbow() {
          return limbs.left.elbow.current;
        },
        get rightElbow() {
          return limbs.right.elbow.current;
        },
        get leftWrist() {
          return limbs.left.wrist.current;
        },
        get rightWrist() {
          return limbs.right.wrist.current;
        },
        get leftHip() {
          return limbs.left.hip.current;
        },
        get rightHip() {
          return limbs.right.hip.current;
        },
        get leftKnee() {
          return limbs.left.knee.current;
        },
        get rightKnee() {
          return limbs.right.knee.current;
        },
        get leftAnkle() {
          return limbs.left.ankle.current;
        },
        get rightAnkle() {
          return limbs.right.ankle.current;
        },
      }),
      // The handle only reads ref objects, which are stable for the component's lifetime.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const torso = d.torsoRadius;

    return (
      <group ref={rootRef} {...groupProps}>
        {/* Pelvis, belly, chest, neck */}
        <mesh
          geometry={geo.sphere}
          material={m.gold}
          position={[0, layout.pelvisY, 0]}
          scale={[d.pelvisRadius * 1.08, d.pelvisRadius * 0.86, d.pelvisRadius * 0.95]}
          {...shadows}
        />
        <mesh
          geometry={geo.sphere}
          material={m.gold}
          position={[0, layout.bellyY, 0]}
          scale={[torso, torso * 1.1, torso * 0.95]}
          {...shadows}
        >
          <mesh geometry={geo.bellyPatch} material={m.belly} scale={1.012} />
        </mesh>
        <group ref={chestRef} position={[0, layout.chestY, 0]}>
          <mesh
            geometry={geo.sphere}
            material={m.gold}
            scale={[torso * 1.05, torso * 1.08, torso * 0.88]}
            {...shadows}
          />
        </group>
        <mesh geometry={geo.neck} material={m.gold} {...shadows} />

        {SIDES.map(({ key, sign }) => {
          const r = limbs[key];
          return (
            <group key={key}>
              {/* Arm */}
              <group
                ref={r.shoulder}
                position={[sign * layout.shoulderX, layout.shoulderY, 0]}
                rotation={[0, 0, sign * REST_POSE.shoulderRoll]}
              >
                <mesh geometry={geo.sphere} material={m.gold} scale={d.shoulderRadius} {...shadows} />
                <mesh geometry={geo.upperArm} material={m.gold} {...shadows} />
                <group
                  ref={r.elbow}
                  position={[0, -d.upperArmLength, 0]}
                  rotation={[REST_POSE.elbowBend, 0, 0]}
                >
                  <mesh
                    geometry={geo.sphere}
                    material={m.gold}
                    scale={d.forearmRadius * 1.05}
                    {...shadows}
                  />
                  <mesh geometry={geo.forearm} material={m.bronze} {...shadows} />
                  <group ref={r.wrist} position={[0, -d.forearmLength, 0]}>
                    <mesh
                      geometry={geo.sphere}
                      material={m.bronze}
                      scale={d.forearmRadius * 0.82}
                      {...shadows}
                    />
                    <mesh
                      geometry={geo.hand}
                      material={m.bronze}
                      scale={[sign, 1, 1]}
                      {...shadows}
                    />
                  </group>
                </group>
              </group>

              {/* Leg */}
              <group ref={r.hip} position={[sign * layout.hipX, layout.hipY, 0]}>
                <mesh
                  geometry={geo.sphere}
                  material={m.gold}
                  scale={d.thighRadius * 1.12}
                  {...shadows}
                />
                <mesh geometry={geo.thigh} material={m.gold} {...shadows} />
                <group
                  ref={r.knee}
                  position={[0, -d.thighLength, 0]}
                  rotation={[REST_POSE.kneeBend, 0, 0]}
                >
                  <mesh
                    geometry={geo.sphere}
                    material={m.gold}
                    scale={d.thighRadius * 0.86}
                    {...shadows}
                  />
                  <mesh geometry={geo.shin} material={m.bronze} {...shadows} />
                  <group
                    ref={r.ankle}
                    position={[0, -d.shinLength, 0]}
                    rotation={[-REST_POSE.kneeBend, 0, 0]}
                  >
                    <mesh
                      geometry={geo.foot}
                      material={m.bronze}
                      scale={[sign, 1, 1]}
                      {...shadows}
                    />
                  </group>
                </group>
              </group>
            </group>
          );
        })}
      </group>
    );
  },
);