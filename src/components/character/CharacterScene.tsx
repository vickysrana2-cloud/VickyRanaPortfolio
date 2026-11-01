"use client";

import React, {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import {
  Sparkles,
  Hand,
  Smile,
  AlertCircle,
  Eye,
  CheckCircle2,
  Sliders,
  RotateCcw,
} from "lucide-react";
import { CharacterModel, type CharacterModelHandle } from "./CharacterModel";
import { CharacterFallback } from "./CharacterFallback";
import {
  useCharacterInteraction,
  type GestureType,
} from "./useCharacterInteraction";
import type { QualityLevel } from "./characterConfig";

/* -------------------------------------------------------------------------- */
/*  Public Props & Types                                                      */
/* -------------------------------------------------------------------------- */

export interface CharacterSceneProps {
  /** Rendering quality mode (default "medium") */
  quality?: QualityLevel;
  /** Background appearance: "transparent", "subtle", "dark", or custom hex (default "transparent") */
  background?: "transparent" | "subtle" | "dark" | string;
  /** Whether procedural fur detail is rendered (default true) */
  furEnabled?: boolean;
  /** Whether pointer-tracking and gestures are active (default true) */
  interactive?: boolean;
  /** Optional callback fired when a gesture starts */
  onGesture?: (gesture: GestureType) => void;
  /** Whether to display interactive floating HUD buttons (default true) */
  showControls?: boolean;
  /** Additional container CSS class names */
  className?: string;
  /** Accessibility label for the container */
  ariaLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*  WebGL Feature Detection & Safety Boundary                                 */
/* -------------------------------------------------------------------------- */

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl") ||
          canvas.getContext("webgl2")),
    );
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("CharacterScene WebGL Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Restrained Studio Lighting for Golden Surfaces                            */
/* -------------------------------------------------------------------------- */

interface SceneLightingProps {
  quality: QualityLevel;
}

function SceneLighting({ quality }: SceneLightingProps) {
  const isHigh = quality === "high";
  const shadowMapSize = isHigh ? 2048 : 1024;

  return (
    <>
      {/* Restrained neutral ambient fill to prevent pitch-black shadows */}
      <ambientLight intensity={0.58} color="#ffffff" />

      {/* Primary Key Light: warm directional sun from front-right */}
      <directionalLight
        position={[2.6, 3.6, 3.2]}
        intensity={1.18}
        color="#fffbf2"
        castShadow={quality !== "low"}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.5}
        shadow-camera-far={9}
        shadow-bias={-0.00015}
      />

      {/* Golden Monkey Rim Backlight: rich warm amber edge separation */}
      <directionalLight
        position={[-2.8, 3.2, -2.4]}
        intensity={1.65}
        color="#f59e0b"
      />

      {/* Gentle Fill Light: soft cream bounce from front-left */}
      <directionalLight
        position={[-1.8, 0.8, 2.2]}
        intensity={0.32}
        color="#fef3c7"
      />

      {/* Subtle Ground Bounce */}
      <pointLight position={[0, -0.8, 1.2]} intensity={0.24} color="#fef08a" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component: CharacterScene                                            */
/* -------------------------------------------------------------------------- */

export function CharacterScene({
  quality: initialQuality = "medium",
  background = "transparent",
  furEnabled: initialFur = true,
  interactive = true,
  onGesture,
  showControls = true,
  className = "",
  ariaLabel = "Interactive 3D Golden Monkey Companion",
}: CharacterSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [quality, setQuality] = useState<QualityLevel>(initialQuality);
  const [furEnabled, setFurEnabled] = useState(initialFur);

  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<CharacterModelHandle>(null);

  // Interaction tracking state machine
  const interaction = useCharacterInteraction({
    domElement: typeof window !== "undefined" ? window : null,
    idleTimeout: 3000,
    damping: 7.8,
    enabled: interactive,
    onGesture,
  });

  // Client-side initialization & WebGL detection
  useEffect(() => {
    setMounted(true);
    setHasWebGL(detectWebGL());
  }, []);

  const handleGestureClick = (gesture: GestureType) => {
    interaction.triggerGesture(gesture);
  };

  // Compute background styling
  let bgClass = "bg-transparent";
  if (background === "subtle") {
    bgClass = "border border-white/20 dark:border-white/10 bg-gradient-to-b from-card/80 via-card/50 to-background/90 backdrop-blur-xl shadow-2xl";
  } else if (background === "dark") {
    bgClass = "border border-amber-500/20 bg-neutral-950/90 shadow-2xl";
  } else if (background !== "transparent") {
    bgClass = background;
  }

  // Pixel ratio based on quality mode & hardware limits
  const dpr: [number, number] | number =
    quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : 1;

  // Graceful fallback for non-WebGL environments
  if (!mounted || !hasWebGL) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <CharacterFallback />
      </div>
    );
  }

  return (
    <WebGLErrorBoundary fallback={<CharacterFallback className={className} />}>
      <div
        ref={containerRef}
        role="region"
        aria-label={ariaLabel}
        className={`relative w-full rounded-3xl overflow-hidden p-5 sm:p-8 ${bgClass} ${className}`}
      >
        {/* Soft atmospheric ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl sm:h-96 sm:w-96 dark:bg-amber-600/15"
        />

        {/* Specular highlight rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

        {/* Optional Interactive Top HUD Bar */}
        {showControls && (
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive 3D Procedural Companion</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Golden Monkey{" "}
                <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                  Kinematics & Fur
                </span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Procedural meshes, dynamic fur tufts, eye tracking, and real-time IK gestures.
              </p>
            </div>

            {/* Quality and Fur Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFurEnabled((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  furEnabled
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-400"
                    : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Fur: {furEnabled ? "ON" : "OFF"}</span>
              </button>

              <div className="inline-flex items-center rounded-xl border border-border/60 bg-background/60 p-1 text-xs">
                {(["low", "medium", "high"] as QualityLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setQuality(lvl)}
                    className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                      quality === lvl
                        ? "bg-amber-500 text-black font-bold shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3D Canvas Viewport */}
        <div className="relative mt-4 h-[420px] sm:h-[480px] lg:h-[520px] w-full rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-b from-black/20 via-black/10 to-black/30">
          <Canvas
            shadows={quality !== "low"}
            dpr={dpr}
            camera={{ position: [0, 0.35, 2.7], fov: 38 }}
            gl={{
              alpha: true,
              antialias: quality !== "low",
              powerPreference: "high-performance",
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onPointerMove={interactive ? interaction.handlers.onPointerMove : undefined}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                setHasWebGL(false);
              });
            }}
          >
            <SceneLighting quality={quality} />

            <Suspense fallback={null}>
              <Float
                speed={1.2}
                rotationIntensity={0.1}
                floatIntensity={0.18}
                floatingRange={[-0.025, 0.025]}
              >
                <CharacterModel
                  ref={modelRef}
                  quality={quality}
                  interaction={interaction}
                  furEnabled={furEnabled}
                  position={[0, -0.6, 0]}
                  castShadow={quality !== "low"}
                  receiveShadow={quality !== "low"}
                />
              </Float>

              {/* Ground Contact Shadow */}
              <ContactShadows
                position={[0, -0.62, 0]}
                opacity={quality === "low" ? 0.35 : 0.52}
                scale={2.6}
                blur={2.0}
                far={1.6}
                color="#1c1208"
              />
            </Suspense>
          </Canvas>

          {/* Interactive Floating HUD Action Buttons */}
          {showControls && (
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Status pill */}
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/10 bg-background/70 px-3.5 py-1.5 text-xs backdrop-blur-md">
                <span
                  className={`h-2 w-2 rounded-full ${
                    interaction.isInteracting ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                  }`}
                />
                <span className="font-mono text-muted-foreground">
                  {interaction.isInteracting ? "Tracking Pointer" : "Idle Natural Drift"}
                </span>
                {interaction.currentGesture !== "idle" && (
                  <span className="ml-1 rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-amber-300">
                    {interaction.currentGesture}
                  </span>
                )}
              </div>

              {/* Gesture Action Buttons */}
              <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handleGestureClick("wave")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-500/60 active:scale-95"
                >
                  <Hand className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wave</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGestureClick("surprise")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-500/60 active:scale-95"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Surprise</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGestureClick("playful")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-500/60 active:scale-95"
                >
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  <span>Playful</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGestureClick("nod")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-500/60 active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nod</span>
                </button>

                <button
                  type="button"
                  onClick={() => interaction.triggerBlink(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:text-foreground active:scale-95"
                  title="Trigger Double Blink"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Blink</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info / Interaction Guidance */}
        {showControls && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
            <p className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Move cursor across the screen to guide gaze • Click character or buttons to trigger kinematic gestures.</span>
            </p>
            <span className="font-mono text-[11px] text-amber-400/80">
              60 FPS Procedural Simulation
            </span>
          </div>
        )}
      </div>
    </WebGLErrorBoundary>
  );
}
