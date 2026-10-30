"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  BufferGeometry,
  CylinderGeometry,
  Euler,
  Group,
  Matrix4,
  Quaternion,
  Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useFrame } from "@react-three/fiber";
import {
  disposeGeometries,
  useCharacterStyle,
  type CharacterDimensions,
  type CharacterPartProps,
  type QualityLevel,
  type Vec3,
} from "./characterConfig";
import type { CharacterBodyHandle } from "./CharacterBody";
import type { CharacterFaceHandle } from "./CharacterFace";
import type { CharacterTailHandle } from "./CharacterTail";

/* -------------------------------------------------------------------------- */
/*  Public Interface                                                          */
/* -------------------------------------------------------------------------- */

export interface CharacterFurProps extends CharacterPartProps {
  /** Optional body handle to synchronize fur with body limb animation */
  bodyRef?: React.RefObject<CharacterBodyHandle | null>;
  /** Optional face handle to synchronize fur with head nod/turn animation */
  faceRef?: React.RefObject<CharacterFaceHandle | null>;
  /** Optional tail handle to synchronize fur with tail movement */
  tailRef?: React.RefObject<CharacterTailHandle | null>;
  /** Multiplier for overall fur length (default 1.0) */
  furLengthScale?: number;
  /** Multiplier for fur density (default 1.0) */
  furDensityScale?: number;
}

export interface CharacterFurHandle {
  readonly root: Group | null;
  readonly headGroup: Group | null;
  readonly chestGroup: Group | null;
  readonly leftShoulderGroup: Group | null;
  readonly rightShoulderGroup: Group | null;
  readonly leftForearmGroup: Group | null;
  readonly rightForearmGroup: Group | null;
  readonly tailGroup: Group | null;
}

/* -------------------------------------------------------------------------- */
/*  Procedural Fur Tuft Geometry Builder                                      */
/* -------------------------------------------------------------------------- */

function placed<T extends BufferGeometry>(
  geometry: T,
  position: Vec3,
  rotation: Vec3 = [0, 0, 0],
  scale: Vec3 = [1, 1, 1],
): T {
  const matrix = new Matrix4().compose(
    new Vector3(...position),
    new Quaternion().setFromEuler(new Euler(...rotation)),
    new Vector3(...scale),
  );
  geometry.applyMatrix4(matrix);
  return geometry;
}

/**
 * Creates a stylized curved fur tuft clump consisting of 2-3 overlapping curved blades.
 * Uses lightweight conical/tapered segments with normal calculation for rich specular highlights.
 */
function createCurvedBladeGeometry(
  baseRadius: number,
  length: number,
  curveAmount: number,
  radialSegments: number,
  heightSegments: number,
): BufferGeometry {
  const radial = Math.max(4, radialSegments);
  const rows = Math.max(3, heightSegments);
  const geom = new CylinderGeometry(baseRadius * 0.12, baseRadius, length, radial, rows, false);

  // Curve and taper vertices along -Z while extending along +Y
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const y = pos.getY(i);
    // fraction from base (0) to tip (1)
    const u = Math.max(0, Math.min(1, (y + length * 0.5) / length));
    const bend = Math.pow(u, 1.8) * curveAmount;
    pos.setZ(i, pos.getZ(i) - bend);
    // Subtle lateral sweep
    pos.setX(i, pos.getX(i) * (1 - u * 0.6));
  }

  // Anchor the base at origin (y=0) pointing along +Y
  geom.translate(0, length * 0.5, 0);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a cluster of 3 fanned fur blades forming a single stylized tuft clump.
 */
function createClumpGeometry(
  scale: number,
  curvature: number,
  radialSegments: number,
  heightSegments: number,
): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const baseR = 0.016 * scale;
  const len = 0.08 * scale;

  // Central main blade
  parts.push(createCurvedBladeGeometry(baseR, len, curvature * 0.035, radialSegments, heightSegments));

  // Secondary side blade 1
  parts.push(
    placed(
      createCurvedBladeGeometry(baseR * 0.8, len * 0.82, curvature * 0.03, radialSegments, heightSegments),
      [-baseR * 0.7, 0, baseR * 0.2],
      [0, -0.2, 0.22],
      [0.85, 0.85, 0.85],
    ),
  );

  // Secondary side blade 2
  parts.push(
    placed(
      createCurvedBladeGeometry(baseR * 0.75, len * 0.74, curvature * 0.038, radialSegments, heightSegments),
      [baseR * 0.7, 0, baseR * 0.15],
      [0, 0.2, -0.25],
      [0.8, 0.8, 0.8],
    ),
  );

  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());
  if (!merged) {
    return new CylinderGeometry(baseR, baseR * 0.1, len, 4, 2);
  }
  return merged;
}

