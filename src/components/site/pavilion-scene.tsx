import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

/** Hex values match the tokens in src/styles.css. Three.js cannot read those CSS variables. */
const STONE = "#e6dfd2";
const CHALK = "#fbf8f3";
const IVORY = "#f4efe6";
const SAGE = "#8aa396";
const SAGE_DEEP = "#3c5248";

function Model() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (document.hidden || !group.current) return;
    group.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.55, 0.08, 1.15]} />
        <meshStandardMaterial color={STONE} roughness={0.9} />
      </mesh>
      <mesh position={[-0.48, 0.46, -0.18]}>
        <boxGeometry args={[0.08, 0.92, 0.72]} />
        <meshStandardMaterial color={CHALK} roughness={0.72} />
      </mesh>
      <mesh position={[0.32, 0.62, 0.02]}>
        <boxGeometry args={[0.62, 1.2, 0.07]} />
        <meshStandardMaterial color={IVORY} roughness={0.68} />
      </mesh>
      <mesh position={[0.18, 0.5, 0.32]}>
        <boxGeometry args={[0.78, 0.78, 0.025]} />
        <meshStandardMaterial color={SAGE} transparent opacity={0.45} roughness={0.15} />
      </mesh>
      <mesh position={[0.55, 0.28, -0.35]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color={SAGE_DEEP} roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function PavilionScene({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [2.35, 1.45, 2.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady();
      }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color={SAGE} />
      <Model />
    </Canvas>
  );
}
