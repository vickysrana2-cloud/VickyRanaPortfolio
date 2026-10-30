"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  CapsuleGeometry,
  CatmullRomCurve3,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import {
  createSphereCapGeometry,
  disposeGeometries,
  useCharacterStyle,
  type CharacterDimensions,
  type CharacterPartProps,
  type QualitySettings,
  type Vec3,
} from "./characterConfig";

/* -------------------------------------------------------------------------- */
/*  Public interface                                                          */
/* -------------------------------------------------------------------------- */

/** Declarative facial pose. All values are numbers so they are easy to animate. */
export interface FaceExpression {
  /** 0 = closed, 1 = wide open. */
  eyeOpen: number;
  /** -1 = frown, 0 = neutral, 1 = broad smile. Changing it rebuilds the small mouth mesh. */
  smile: number;
  /** -1 = lowered, 1 = raised. */
  browRaise: number;
  /** -1 = angry (inner ends down), 1 = worried (inner ends up). */
  browTilt: number;
  /** 0 = closed, 1 = open. */
  mouthOpen: number;
  /** -1 = looking to the character's right (-X), 1 = to its left (+X). */
  lookX: number;
  /** -1 = down, 1 = up. */
  lookY: number;
}

export const DEFAULT_FACE_EXPRESSION: Readonly<FaceExpression> = {
  eyeOpen: 0.8,
  smile: 0.45,
  browRaise: 0.1,
  browTilt: 0,
  mouthOpen: 0,
  lookX: 0,
  lookY: 0,
};

export interface CharacterFaceProps extends CharacterPartProps {
  /**
   * Initial or declarative pose. For per-frame animation, write to the handle's
   * groups and meshes instead and leave this prop unchanged.
   */
  expression?: Partial<FaceExpression>;
}

/**
 * Refs for animation. Left = character's left (+X). Values are `null` until mounted.
 * - `neck`: pivot at the base of the neck; rotate it to nod or turn the head.
 * - `*EyeGaze`: rotate to look around (pupils move with it).
 * - `*UpperLid` / `*LowerLid`: set `rotation.x` (see `getEyelidRotation`) to blink.
 * - `*Brow` / `*Ear`: local groups at identity; offset `position`/`rotation`.
 * - `jaw`: rotate `rotation.x` (positive opens) to talk.
 */
export interface CharacterFaceHandle {
  readonly root: Group | null;
  readonly neck: Group | null;
  readonly head: Group | null;
  readonly jaw: Group | null;
  readonly leftEyeGaze: Group | null;
  readonly rightEyeGaze: Group | null;
  readonly leftUpperLid: Mesh | null;
  readonly rightUpperLid: Mesh | null;
  readonly leftLowerLid: Mesh | null;
  readonly rightLowerLid: Mesh | null;
  readonly leftBrow: Group | null;
  readonly rightBrow: Group | null;
  readonly leftEar: Group | null;
  readonly rightEar: Group | null;
}

/** Eyelid `rotation.x` values (radians) for an eye-open amount of 0 (closed) to 1 (open). */
export function getEyelidRotation(eyeOpen: number): { upper: number; lower: number } {
  const open = Math.min(1, Math.max(0, eyeOpen));
  return {
    upper: 1.25 - 2.7 * open,
    lower: -1.25 + 2.6 * Math.min(1, open * 1.25),
  };
}

/* -------------------------------------------------------------------------- */
/*  Layout (head-local space, origin at the head centre, +Z forward)          */
/* -------------------------------------------------------------------------- */

interface FaceLayout {
  radius: number;
  eyeRadius: number;
  eyePosition: Vec3;
  eyeYaw: number;
  browPosition: Vec3;
  muzzle: { center: Vec3; rx: number; ry: number; rz: number };
  nose: { position: Vec3; scale: Vec3 };
  mouthFrac: number;
  jawHinge: Vec3;
  chin: { position: Vec3; scale: Vec3 };
  ear: { position: Vec3; thickness: number; height: number; depth: number };
  cheek: { position: Vec3; scale: Vec3 };
}

