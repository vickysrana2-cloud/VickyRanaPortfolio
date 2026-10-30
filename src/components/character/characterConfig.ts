import { useEffect, useMemo } from "react";
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SphereGeometry,
  type BufferGeometry,
} from "three";
import type { ThreeElements } from "@react-three/fiber";

/* -------------------------------------------------------------------------- */
/*  Conventions                                                               */
/*  - Units are metres. The character stands with its soles on y = 0.         */
/*  - The character faces +Z. "Left" is the character's left, i.e. the +X     */
/*    side; "right" is the -X side.                                           */
/* -------------------------------------------------------------------------- */

export type Vec3 = [number, number, number];

/* ------------------------------- Quality ---------------------------------- */

export type QualityLevel = "low" | "medium" | "high";

export interface QualitySettings {
  sphereWidthSegments: number;
  sphereHeightSegments: number;
  /** Radial segments for limbs, neck, brows and similar round parts. */
  radialSegments: number;
  /** Cap segments for capsules (fingers, toes, brows). */
  capSegments: number;
  /** Tubular segments for the mouth line. */
  mouthTubularSegments: number;
  /** Rings along the tail tube. */
  tailTubularSegments: number;
  /** Vertices around each tail ring. */
  tailRadialSegments: number;
}

export const QUALITY_SETTINGS: Readonly<Record<QualityLevel, QualitySettings>> = {
  low: {
    sphereWidthSegments: 12,
    sphereHeightSegments: 8,
    radialSegments: 8,
    capSegments: 2,
    mouthTubularSegments: 10,
    tailTubularSegments: 24,
    tailRadialSegments: 6,
  },
  medium: {
    sphereWidthSegments: 24,
    sphereHeightSegments: 16,
    radialSegments: 12,
    capSegments: 4,
    mouthTubularSegments: 16,
    tailTubularSegments: 48,
    tailRadialSegments: 8,
  },
  high: {
    sphereWidthSegments: 40,
    sphereHeightSegments: 28,
    radialSegments: 20,
    capSegments: 8,
    mouthTubularSegments: 24,
    tailTubularSegments: 96,
    tailRadialSegments: 12,
  },
};

/* ------------------------------ Dimensions -------------------------------- */

export interface CharacterDimensions {
  headRadius: number;
  eyeScale: number;
  earScale: number;
  muzzleScale: number;

  neckRadius: number;
  neckLength: number;

  torsoRadius: number;
  /** Distance from the pelvis centre up to the shoulder line. */
  torsoLength: number;
  pelvisRadius: number;

  shoulderRadius: number;
  upperArmLength: number;
  forearmLength: number;
  upperArmRadius: number;
  forearmRadius: number;
  palmRadius: number;
  fingerLength: number;
  fingerRadius: number;
  thumbLength: number;

  hipWidth: number;
  thighLength: number;
  shinLength: number;
  thighRadius: number;
  shinRadius: number;
  footLength: number;
  footWidth: number;
  footHeight: number;
  toeLength: number;
  toeRadius: number;

  tailLength: number;
  tailBaseRadius: number;
  tailTipRadius: number;
}

export const DEFAULT_CHARACTER_DIMENSIONS: Readonly<CharacterDimensions> = {
  headRadius: 0.29,
  eyeScale: 1,
  earScale: 1,
  muzzleScale: 1,

  neckRadius: 0.085,
  neckLength: 0.07,

  torsoRadius: 0.19,
  torsoLength: 0.4,
  pelvisRadius: 0.165,

  shoulderRadius: 0.068,
  upperArmLength: 0.2,
  forearmLength: 0.2,
  upperArmRadius: 0.052,
  forearmRadius: 0.045,
  palmRadius: 0.05,
  fingerLength: 0.055,
  fingerRadius: 0.014,
  thumbLength: 0.045,

  hipWidth: 0.105,
  thighLength: 0.21,
  shinLength: 0.2,
  thighRadius: 0.074,
  shinRadius: 0.056,
  footLength: 0.17,
  footWidth: 0.1,
  footHeight: 0.06,
  toeLength: 0.04,
  toeRadius: 0.016,

  tailLength: 1.15,
  tailBaseRadius: 0.046,
  tailTipRadius: 0.02,
};

/**
 * Anchor points derived from the dimensions. Every part component uses the
 * same layout, so Body, Face and Tail line up as long as they receive the same
 * `dimensions`.
 */
export interface CharacterLayout {
  height: number;
  ankleY: number;
  hipY: number;
  hipX: number;
  pelvisY: number;
  bellyY: number;
  chestY: number;
  shoulderY: number;
  shoulderX: number;
  /** Pivot at the base of the neck. Head nods and turns rotate around it. */
  neckPivot: Vec3;
  /** Head centre relative to `neckPivot`. */
  headOffset: Vec3;
  /** Tail root (inside the pelvis) in character space. */
  tailRoot: Vec3;
}

