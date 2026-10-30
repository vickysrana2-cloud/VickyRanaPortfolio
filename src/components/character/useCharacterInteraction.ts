"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Public Types                                                              */
/* -------------------------------------------------------------------------- */

export type GestureType = "wave" | "surprise" | "playful" | "nod" | "idle";

export interface CharacterInteractionOptions {
  /** Target DOM element or window to listen on. If undefined, listens on window. */
  domElement?: HTMLElement | Window | null;
  /** Inactivity threshold in milliseconds before entering idle mode (default 3200ms). */
  idleTimeout?: number;
  /** Pointer damping factor: higher = snappier, lower = smoother (default 7.5). */
  damping?: number;
  /** Sequence of gestures to cycle on successive clicks. */
  clickGestures?: GestureType[];
  /** Callback invoked when a gesture begins. */
  onGesture?: (gesture: GestureType) => void;
  /** Enable or disable interaction tracking (default true). */
  enabled?: boolean;
}

export interface CharacterInteractionHandle {
  /** Raw instantaneous pointer position [-1, 1]. */
  pointer: { x: number; y: number };
  /** Smoothly damped pointer coordinates [-1, 1] for eye/head tracking. */
  dampedPointer: { x: number; y: number };
  /** Continuous eyelid blink factor: 0.0 (fully open) to 1.0 (fully closed). */
  blinkAmount: number;
  /** True when user is actively moving the pointer or interacting. */
  isInteracting: boolean;
  /** True when the character has entered idle state. */
  isIdle: boolean;
  /** Current active gesture or "idle". */
  currentGesture: GestureType;
  /** Normalized progress of the active gesture [0.0, 1.0]. */
  gestureProgress: number;
  /** Imperative trigger for single or double blink. */
  triggerBlink: (doubleBlink?: boolean) => void;
  /** Imperative trigger for gestures. */
  triggerGesture: (gesture: GestureType) => void;
  /** Per-frame update method to advance damping, blinks and gestures. */
  update: (delta: number, elapsed?: number) => void;
  /** Event handlers for direct binding to Canvas or Mesh components. */
  handlers: {
    onPointerMove: (e: { clientX: number; clientY: number }) => void;
    onPointerDown: (e?: unknown) => void;
    onClick: () => void;
  };
}

/* -------------------------------------------------------------------------- */
/*  Constants & Timing Defaults                                               */
/* -------------------------------------------------------------------------- */

const DEFAULT_CLICK_GESTURES: GestureType[] = ["wave", "playful", "surprise", "nod"];

const GESTURE_DURATIONS: Record<GestureType, number> = {
  idle: 0,
  wave: 2.2,
  surprise: 1.6,
  playful: 2.0,
  nod: 1.4,
};

/* -------------------------------------------------------------------------- */
/*  Hook Implementation                                                       */
/* -------------------------------------------------------------------------- */