function createFaceLayout(d: CharacterDimensions): FaceLayout {
  const R = d.headRadius;
  const ms = d.muzzleScale;
  const es = d.earScale;

  // Eyes sit slightly inside the skull surface so the lids blend into the head.
  const eyeDirX = 0.36;
  const eyeDirY = 0.1;
  const eyeDirZ = Math.sqrt(1 - eyeDirX * eyeDirX - eyeDirY * eyeDirY);

  const browDirX = 0.34;
  const browDirY = 0.4;
  const browDirZ = Math.sqrt(1 - browDirX * browDirX - browDirY * browDirY);

  const muzzle = {
    center: [0, -0.22 * R, 0.82 * R] as Vec3,
    rx: 0.34 * R * ms,
    ry: 0.26 * R * ms,
    rz: 0.3 * R * ms,
  };

  const noseScale: Vec3 = [0.106 * R, 0.068 * R, 0.068 * R];
  const noseFrac = 0.46;

  return {
    radius: R,
    eyeRadius: 0.2 * R * d.eyeScale,
    eyePosition: [eyeDirX * R * 0.9, eyeDirY * R * 0.9, eyeDirZ * R * 0.9],
    eyeYaw: 0.22,
    browPosition: [browDirX * R, browDirY * R, browDirZ * R + 0.01 * R],
    muzzle,
    nose: {
      position: [
        0,
        muzzle.center[1] + noseFrac * muzzle.ry,
        muzzle.center[2] + muzzle.rz * Math.sqrt(1 - noseFrac * noseFrac) - noseScale[2] * 0.2,
      ],
      scale: noseScale,
    },
    mouthFrac: -0.58,
    jawHinge: [0, -0.28 * R, 0.42 * R],
    chin: {
      position: [0, muzzle.center[1] - 0.72 * muzzle.ry, muzzle.center[2] + 0.3 * muzzle.rz],
      scale: [0.15 * R * ms, 0.1 * R * ms, 0.13 * R * ms],
    },
    ear: {
      position: [0.98 * R, 0.05 * R, -0.04 * R],
      thickness: 0.1 * R * es,
      height: 0.24 * R * es,
      depth: 0.22 * R * es,
    },
    cheek: {
      position: [0.74 * R, -0.3 * R, 0.42 * R],
      scale: [0.2 * R, 0.17 * R, 0.2 * R],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                  */
/* -------------------------------------------------------------------------- */

function createFaceGeometries(qs: QualitySettings, layout: FaceLayout) {
  const w = qs.sphereWidthSegments;
  const h = qs.sphereHeightSegments;
  const radial = Math.max(6, Math.floor(qs.radialSegments * 0.6));

  const upperLid = new SphereGeometry(1, w, Math.max(4, Math.ceil(h / 2)), 0, Math.PI * 2, 0, Math.PI / 2);
  const lowerLid = new SphereGeometry(1, w, Math.max(4, Math.ceil(h / 2)), 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);

  return {
    sphere: new SphereGeometry(1, w, h),
    hair: createSphereCapGeometry(1.15, w, h, "y"),
    mask: createSphereCapGeometry(1.0, w, h, "z"),
    iris: createSphereCapGeometry(0.62, w, h, "z"),
    pupil: createSphereCapGeometry(0.3, w, h, "z"),
    upperLid,
    lowerLid,
    brow: new CapsuleGeometry(layout.radius * 0.032, layout.radius * 0.2, qs.capSegments, radial),
  };
}

/** Smile curve in jaw-local space (the jaw group is positioned at the hinge). */
function createMouthGeometry(layout: FaceLayout, smile: number, tubularSegments: number): TubeGeometry {
  const { muzzle, jawHinge, radius } = layout;
  const points: Vector3[] = [];

  for (let k = -2; k <= 2; k += 1) {
    const u = k / 2;
    const x = u * muzzle.rx * 0.5;
    const fy = layout.mouthFrac + smile * 0.28 * u * u;
    const y = muzzle.center[1] + fy * muzzle.ry;
    const fx = x / muzzle.rx;
    const depth = Math.sqrt(Math.max(0.08, 1 - fx * fx - fy * fy));
    const z = muzzle.center[2] + muzzle.rz * depth + radius * 0.012;
    points.push(new Vector3(x - jawHinge[0], y - jawHinge[1], z - jawHinge[2]));
  }

  return new TubeGeometry(new CatmullRomCurve3(points), tubularSegments, radius * 0.013, 6, false);
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const SIDES = [
  { key: "left", sign: 1 },
  { key: "right", sign: -1 },
] as const;

function useFaceSideRefs() {
  return {
    gaze: useRef<Group>(null),
    upperLid: useRef<Mesh>(null),
    lowerLid: useRef<Mesh>(null),
    brow: useRef<Group>(null),
    ear: useRef<Group>(null),
  };
}

export const CharacterFace = forwardRef<CharacterFaceHandle, CharacterFaceProps>(
  function CharacterFace(
    {
      quality,
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow,
      receiveShadow,
      expression,
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

    const {
      eyeOpen = DEFAULT_FACE_EXPRESSION.eyeOpen,
      smile = DEFAULT_FACE_EXPRESSION.smile,
      browRaise = DEFAULT_FACE_EXPRESSION.browRaise,
      browTilt = DEFAULT_FACE_EXPRESSION.browTilt,
      mouthOpen = DEFAULT_FACE_EXPRESSION.mouthOpen,
      lookX = DEFAULT_FACE_EXPRESSION.lookX,
      lookY = DEFAULT_FACE_EXPRESSION.lookY,
    } = expression ?? {};

    const L = useMemo(() => createFaceLayout(d), [d]);
    const geo = useMemo(() => createFaceGeometries(qs, L), [qs, L]);
    useEffect(() => () => disposeGeometries(Object.values(geo)), [geo]);

    const mouthGeometry = useMemo(
      () => createMouthGeometry(L, Math.min(1, Math.max(-1, smile)), qs.mouthTubularSegments),
      [L, smile, qs.mouthTubularSegments],
    );
    useEffect(() => () => mouthGeometry.dispose(), [mouthGeometry]);

    const rootRef = useRef<Group>(null);
    const neckRef = useRef<Group>(null);
    const headRef = useRef<Group>(null);
    const jawRef = useRef<Group>(null);
    const sideRefs = { left: useFaceSideRefs(), right: useFaceSideRefs() };

    useImperativeHandle(
      ref,
      () => ({
        get root() {
          return rootRef.current;
        },
        get neck() {
          return neckRef.current;
        },
        get head() {
          return headRef.current;
        },
        get jaw() {
          return jawRef.current;
        },
        get leftEyeGaze() {
          return sideRefs.left.gaze.current;
        },
        get rightEyeGaze() {
          return sideRefs.right.gaze.current;
        },
        get leftUpperLid() {
          return sideRefs.left.upperLid.current;
        },
        get rightUpperLid() {
          return sideRefs.right.upperLid.current;
        },
        get leftLowerLid() {
          return sideRefs.left.lowerLid.current;
        },
        get rightLowerLid() {
          return sideRefs.right.lowerLid.current;
        },
        get leftBrow() {
          return sideRefs.left.brow.current;
        },
        get rightBrow() {
          return sideRefs.right.brow.current;
        },
        get leftEar() {
          return sideRefs.left.ear.current;
        },
        get rightEar() {
          return sideRefs.right.ear.current;
        },
      }),
      // The handle only reads ref objects, which are stable for the component's lifetime.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const R = L.radius;
    const eyelids = getEyelidRotation(eyeOpen);
    const highlightPosition: Vec3 = [L.eyeRadius * 0.33, L.eyeRadius * 0.35, L.eyeRadius * 0.86];

    return (
      <group ref={rootRef} {...groupProps}>
        <group ref={neckRef} position={layout.neckPivot}>
          <group ref={headRef} position={layout.headOffset}>
            {/* Skull, hair cap and cream face mask */}
            <mesh geometry={geo.sphere} material={m.gold} scale={R} {...shadows} />
            <mesh
              geometry={geo.hair}
              material={m.bronze}
              scale={R * 1.02}
              rotation={[-0.25, 0, 0]}
              {...shadows}
            />
            <mesh geometry={geo.mask} material={m.cream} scale={R * 1.008} {...shadows} />

            {/* Cheek fur tufts */}
            {SIDES.map(({ key, sign }) => (
              <mesh
                key={`cheek-${key}`}
                geometry={geo.sphere}
                material={m.gold}
                position={[sign * L.cheek.position[0], L.cheek.position[1], L.cheek.position[2]]}
                scale={L.cheek.scale}
                {...shadows}
              />
            ))}

            {/* Muzzle and nose */}
            <mesh
              geometry={geo.sphere}
              material={m.cream}
              position={L.muzzle.center}
              scale={[L.muzzle.rx, L.muzzle.ry, L.muzzle.rz]}
              {...shadows}
            />
            <mesh
              geometry={geo.sphere}
              material={m.nose}
              position={L.nose.position}
              scale={L.nose.scale}
              {...shadows}
            />

            {/* Jaw: chin and mouth line */}
            <group
              ref={jawRef}
              position={L.jawHinge}
              rotation={[Math.min(1, Math.max(0, mouthOpen)) * 0.45, 0, 0]}
            >
              <mesh
                geometry={geo.sphere}
                material={m.cream}
                position={[
                  L.chin.position[0] - L.jawHinge[0],
                  L.chin.position[1] - L.jawHinge[1],
                  L.chin.position[2] - L.jawHinge[2],
                ]}
                scale={L.chin.scale}
                {...shadows}
              />
              <mesh geometry={mouthGeometry} material={m.mouth} />
            </group>

            {SIDES.map(({ key, sign }) => {
              const r = sideRefs[key];
              return (
                <group key={key}>
                  {/* Eye */}
                  <group
                    position={[sign * L.eyePosition[0], L.eyePosition[1], L.eyePosition[2]]}
                    rotation={[0, sign * L.eyeYaw, 0]}
                  >
                    <group ref={r.gaze} rotation={[-lookY * 0.3, lookX * 0.35, 0]}>
                      <mesh geometry={geo.sphere} material={m.eyeWhite} scale={L.eyeRadius} />
                      <mesh geometry={geo.iris} material={m.iris} scale={L.eyeRadius * 1.004} />
                      <mesh geometry={geo.pupil} material={m.pupil} scale={L.eyeRadius * 1.008} />
                      <mesh
                        geometry={geo.sphere}
                        material={m.highlight}
                        position={highlightPosition}
                        scale={L.eyeRadius * 0.12}
                      />
                    </group>
                    <mesh
                      ref={r.upperLid}
                      geometry={geo.upperLid}
                      material={m.cream}
                      scale={L.eyeRadius * 1.07}
                      rotation={[eyelids.upper, 0, 0]}
                    />
                    <mesh
                      ref={r.lowerLid}
                      geometry={geo.lowerLid}
                      material={m.cream}
                      scale={L.eyeRadius * 1.05}
                      rotation={[eyelids.lower, 0, 0]}
                    />
                  </group>

                  {/* Eyebrow */}
                  <group
                    position={[sign * L.browPosition[0], L.browPosition[1], L.browPosition[2]]}
                    rotation={[-0.4, sign * 0.35, 0]}
                  >
                    <group
                      ref={r.brow}
                      position={[0, browRaise * R * 0.06, 0]}
                      rotation={[0, 0, -sign * browTilt * 0.4]}
                    >
                      <mesh
                        geometry={geo.brow}
                        material={m.bronzeDark}
                        rotation={[0, 0, Math.PI / 2]}
                        {...shadows}
                      />
                    </group>
                  </group>

                  {/* Ear */}
                  <group
                    position={[sign * L.ear.position[0], L.ear.position[1], L.ear.position[2]]}
                    rotation={[0, -sign * 0.3, 0]}
                  >
                    <group ref={r.ear}>
                      <mesh
                        geometry={geo.sphere}
                        material={m.gold}
                        scale={[L.ear.thickness, L.ear.height, L.ear.depth]}
                        {...shadows}
                      />
                      <mesh
                        geometry={geo.sphere}
                        material={m.cream}
                        position={[sign * L.ear.thickness * 0.85, 0, 0]}
                        scale={[L.ear.thickness * 0.6, L.ear.height * 0.72, L.ear.depth * 0.72]}
                      />
                    </group>
                  </group>
                </group>
              );
            })}
          </group>
        </group>
      </group>
    );
  },
);