export function computeCharacterLayout(d: CharacterDimensions): CharacterLayout {
  const ankleY = d.footHeight * 1.2;
  const hipY = ankleY + d.shinLength + d.thighLength;
  const pelvisY = hipY + d.pelvisRadius * 0.2;
  const shoulderY = pelvisY + d.torsoLength;
  const neckPivotY = shoulderY + 0.03;
  const headOffsetY = d.neckLength + d.headRadius * 0.78;

  return {
    height: neckPivotY + headOffsetY + d.headRadius * 0.97,
    ankleY,
    hipY,
    hipX: d.hipWidth,
    pelvisY,
    bellyY: pelvisY + d.torsoLength * 0.24,
    chestY: shoulderY - d.torsoRadius * 0.62,
    shoulderY,
    shoulderX: d.torsoRadius,
    neckPivot: [0, neckPivotY, 0],
    headOffset: [0, headOffsetY, d.headRadius * 0.04],
    tailRoot: [0, hipY + d.pelvisRadius * 0.35, -d.pelvisRadius * 0.7],
  };
}

/* ------------------------------- Palette ---------------------------------- */

export interface CharacterPalette {
  gold: string;
  bronze: string;
  bronzeDark: string;
  cream: string;
  belly: string;
  eyeWhite: string;
  iris: string;
  pupil: string;
  nose: string;
  mouth: string;
  highlight: string;
}

export const DEFAULT_CHARACTER_PALETTE: Readonly<CharacterPalette> = {
  gold: "#E9B546",
  bronze: "#B9772E",
  bronzeDark: "#7B4A1E",
  cream: "#F7E6BE",
  belly: "#FBF0D2",
  eyeWhite: "#FFFBF2",
  iris: "#8A4B14",
  pupil: "#120B07",
  nose: "#2A1710",
  mouth: "#5A2E1E",
  highlight: "#FFFFFF",
};

/* ------------------------------ Materials --------------------------------- */

export interface SurfaceSettings {
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

export interface MaterialSettings {
  /** Gold, bronze and dark bronze fur. */
  fur: SurfaceSettings;
  /** Cream face, belly and lids. */
  skin: SurfaceSettings;
  /** Eyes and nose. */
  gloss: SurfaceSettings;
}

export type PartialMaterialSettings = {
  [K in keyof MaterialSettings]?: Partial<MaterialSettings[K]>;
};

export const DEFAULT_MATERIAL_SETTINGS: Readonly<MaterialSettings> = {
  fur: { roughness: 0.62, metalness: 0.05, clearcoat: 0.12, clearcoatRoughness: 0.6 },
  skin: { roughness: 0.55, metalness: 0, clearcoat: 0.15, clearcoatRoughness: 0.5 },
  gloss: { roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 },
};

export interface CharacterMaterials {
  gold: MeshPhysicalMaterial;
  bronze: MeshPhysicalMaterial;
  bronzeDark: MeshPhysicalMaterial;
  cream: MeshPhysicalMaterial;
  belly: MeshPhysicalMaterial;
  eyeWhite: MeshPhysicalMaterial;
  iris: MeshPhysicalMaterial;
  pupil: MeshPhysicalMaterial;
  nose: MeshPhysicalMaterial;
  mouth: MeshPhysicalMaterial;
  highlight: MeshBasicMaterial;
}

function physical(color: string, s: SurfaceSettings): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color,
    roughness: s.roughness,
    metalness: s.metalness,
    clearcoat: s.clearcoat,
    clearcoatRoughness: s.clearcoatRoughness,
  });
}

/**
 * Creates one set of materials. Pass the result to every part through the
 * `sharedMaterials` prop to avoid duplicate materials. The caller owns a shared
 * set and should call `disposeCharacterMaterials` when done.
 */
export function createCharacterMaterials(
  palette: CharacterPalette,
  settings: MaterialSettings,
): CharacterMaterials {
  return {
    gold: physical(palette.gold, settings.fur),
    bronze: physical(palette.bronze, settings.fur),
    bronzeDark: physical(palette.bronzeDark, settings.fur),
    cream: physical(palette.cream, settings.skin),
    belly: physical(palette.belly, settings.skin),
    eyeWhite: physical(palette.eyeWhite, settings.gloss),
    iris: physical(palette.iris, settings.gloss),
    pupil: physical(palette.pupil, settings.gloss),
    nose: physical(palette.nose, settings.gloss),
    mouth: physical(palette.mouth, settings.skin),
    highlight: new MeshBasicMaterial({ color: palette.highlight }),
  };
}

export function disposeCharacterMaterials(materials: CharacterMaterials): void {
  Object.values(materials).forEach((material) => material.dispose());
}

/* ----------------------------- Shared props ------------------------------- */

