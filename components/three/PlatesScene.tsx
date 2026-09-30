'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { brand, mulberry32, plateProfile } from './geometry';

const COLS = 6;
const ROWS = 5;
const GAP = 0.86;
const foodColors = [brand.sage, brand.auburn, brand.mustard, brand.auburnLight, brand.sageLight, brand.mustardLight];

function Plate({ index, filled, plateGeo }: { index: number; filled: number; plateGeo: THREE.LatheGeometry }) {
  const food = useRef<THREE.Group>(null);
  const plate = useRef<THREE.Group>(null);
  const r = useMemo(() => mulberry32(index + 5), [index]);
  const garnish = useMemo(
    () => Array.from({ length: 3 }, () => ({ x: (r() - 0.5) * 0.3, z: (r() - 0.5) * 0.3, s: 0.05 + r() * 0.04, c: foodColors[Math.floor(r() * foodColors.length)] })),
    [r],
  );
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = (col - (COLS - 1) / 2) * GAP;
  const z = (row - (ROWS - 1) / 2) * GAP;

  useFrame((state, dt) => {
    const on = index < filled;
    const k = 1 - Math.exp(-dt * 7);
    if (food.current) {
      const s = THREE.MathUtils.lerp(food.current.scale.x, on ? 1 : 0.0001, k);
      food.current.scale.setScalar(s);
      food.current.rotation.y += dt * 0.4;
    }
    if (plate.current) {
      const bob = on ? Math.sin(state.clock.elapsedTime * 1.6 + index * 0.45) * 0.03 : 0;
      plate.current.position.y = THREE.MathUtils.lerp(plate.current.position.y, bob + (on ? 0.04 : 0), k);
    }
  });

  return (
    <group position={[x, 0, z]}>
      <group ref={plate}>
        <mesh geometry={plateGeo} scale={0.36}>
          <meshPhysicalMaterial color="#ffffff" roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
        <group ref={food} position={[0, 0.03, 0]} scale={0.0001}>
          <mesh scale={[0.16, 0.1, 0.16]} position={[0, 0.02, 0]}>
            <sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={foodColors[index % foodColors.length]} roughness={0.55} />
          </mesh>
          {garnish.map((g, i) => (
            <mesh key={i} position={[g.x, 0.1, g.z]} scale={g.s}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshPhysicalMaterial color={g.c} roughness={0.2} clearcoat={1} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function Table({ filled }: { filled: number }) {
  const g = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // shrink the grid on narrow containers so every plate stays in frame
  const fit = Math.min(1, viewport.width / 6.4);
  const plateGeo = useMemo(() => new THREE.LatheGeometry(plateProfile(), 64), []);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, state.pointer.x * 0.25, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -state.pointer.y * 0.08, 0.05);
  });
  return (
    <group ref={g} scale={fit} position={[0, 0, 0.35 * (1 - fit)]}>
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <Plate key={i} index={i} filled={filled} plateGeo={plateGeo} />
      ))}
      <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={8} blur={2.2} far={1.5} />
    </group>
  );
}

export default function PlatesScene({ filled, run }: { filled: number; run: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 4.3, 3.9], fov: 37 }}
      frameloop={run ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ camera }) => camera.lookAt(0, -0.3, 0.3)}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 2]} intensity={1.8} color="#fff6e8" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
      <Table filled={filled} />
    </Canvas>
  );
}