/* -------------------------------------------------------------------------- */
/*  Procedural Placement for Fur Regions                                      */
/* -------------------------------------------------------------------------- */

interface FurTuftDef {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
}

function getQualityMultipliers(quality: QualityLevel) {
  switch (quality) {
    case "low":
      return { radial: 4, height: 3, density: 0.5 };
    case "high":
      return { radial: 6, height: 6, density: 1.6 };
    case "medium":
    default:
      return { radial: 5, height: 4, density: 1.0 };
  }
}

/**
 * Builds cheek fur tufts fanning out laterally and backward from the jawline.
 * Cream at the base/center transitioning to gold outward.
 */
function buildCheekTufts(
  d: CharacterDimensions,
  sign: 1 | -1,
  densityMult: number,
  lenMult: number,
): FurTuftDef[] {
  const R = d.headRadius;
  const count = Math.max(3, Math.round(7 * densityMult));
  const tufts: FurTuftDef[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    // Follow the lower jaw/cheek contour
    const angle = 0.2 + t * 0.95;
    const x = sign * (0.34 + Math.sin(angle) * 0.38) * R;
    const y = (-0.08 - Math.cos(angle) * 0.3) * R;
    const z = (0.58 - t * 0.42) * R;

    const rotX = 0.25 - t * 0.15;
    const rotY = sign * (0.85 + t * 0.4);
    const rotZ = sign * (-0.75 - t * 0.35);

    const s = (0.9 + 0.35 * Math.sin(t * Math.PI)) * lenMult * (R / 0.29);
    tufts.push({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [s, s * 1.15, s],
    });
  }

  return tufts;
}

/**
 * Builds crown & brow crest tufts swept backward over the skull.
 */
function buildCrownTufts(
  d: CharacterDimensions,
  densityMult: number,
  lenMult: number,
): FurTuftDef[] {
  const R = d.headRadius;
  const count = Math.max(4, Math.round(10 * densityMult));
  const tufts: FurTuftDef[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const z = (0.28 - t * 0.72) * R;
    const yArc = Math.sqrt(Math.max(0, 1 - Math.pow(z / R, 2)));
    const y = yArc * R * 0.99;
    const xSpread = (Math.sin(i * 3.7) * 0.28) * R * (1 - t * 0.4);

    const rotX = -1.1 - t * 0.5;
    const rotY = Math.sin(i * 2.1) * 0.2;
    const rotZ = (xSpread / R) * 0.6;

    const s = (0.85 + 0.3 * Math.cos(t * Math.PI)) * lenMult * (R / 0.29);
    tufts.push({
      position: [xSpread, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [s * 0.9, s * 1.1, s * 0.9],
    });
  }

  return tufts;
}

/**
 * Builds shoulder mantle tufts cascading over the deltoid and upper chest.
 */
function buildShoulderTufts(
  d: CharacterDimensions,
  sign: 1 | -1,
  densityMult: number,
  lenMult: number,
): FurTuftDef[] {
  const r = d.shoulderRadius;
  const count = Math.max(3, Math.round(6 * densityMult));
  const tufts: FurTuftDef[] = [];

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 1.4 - Math.PI * 0.2;
    const x = sign * (Math.cos(angle) * r * 1.05 + 0.01);
    const y = Math.sin(angle) * r * 0.65;
    const z = (Math.sin(i * 2.5) * 0.35) * r;

    const rotX = 0.3 + (i % 2) * 0.2;
    const rotY = sign * 0.35;
    const rotZ = sign * (-0.75 - (i / count) * 0.4);

    const s = 1.05 * lenMult * (d.torsoRadius / 0.19);
    tufts.push({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [s, s * 1.25, s],
    });
  }

  return tufts;
}

/**
 * Builds forearm tufts along the outer posterior ridge.
 */
