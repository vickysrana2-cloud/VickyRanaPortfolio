"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Group } from "three";
import {
  useCharacterStyle,
  type CharacterPartProps,
} from "./characterConfig";
import { CharacterBody, type CharacterBodyHandle } from "./CharacterBody";
import { CharacterFace, type CharacterFaceHandle } from "./CharacterFace";
import { CharacterTail, type CharacterTailHandle } from "./CharacterTail";
import { CharacterFur, type CharacterFurHandle } from "./CharacterFur";
import { CharacterAnimation } from "./CharacterAnimation";
import {
  useCharacterInteraction,
  type CharacterInteractionHandle,
  type GestureType,
} from "./useCharacterInteraction";

/* -------------------------------------------------------------------------- */
/*  Public Interface                                                          */
/* -------------------------------------------------------------------------- */

export interface CharacterModelProps extends CharacterPartProps {
  /** Optional interaction handle. If omitted, an internal instance is used. */
  interaction?: CharacterInteractionHandle;
  /** Whether procedural fur tufts are rendered (default true). */
  furEnabled?: boolean;
  /** Whether animations (breathing, tracking, tail motion, gestures) are active (default true). */
  animationEnabled?: boolean;
  /** Master animation speed multiplier (default 1.0). */
  animationSpeed?: number;
  /** Multiplier for procedural fur length (default 1.0). */
  furLengthScale?: number;
  /** Multiplier for procedural fur density (default 1.0). */
  furDensityScale?: number;
  /** Callback fired when a gesture starts */
  onGesture?: (gesture: GestureType) => void;
  /** Optional click handler on the character group */
  onClick?: (event: unknown) => void;
  /** Optional pointerdown handler on the character group */
  onPointerDown?: (event: unknown) => void;
}

export interface CharacterModelHandle {
  readonly root: Group | null;
  readonly body: CharacterBodyHandle | null;
  readonly face: CharacterFaceHandle | null;
  readonly tail: CharacterTailHandle | null;
  readonly fur: CharacterFurHandle | null;
  readonly interaction: CharacterInteractionHandle;
  triggerGesture(gesture: GestureType): void;
  triggerBlink(doubleBlink?: boolean): void;
}

/* -------------------------------------------------------------------------- */
/*  Component: CharacterModel                                                 */
/* -------------------------------------------------------------------------- */

export const CharacterModel = forwardRef<CharacterModelHandle, CharacterModelProps>(
  function CharacterModel(
    {
      quality = "medium",
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow = true,
      receiveShadow = true,
      interaction: externalInteraction,
      furEnabled = true,
      animationEnabled = true,
      animationSpeed = 1.0,
      furLengthScale = 1.0,
      furDensityScale = 1.0,
      onGesture,
      onClick,
      onPointerDown,
      ...groupProps
    },
    ref,
  ) {
    // Joint & part handles
    const rootRef = useRef<Group>(null);
    const bodyRef = useRef<CharacterBodyHandle>(null);
    const faceRef = useRef<CharacterFaceHandle>(null);
    const tailRef = useRef<CharacterTailHandle>(null);
    const furRef = useRef<CharacterFurHandle>(null);

    // Resolved styles & shared materials to avoid duplicate GPU state
    const style = useCharacterStyle({
      quality,
      dimensions,
      palette,
      materialSettings,
      sharedMaterials,
      castShadow,
      receiveShadow,
    });

    // Interaction state: use external if supplied, else instantiate internal
    const internalInteraction = useCharacterInteraction({
      enabled: animationEnabled && !externalInteraction,
      onGesture,
    });
    const interaction = externalInteraction ?? internalInteraction;

    // Expose unified handle to parent scenes
    useImperativeHandle(
      ref,
      () => ({
        get root() {
          return rootRef.current;
        },
        get body() {
          return bodyRef.current;
        },
        get face() {
          return faceRef.current;
        },
        get tail() {
          return tailRef.current;
        },
        get fur() {
          return furRef.current;
        },
        get interaction() {
          return interaction;
        },
        triggerGesture(gesture: GestureType) {
          interaction.triggerGesture(gesture);
        },
        triggerBlink(doubleBlink?: boolean) {
          interaction.triggerBlink(doubleBlink);
        },
      }),
      [interaction],
    );

    const handleClick = (e: unknown) => {
      interaction.handlers.onClick();
      onClick?.(e);
    };

    const handlePointerDown = (e: unknown) => {
      interaction.handlers.onPointerDown(e);
      onPointerDown?.(e);
    };

    return (
      <group
        ref={rootRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        {...groupProps}
      >
        {/* Anatomical Body */}
        <CharacterBody
          ref={bodyRef}
          quality={quality}
          dimensions={dimensions}
          palette={palette}
          materialSettings={materialSettings}
          sharedMaterials={style.materials}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
        />

        {/* Expressive Face & Eyes */}
        <CharacterFace
          ref={faceRef}
          quality={quality}
          dimensions={dimensions}
          palette={palette}
          materialSettings={materialSettings}
          sharedMaterials={style.materials}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
        />

        {/* Dynamic Procedural Tail */}
        <CharacterTail
          ref={tailRef}
          quality={quality}
          dimensions={dimensions}
          palette={palette}
          materialSettings={materialSettings}
          sharedMaterials={style.materials}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
        />

        {/* Directional Fur Tufts */}
        {furEnabled && (
          <CharacterFur
            ref={furRef}
            bodyRef={bodyRef}
            faceRef={faceRef}
            tailRef={tailRef}
            quality={quality}
            dimensions={dimensions}
            palette={palette}
            materialSettings={materialSettings}
            sharedMaterials={style.materials}
            furLengthScale={furLengthScale}
            furDensityScale={furDensityScale}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
          />
        )}

        {/* Unified Kinematics & Animation Loop */}
        <CharacterAnimation
          bodyRef={bodyRef}
          faceRef={faceRef}
          tailRef={tailRef}
          interaction={interaction}
          enabled={animationEnabled}
          speed={animationSpeed}
          breathing={true}
          bodySway={true}
          tailSway={true}
          lookTracking={true}
          blinking={true}
        />
      </group>
    );
  },
);