export function useCharacterInteraction(
  options: CharacterInteractionOptions = {},
): CharacterInteractionHandle {
  const {
    domElement,
    idleTimeout = 3200,
    damping = 7.5,
    clickGestures = DEFAULT_CLICK_GESTURES,
    onGesture,
    enabled = true,
  } = options;

  // React state for external UI consumption
  const [isInteracting, setIsInteracting] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [currentGesture, setCurrentGesture] = useState<GestureType>("idle");

  // High-performance mutable animation refs (zero React re-renders in useFrame)
  const pointerRef = useRef({ x: 0, y: 0 });
  const dampedPointerRef = useRef({ x: 0, y: 0 });
  const lastActiveRef = useRef(0);
  const isIdleRef = useRef(true);

  // Gesture state refs
  const currentGestureRef = useRef<GestureType>("idle");
  const gestureProgressRef = useRef(0);
  const gestureDurationRef = useRef(0);
  const clickIndexRef = useRef(0);

  // Blink state machine refs
  const blinkStateRef = useRef<{
    active: boolean;
    timer: number;
    duration: number;
    nextBlinkTime: number;
    isDouble: boolean;
    hasDoneSecond: boolean;
    amount: number;
  }>({
    active: false,
    timer: 0,
    duration: 0.16,
    nextBlinkTime: 2.5,
    isDouble: false,
    hasDoneSecond: false,
    amount: 0,
  });

  // Schedule the next natural blink
  const scheduleNextBlink = useCallback((elapsedSec: number) => {
    // Random interval between 2.4s and 5.2s
    const delay = 2.4 + Math.random() * 2.8;
    blinkStateRef.current.nextBlinkTime = elapsedSec + delay;
    blinkStateRef.current.isDouble = Math.random() < 0.25; // 25% chance of double blink
    blinkStateRef.current.hasDoneSecond = false;
  }, []);

  // Imperative trigger for a blink
  const triggerBlink = useCallback((doubleBlink: boolean = false) => {
    const b = blinkStateRef.current;
    b.active = true;
    b.timer = 0;
    b.duration = 0.16;
    b.isDouble = doubleBlink;
    b.hasDoneSecond = false;
    b.amount = 0;
  }, []);

  // Imperative trigger for a gesture
  const triggerGesture = useCallback(
    (gesture: GestureType) => {
      if (gesture === "idle") {
        currentGestureRef.current = "idle";
        gestureProgressRef.current = 0;
        setCurrentGesture("idle");
        return;
      }
      currentGestureRef.current = gesture;
      gestureProgressRef.current = 0;
      gestureDurationRef.current = GESTURE_DURATIONS[gesture] || 1.8;
      setCurrentGesture(gesture);
      onGesture?.(gesture);

      // Trigger a responsive blink on surprise or playful
      if (gesture === "surprise") {
        triggerBlink(false);
      }
    },
    [onGesture, triggerBlink],
  );

  // Update raw pointer coordinates from client coordinates
  const updatePointer = useCallback((clientX: number, clientY: number) => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;

    const nx = Math.max(-1, Math.min(1, (clientX / width) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, -((clientY / height) * 2 - 1)));

    pointerRef.current.x = nx;
    pointerRef.current.y = ny;
    lastActiveRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();

    if (isIdleRef.current) {
      isIdleRef.current = false;
      setIsIdle(false);
      setIsInteracting(true);
    }
  }, []);

  // Event handlers
  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!enabled) return;
      updatePointer(e.clientX, e.clientY);
    },
    [enabled, updatePointer],
  );

  const handleClick = useCallback(() => {
    if (!enabled) return;
    lastActiveRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();

    // Cycle through gestures on click
    const nextGesture = clickGestures[clickIndexRef.current % clickGestures.length];
    clickIndexRef.current += 1;
    triggerGesture(nextGesture);
  }, [clickGestures, enabled, triggerGesture]);

  const handlePointerDown = useCallback(() => {
    if (!enabled) return;
    lastActiveRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
  }, [enabled]);

  // Window event listeners for mouse/touch tracking (SSR safe)
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return undefined;

    const target = domElement ?? window;

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onPointerDown = () => {
      lastActiveRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    target.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    target.addEventListener("pointerdown", onPointerDown as EventListener, { passive: true });
    target.addEventListener("touchmove", onTouchMove as EventListener, { passive: true });

    return () => {
      target.removeEventListener("pointermove", onPointerMove as EventListener);
      target.removeEventListener("pointerdown", onPointerDown as EventListener);
      target.removeEventListener("touchmove", onTouchMove as EventListener);
    };
  }, [domElement, enabled, updatePointer]);

  // Per-frame update method called from useFrame
  const update = useCallback(
    (delta: number, elapsed: number = 0) => {
      const dt = Math.min(delta, 0.1); // Clamp against frame hitching
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();

      // 1. Idle state check
      const idleTime = now - lastActiveRef.current;
      if (idleTime > idleTimeout) {
        if (!isIdleRef.current) {
          isIdleRef.current = true;
          setIsIdle(true);
          setIsInteracting(false);
        }
      }

      // 2. Damped pointer tracking + gentle idle wandering
      let targetX = pointerRef.current.x;
      let targetY = pointerRef.current.y;

      if (isIdleRef.current) {
        // Natural gentle gaze drift when idle
        const wanderX = Math.sin(elapsed * 0.45) * 0.18 + Math.sin(elapsed * 0.9) * 0.08;
        const wanderY = Math.cos(elapsed * 0.35) * 0.12 + Math.sin(elapsed * 0.7) * 0.05;
        targetX = wanderX;
        targetY = wanderY;
      }

      const factor = 1 - Math.exp(-damping * dt);
      dampedPointerRef.current.x += (targetX - dampedPointerRef.current.x) * factor;
      dampedPointerRef.current.y += (targetY - dampedPointerRef.current.y) * factor;

      // 3. Blink state machine update
      const b = blinkStateRef.current;
      if (!b.active && elapsed >= b.nextBlinkTime) {
        b.active = true;
        b.timer = 0;
        b.duration = 0.15;
      }

      if (b.active) {
        b.timer += dt;
        const progress = Math.min(1, b.timer / b.duration);

        // Smooth blink closing and opening curve: sin(progress * PI)
        b.amount = Math.sin(progress * Math.PI);

        if (progress >= 1) {
          b.amount = 0;
          if (b.isDouble && !b.hasDoneSecond) {
            // Initiate second blink after brief 0.07s pause
            b.hasDoneSecond = true;
            b.timer = -0.07;
            b.duration = 0.13;
          } else {
            b.active = false;
            scheduleNextBlink(elapsed);
          }
        }
      }

      // 4. Gesture progression update
      if (currentGestureRef.current !== "idle") {
        gestureProgressRef.current += dt / gestureDurationRef.current;
        if (gestureProgressRef.current >= 1) {
          currentGestureRef.current = "idle";
          gestureProgressRef.current = 0;
          setCurrentGesture("idle");
        }
      }
    },
    [damping, idleTimeout, scheduleNextBlink],
  );

  return {
    pointer: pointerRef.current,
    dampedPointer: dampedPointerRef.current,
    get blinkAmount() {
      return blinkStateRef.current.amount;
    },
    isInteracting,
    isIdle,
    currentGesture,
    get gestureProgress() {
      return gestureProgressRef.current;
    },
    triggerBlink,
    triggerGesture,
    update,
    handlers: {
      onPointerMove: handlePointerMove,
      onPointerDown: handlePointerDown,
      onClick: handleClick,
    },
  };
}