function buildForearmTufts(
  d: CharacterDimensions,
  sign: 1 | -1,
  densityMult: number,
  lenMult: number,
): FurTuftDef[] {
  const len = d.forearmLength;
  const radius = d.forearmRadius;
  const count = Math.max(2, Math.round(4 * densityMult));
  const tufts: FurTuftDef[] = [];

  for (let i = 0; i < count; i += 1) {
    const u = (i + 0.5) / count;
    const y = -u * len;
    const x = sign * radius * 0.98;
    const z = -radius * 0.4;

    const rotX = -0.55;
    const rotY = sign * 0.25;
    const rotZ = sign * -0.65;

    const s = 0.8 * lenMult;
    tufts.push({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [s, s * 1.1, s],
    });
  }

  return tufts;
}

/**
 * Builds tail tufts around the base and mid-section.
 */
function buildTailTufts(
  d: CharacterDimensions,
  densityMult: number,
  lenMult: number,
): FurTuftDef[] {
  const count = Math.max(3, Math.round(6 * densityMult));
  const tufts: FurTuftDef[] = [];
  const baseR = d.tailBaseRadius;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * baseR * 1.08;
    const y = Math.sin(angle) * baseR * 1.08;
    const z = -0.04 - (i % 2) * 0.05;

    const rotX = Math.sin(angle) * 0.4 - 0.3;
    const rotY = -Math.cos(angle) * 0.4;
    const rotZ = angle;

    const s = 0.9 * lenMult;
    tufts.push({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [s, s * 1.15, s],
    });
  }

  return tufts;
}

