"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { getEyelidRotation, type CharacterFaceHandle } from "./CharacterFace";
import type { CharacterBodyHandle } from "./CharacterBody";
import type { CharacterTailHandle } from "./CharacterTail";
import {
  useCharacterInteraction,
  type CharacterInteractionHandle,
  type GestureType,
} from "./useCharacterInteraction";

/* -------------------------------------------------------------------------- */
/*  Public Interface                                                          */
/* -------------------------------------------------------------------------- */

export interface CharacterAnimationProps {
  /** Handle reference for body joints */
  bodyRef: React.RefObject<CharacterBodyHandle | null>;
  /** Handle reference for facial joints & gaze */
  faceRef: React.RefObject<CharacterFaceHandle | null>;
  /** Handle reference for procedural tail */
  tailRef: React.RefObject<CharacterTailHandle | null>;
  /** Optional interaction handle. If omitted, one is instantiated internally. */
  interaction?: CharacterInteractionHandle;
  /** Master toggle for animation playback (default true). */
  enabled?: boolean;
  /** Playback speed multiplier (default 1.0). */
  speed?: number;
  /** Enable subtle breathing chest expansion (default true). */
  breathing?: boolean;
  /** Enable gentle body sway (default true). */
  bodySway?: boolean;
  /** Enable procedural tail wave dynamics (default true). */
  tailSway?: boolean;
  /** Enable pointer tracking for head and eyes (default true). */
  lookTracking?: boolean;
  /** Enable natural blinking (default true). */
  blinking?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Rest Pose Constants (matches Task 1 definitions)                          */
/* -------------------------------------------------------------------------- */

const REST_SHOULDER_ROLL = 0.16;
const REST_ELBOW_BEND = -0.22;
const REST_KNEE_BEND = 0.06;

/** Smooth envelope curve for gesture blend-in, sustain, and blend-out */
function getGestureEnvelope(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.2) {
    // Ease in: 0 -> 1
    return MathUtils.smoothstep(p, 0, 0.2);
  }
  if (p > 0.8) {
    // Ease out: 1 -> 0
    return 1 - MathUtils.smoothstep(p, 0.8, 1.0);
  }
  return 1.0;
}

/* -------------------------------------------------------------------------- */
/*  Hook: useCharacterAnimation                                               */
/* -------------------------------------------------------------------------- */