type GroupElementProps = Omit<
  ThreeElements["group"],
  "ref" | "children" | "args" | "castShadow" | "receiveShadow"
>;

export interface CharacterStyleProps {
  quality?: QualityLevel;
  dimensions?: Partial<CharacterDimensions>;
  palette?: Partial<CharacterPalette>;
  materialSettings?: PartialMaterialSettings;
  /** Use materials created with `createCharacterMaterials` instead of owning a set. */
  sharedMaterials?: CharacterMaterials;
  /** Default: true */
  castShadow?: boolean;
  /** Default: true */
  receiveShadow?: boolean;
}

/** Props accepted by CharacterBody, CharacterFace and CharacterTail. */
export type CharacterPartProps = CharacterStyleProps & GroupElementProps;

/* ----------------------------- Style hook --------------------------------- */

export interface CharacterStyle {
  quality: QualitySettings;
  dimensions: CharacterDimensions;
  layout: CharacterLayout;
  palette: CharacterPalette;
  materialSettings: MaterialSettings;
  materials: CharacterMaterials;
  castShadow: boolean;
  receiveShadow: boolean;
}

function mergeDefined<T extends object>(base: T, overrides?: { [K in keyof T]?: T[K] }): T {
  const result = { ...base };
  if (overrides) {
    for (const key of Object.keys(overrides) as Array<keyof T>) {
      const value = overrides[key];
      if (value !== undefined) {
        result[key] = value as T[keyof T];
      }
    }
  }
  return result;
}

/**
 * Resolves quality, dimensions, palette and materials for a part. Inputs are
 * compared by value, so passing fresh inline objects on every render does not
 * rebuild geometry or materials.
 */
export function useCharacterStyle(props: CharacterStyleProps): CharacterStyle {
  const {
    quality = "medium",
    dimensions,
    palette,
    materialSettings,
    sharedMaterials,
    castShadow = true,
    receiveShadow = true,
  } = props;

  const dimensionsKey = JSON.stringify(dimensions ?? null);
  const paletteKey = JSON.stringify(palette ?? null);
  const settingsKey = JSON.stringify(materialSettings ?? null);

  // Keys stand in for the object props so inline literals stay stable.
  /* eslint-disable react-hooks/exhaustive-deps */
  const resolvedDimensions = useMemo(
    () => mergeDefined(DEFAULT_CHARACTER_DIMENSIONS, dimensions),
    [dimensionsKey],
  );
  const resolvedPalette = useMemo(
    () => mergeDefined(DEFAULT_CHARACTER_PALETTE, palette),
    [paletteKey],
  );
  const resolvedSettings = useMemo<MaterialSettings>(
    () => ({
      fur: mergeDefined(DEFAULT_MATERIAL_SETTINGS.fur, materialSettings?.fur),
      skin: mergeDefined(DEFAULT_MATERIAL_SETTINGS.skin, materialSettings?.skin),
      gloss: mergeDefined(DEFAULT_MATERIAL_SETTINGS.gloss, materialSettings?.gloss),
    }),
    [settingsKey],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  const layout = useMemo(() => computeCharacterLayout(resolvedDimensions), [resolvedDimensions]);

  const materials = useMemo(
    () => sharedMaterials ?? createCharacterMaterials(resolvedPalette, resolvedSettings),
    [sharedMaterials, resolvedPalette, resolvedSettings],
  );

  useEffect(() => {
    if (sharedMaterials) return undefined;
    return () => disposeCharacterMaterials(materials);
  }, [materials, sharedMaterials]);

  return {
    quality: QUALITY_SETTINGS[quality],
    dimensions: resolvedDimensions,
    layout,
    palette: resolvedPalette,
    materialSettings: resolvedSettings,
    materials,
    castShadow,
    receiveShadow,
  };
}

/* ----------------------------- Geometry helpers --------------------------- */

/**
 * Unit-radius spherical cap. `angularRadius` is in radians (a full sphere is
 * PI). The cap's pole points along +Z (default) or +Y.
 */
export function createSphereCapGeometry(
  angularRadius: number,
  widthSegments: number,
  heightSegments: number,
  axis: "y" | "z" = "z",
): SphereGeometry {
  const rows = Math.max(3, Math.round((heightSegments * angularRadius) / Math.PI));
  const geometry = new SphereGeometry(1, widthSegments, rows, 0, Math.PI * 2, 0, angularRadius);
  if (axis === "z") {
    geometry.rotateX(Math.PI / 2);
  }
  return geometry;
}

export function disposeGeometries(geometries: Iterable<BufferGeometry>): void {
  for (const geometry of geometries) {
    geometry.dispose();
  }
}

/* ------------------------------- Tail ------------------------------------- */

/** Number of control points of the tail curve. Fixed so animation code can rely on it. */
export const TAIL_CONTROL_POINT_COUNT = 8;