function mergeTuftCluster(
  tufts: FurTuftDef[],
  baseClump: BufferGeometry,
): BufferGeometry {
  if (tufts.length === 0) {
    return new BufferGeometry();
  }
  const instances: BufferGeometry[] = tufts.map((t) =>
    placed(baseClump.clone(), t.position, t.rotation, t.scale),
  );
  const merged = mergeGeometries(instances, false);
  instances.forEach((inst) => inst.dispose());
  return merged ?? new BufferGeometry();
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const CharacterFur = forwardRef<CharacterFurHandle, CharacterFurProps>(
  function CharacterFur(
    {
      quality = "medium",
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow = true,
      receiveShadow = true,
      bodyRef,
      faceRef,
      tailRef,
      furLengthScale = 1.0,
      furDensityScale = 1.0,
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
    const { dimensions: d, layout, materials: m } = style;
    const shadows = { castShadow: style.castShadow, receiveShadow: style.receiveShadow };

    const qConfig = getQualityMultipliers(quality);
    const densityMult = qConfig.density * furDensityScale;
    const lenMult = furLengthScale;

    // Cache merged procedural tuft geometries per region
    const geometries = useMemo(() => {
      const clump = createClumpGeometry(1.0, 1.2, qConfig.radial, qConfig.height);

      const cheekLeft = mergeTuftCluster(buildCheekTufts(d, 1, densityMult, lenMult), clump);
      const cheekRight = mergeTuftCluster(buildCheekTufts(d, -1, densityMult, lenMult), clump);
      const crown = mergeTuftCluster(buildCrownTufts(d, densityMult, lenMult), clump);

      const shoulderLeft = mergeTuftCluster(buildShoulderTufts(d, 1, densityMult, lenMult), clump);
      const shoulderRight = mergeTuftCluster(buildShoulderTufts(d, -1, densityMult, lenMult), clump);

      const forearmLeft = mergeTuftCluster(buildForearmTufts(d, 1, densityMult, lenMult), clump);
      const forearmRight = mergeTuftCluster(buildForearmTufts(d, -1, densityMult, lenMult), clump);

      const tail = mergeTuftCluster(buildTailTufts(d, densityMult, lenMult), clump);

      clump.dispose();

      return {
        cheekLeft,
        cheekRight,
        crown,
        shoulderLeft,
        shoulderRight,
        forearmLeft,
        forearmRight,
        tail,
      };
    }, [d, densityMult, lenMult, qConfig.radial, qConfig.height]);

    useEffect(() => () => disposeGeometries(Object.values(geometries)), [geometries]);

    // Local region group refs
    const rootRef = useRef<Group>(null);
    const headGroupRef = useRef<Group>(null);
    const chestGroupRef = useRef<Group>(null);
    const leftShoulderGroupRef = useRef<Group>(null);
    const rightShoulderGroupRef = useRef<Group>(null);
    const leftForearmGroupRef = useRef<Group>(null);
    const rightForearmGroupRef = useRef<Group>(null);
    const tailGroupRef = useRef<Group>(null);

    useImperativeHandle(
      ref,
      () => ({
        get root() {
          return rootRef.current;
        },
        get headGroup() {
          return headGroupRef.current;
        },
        get chestGroup() {
          return chestGroupRef.current;
        },
        get leftShoulderGroup() {
          return leftShoulderGroupRef.current;
        },
        get rightShoulderGroup() {
          return rightShoulderGroupRef.current;
        },
        get leftForearmGroup() {
          return leftForearmGroupRef.current;
        },
        get rightForearmGroup() {
          return rightForearmGroupRef.current;
        },
        get tailGroup() {
          return tailGroupRef.current;
        },
      }),
      [],
    );

    // Synchronize fur regions with animated character joints if handles are supplied
    useFrame(() => {
      // 1. Head synchronization (neck nod + turn)
      if (faceRef?.current?.neck && faceRef.current.head && headGroupRef.current) {
        headGroupRef.current.position.set(0, layout.neckPivot[1], 0);
        headGroupRef.current.rotation.copy(faceRef.current.neck.rotation);
      }

      // 2. Shoulder synchronization
      if (bodyRef?.current?.leftShoulder && leftShoulderGroupRef.current) {
        leftShoulderGroupRef.current.rotation.copy(bodyRef.current.leftShoulder.rotation);
      }
      if (bodyRef?.current?.rightShoulder && rightShoulderGroupRef.current) {
        rightShoulderGroupRef.current.rotation.copy(bodyRef.current.rightShoulder.rotation);
      }

      // 3. Forearm synchronization
      if (bodyRef?.current?.leftElbow && leftForearmGroupRef.current) {
        leftForearmGroupRef.current.rotation.copy(bodyRef.current.leftElbow.rotation);
      }
      if (bodyRef?.current?.rightElbow && rightForearmGroupRef.current) {
        rightForearmGroupRef.current.rotation.copy(bodyRef.current.rightElbow.rotation);
      }

      // 4. Tail base synchronization
      if (tailRef?.current?.base && tailGroupRef.current) {
        tailGroupRef.current.rotation.copy(tailRef.current.base.rotation);
      }
    });

    return (
      <group ref={rootRef} {...groupProps}>
        {/* Head Fur (Cheeks & Crown) */}
        <group
          ref={headGroupRef}
          position={layout.neckPivot}
        >
          <group position={layout.headOffset}>
            <mesh geometry={geometries.cheekLeft} material={m.cream} {...shadows} />
            <mesh geometry={geometries.cheekRight} material={m.cream} {...shadows} />
            <mesh geometry={geometries.crown} material={m.gold} {...shadows} />
          </group>
        </group>

        {/* Left Arm Fur */}
        <group
          ref={leftShoulderGroupRef}
          position={[layout.shoulderX, layout.shoulderY, 0]}
          rotation={[0, 0, 0.16]}
        >
          <mesh geometry={geometries.shoulderLeft} material={m.gold} {...shadows} />
          <group
            ref={leftForearmGroupRef}
            position={[0, -d.upperArmLength, 0]}
            rotation={[-0.22, 0, 0]}
          >
            <mesh geometry={geometries.forearmLeft} material={m.bronze} {...shadows} />
          </group>
        </group>

        {/* Right Arm Fur */}
        <group
          ref={rightShoulderGroupRef}
          position={[-layout.shoulderX, layout.shoulderY, 0]}
          rotation={[0, 0, -0.16]}
        >
          <mesh geometry={geometries.shoulderRight} material={m.gold} {...shadows} />
          <group
            ref={rightForearmGroupRef}
            position={[0, -d.upperArmLength, 0]}
            rotation={[-0.22, 0, 0]}
          >
            <mesh geometry={geometries.forearmRight} material={m.bronze} {...shadows} />
          </group>
        </group>

        {/* Tail Base Fur */}
        <group
          ref={tailGroupRef}
          position={layout.tailRoot}
        >
          <mesh geometry={geometries.tail} material={m.gold} {...shadows} />
        </group>
      </group>
    );
  },
);