export function useCharacterAnimation({
  bodyRef,
  faceRef,
  tailRef,
  interaction: externalInteraction,
  enabled = true,
  speed = 1.0,
  breathing = true,
  bodySway = true,
  tailSway = true,
  lookTracking = true,
  blinking = true,
}: CharacterAnimationProps): void {
  // Use supplied interaction handle or fall back to an internal instance
  const defaultInteraction = useCharacterInteraction({ enabled: enabled && !externalInteraction });
  const interaction = externalInteraction ?? defaultInteraction;

  // Track dynamic gesture blend weights to prevent sudden pops
  const waveWeightRef = useRef(0);
  const surpriseWeightRef = useRef(0);
  const playfulWeightRef = useRef(0);
  const nodWeightRef = useRef(0);

  // Restore rest pose when animation is disabled or unmounted
  useEffect(() => {
    return () => {
      const body = bodyRef.current;
      const face = faceRef.current;
      const tail = tailRef.current;

      if (body) {
        if (body.chest) body.chest.scale.set(1, 1, 1);
        if (body.root) body.root.position.set(0, 0, 0);
        if (body.leftShoulder) body.leftShoulder.rotation.set(0, 0, REST_SHOULDER_ROLL);
        if (body.rightShoulder) body.rightShoulder.rotation.set(0, 0, -REST_SHOULDER_ROLL);
        if (body.leftElbow) body.leftElbow.rotation.set(REST_ELBOW_BEND, 0, 0);
        if (body.rightElbow) body.rightElbow.rotation.set(REST_ELBOW_BEND, 0, 0);
        if (body.leftWrist) body.leftWrist.rotation.set(0, 0, 0);
        if (body.rightWrist) body.rightWrist.rotation.set(0, 0, 0);
      }

      if (face) {
        if (face.neck) face.neck.rotation.set(0, 0, 0);
        if (face.leftEyeGaze) face.leftEyeGaze.rotation.set(0, 0, 0);
        if (face.rightEyeGaze) face.rightEyeGaze.rotation.set(0, 0, 0);
        if (face.leftBrow) face.leftBrow.position.set(0, 0, 0);
        if (face.rightBrow) face.rightBrow.position.set(0, 0, 0);
        if (face.leftEar) face.leftEar.rotation.set(0, 0, 0);
        if (face.rightEar) face.rightEar.rotation.set(0, 0, 0);
        if (face.jaw) face.jaw.rotation.set(0, 0, 0);

        const openLids = getEyelidRotation(0.8);
        if (face.leftUpperLid) face.leftUpperLid.rotation.x = openLids.upper;
        if (face.rightUpperLid) face.rightUpperLid.rotation.x = openLids.upper;
        if (face.leftLowerLid) face.leftLowerLid.rotation.x = openLids.lower;
        if (face.rightLowerLid) face.rightLowerLid.rotation.x = openLids.lower;
      }

      if (tail) {
        if (tail.base) tail.base.rotation.set(0, 0, 0);
        tail.reset();
      }
    };
  }, [bodyRef, faceRef, tailRef]);

  // Main continuous 60fps frame loop
  useFrame((state, rawDelta) => {
    if (!enabled) return;

    const delta = Math.min(rawDelta, 0.1) * speed;
    const elapsed = state.clock.getElapsedTime() * speed;

    // Advance interaction dynamics
    interaction.update(delta, elapsed);

    const body = bodyRef.current;
    const face = faceRef.current;
    const tail = tailRef.current;

    // 1. Gesture Envelope Calculation
    const targetGesture = interaction.currentGesture;
    const progress = interaction.gestureProgress;
    const envelope = getGestureEnvelope(progress);

    // Smoothly damp each gesture's blend weight
    const blendRate = delta * 12;
    waveWeightRef.current = MathUtils.lerp(
      waveWeightRef.current,
      targetGesture === "wave" ? envelope : 0,
      blendRate,
    );
    surpriseWeightRef.current = MathUtils.lerp(
      surpriseWeightRef.current,
      targetGesture === "surprise" ? envelope : 0,
      blendRate,
    );
    playfulWeightRef.current = MathUtils.lerp(
      playfulWeightRef.current,
      targetGesture === "playful" ? envelope : 0,
      blendRate,
    );
    nodWeightRef.current = MathUtils.lerp(
      nodWeightRef.current,
      targetGesture === "nod" ? envelope : 0,
      blendRate,
    );

    const waveWeight = waveWeightRef.current;
    const surpriseWeight = surpriseWeightRef.current;
    const playfulWeight = playfulWeightRef.current;
    const nodWeight = nodWeightRef.current;

    /* ------------------------------------------------------------------------ */
    /*  2. Breathing & Body Sway                                                */
    /* ------------------------------------------------------------------------ */
    const breathPhase = Math.sin(elapsed * 2.2);

    if (body) {
      if (breathing && body.chest) {
        // Subtle expansion on inhale with surprise intake
        const breathScale = 1.0 + (breathPhase * 0.024) + (surpriseWeight * 0.07);
        body.chest.scale.set(breathScale, breathScale * 1.02, breathScale * 1.05);
      }

      if (bodySway && body.root) {
        // Gentle rhythmic sway of the pelvis/torso
        const swayX = Math.sin(elapsed * 1.1) * 0.012;
        const swayZ = Math.cos(elapsed * 0.9) * 0.01;
        const leanForward = playfulWeight * 0.04;
        body.root.rotation.set(swayX + leanForward, 0, swayZ);
      }

      // Shoulders & Arms Idle Motion
      const armSway = Math.sin(elapsed * 1.4) * 0.03;

      // Left Arm: rest pose + breath + subtle counter-balance during wave
      if (body.leftShoulder) {
        const leftRoll = REST_SHOULDER_ROLL + armSway + (waveWeight * 0.12);
        body.leftShoulder.rotation.set(0, 0, leftRoll);
      }
      if (body.leftElbow) {
        body.leftElbow.rotation.set(REST_ELBOW_BEND + Math.sin(elapsed * 1.2) * 0.02, 0, 0);
      }

      // Right Arm: smoothly blend wave gesture with natural idle sway
      if (body.rightShoulder && body.rightElbow && body.rightWrist) {
        const idleRoll = -REST_SHOULDER_ROLL - armSway;
        const waveRoll = -1.75;
        const roll = MathUtils.lerp(idleRoll, waveRoll, waveWeight);

        const idlePitch = 0;
        const wavePitch = 0.45;
        const pitch = MathUtils.lerp(idlePitch, wavePitch, waveWeight);

        body.rightShoulder.rotation.set(pitch, 0, roll);

        const idleElbow = REST_ELBOW_BEND - Math.sin(elapsed * 1.2) * 0.02;
        const waveElbow = -1.25;
        body.rightElbow.rotation.set(MathUtils.lerp(idleElbow, waveElbow, waveWeight), 0, 0);

        const waveOsc = Math.sin(elapsed * 11) * 0.42 * waveWeight;
        body.rightWrist.rotation.set(0, 0, waveOsc);
      }
    }

    /* ------------------------------------------------------------------------ */
    /*  3. Head & Eye Tracking                                                  */
    /* ------------------------------------------------------------------------ */
    if (face) {
      const lookX = lookTracking ? interaction.dampedPointer.x : 0;
      const lookY = lookTracking ? interaction.dampedPointer.y : 0;

      if (face.neck) {
        // Natural head rotation toward pointer + playful tilt + nod
        const headYaw = lookX * 0.42 + (waveWeight * 0.08);
        const headPitch = -lookY * 0.32 - (surpriseWeight * 0.16) + (Math.sin(elapsed * 8) * 0.18 * nodWeight);
        const headRoll = -lookX * 0.12 + (playfulWeight * 0.26) - (waveWeight * 0.06);

        face.neck.rotation.set(headPitch, headYaw, headRoll);
      }

      // Eye Gaze Tracking
      if (face.leftEyeGaze && face.rightEyeGaze) {
        const gazeYaw = lookX * 0.34;
        const gazePitch = -lookY * 0.28;
        face.leftEyeGaze.rotation.set(gazePitch, gazeYaw, 0);
        face.rightEyeGaze.rotation.set(gazePitch, gazeYaw, 0);
      }

      /* ---------------------------------------------------------------------- */
      /*  4. Blinking & Facial Expressions                                      */
      /* ---------------------------------------------------------------------- */
      const baseBlink = blinking ? interaction.blinkAmount : 0;

      // Playful gesture winks left eye while keeping right eye open
      const leftBlink = Math.max(baseBlink, playfulWeight > 0.3 ? Math.sin((progress - 0.3) * Math.PI * 1.4) : 0);
      const rightBlink = baseBlink;

      // Natural resting eyelid openness (0.82) with widening on surprise
      const restOpen = 0.82;
      const leftOpen = Math.max(0, restOpen - leftBlink * restOpen + (surpriseWeight * 0.18));
      const rightOpen = Math.max(0, restOpen - rightBlink * restOpen + (surpriseWeight * 0.18));

      // Eyelid Rotations via getEyelidRotation
      const leftLids = getEyelidRotation(Math.min(1, leftOpen));
      const rightLids = getEyelidRotation(Math.min(1, rightOpen));

      if (face.leftUpperLid) face.leftUpperLid.rotation.x = leftLids.upper;
      if (face.leftLowerLid) face.leftLowerLid.rotation.x = leftLids.lower;
      if (face.rightUpperLid) face.rightUpperLid.rotation.x = rightLids.upper;
      if (face.rightLowerLid) face.rightLowerLid.rotation.x = rightLids.lower;

      // Eyebrows reaction
      if (face.leftBrow && face.rightBrow) {
        const browLift = (surpriseWeight * 0.024) + (waveWeight * 0.008) + (playfulWeight * 0.006);
        face.leftBrow.position.y = browLift;
        face.rightBrow.position.y = browLift;
      }

      // Jaw drops open in surprise
      if (face.jaw) {
        face.jaw.rotation.x = surpriseWeight * 0.24 + (waveWeight * 0.05);
      }

      // Ears perk up and wiggle
      if (face.leftEar && face.rightEar) {
        const earWiggle = Math.sin(elapsed * 16) * 0.14 * (playfulWeight + waveWeight * 0.5);
        face.leftEar.rotation.z = earWiggle + (surpriseWeight * 0.12);
        face.rightEar.rotation.z = -earWiggle - (surpriseWeight * 0.12);
      }
    }

    /* ------------------------------------------------------------------------ */
    /*  5. Tail Dynamics & Traveling Wave                                       */
    /* ------------------------------------------------------------------------ */
    if (tail && tailSway && tail.base && tail.controlPoints && tail.restPoints) {
      // Base swinging motion
      const tailSpeed = 1.6 + (playfulWeight * 1.8);
      const tailBaseYaw = Math.sin(elapsed * tailSpeed) * (0.14 + playfulWeight * 0.15);
      const tailBasePitch = Math.sin(elapsed * tailSpeed * 1.4) * 0.08;
      tail.base.rotation.set(tailBasePitch, tailBaseYaw, 0);

      // Sinusoidal traveling wave along the control points without memory allocation
      const pts = tail.controlPoints;
      const rest = tail.restPoints;
      const count = Math.min(pts.length, rest.length);

      for (let i = 1; i < count; i += 1) {
        const wavePhase = elapsed * (3.0 + playfulWeight * 2.2) - i * 0.65;
        const ampLateral = 0.022 * (i * 0.8) * (1 + playfulWeight * 0.8);
        const ampVertical = 0.014 * (i * 0.6) * (1 + playfulWeight * 0.5);

        pts[i].x = rest[i].x + Math.sin(wavePhase) * ampLateral;
        pts[i].y = rest[i].y + Math.cos(wavePhase * 0.85) * ampVertical;
        pts[i].z = rest[i].z;
      }

      // Rebuild vertex buffer in place
      tail.commit();
    }
  });
}

/* -------------------------------------------------------------------------- */
/*  Component: CharacterAnimation                                             */
/* -------------------------------------------------------------------------- */

export function CharacterAnimation(props: CharacterAnimationProps): null {
  useCharacterAnimation(props);
  return null;
}
