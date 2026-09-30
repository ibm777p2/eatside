'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brand, mulberry32 } from './geometry';

const R = 2.2;
const TAU = Math.PI * 2;
const BLACK = new THREE.Color('#000000');
const nodeAngle =(i: number, n: number) => Math.PI / 2 - (i / n) * TAU;

function Nodes({ active, count }: { active: number; count: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const activeColor = useMemo(() => new THREE.Color(brand.auburnLight), []);
  const doneColor = useMemo(() => new THREE.Color(brand.sageLight), []);
  const idleColor = useMemo(() => new THREE.Color('#5d5a5d'), []);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 6);
    for (let i = 0; i < count; i++) {
      const g = refs.current[i];
      const m = mats.current[i];
      if (!g || !m) continue;
      const target = i === active ? 1.9 : 1;
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, k));
      const c = i === active ? activeColor : i < active ? doneColor : idleColor;
      m.color.lerp(c, k);
      m.emissive.lerp(i === active ? activeColor : BLACK, k);
    }
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a = nodeAngle(i, count);
        return (
          <group key={i} position={[Math.cos(a) * R, Math.sin(a) * R, 0]} ref={(el) => void (refs.current[i] = el)}>
            <mesh>
              <sphereGeometry args={[0.09, 32, 32]} />
              <meshStandardMaterial ref={(el) => void (mats.current[i] = el)} color="#5d5a5d" emissiveIntensity={0.9} roughness={0.3} />
            </mesh>
            <mesh>
              <torusGeometry args={[0.17, 0.006, 8, 48]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Pulse({ active, count }: { active: number; count: number }) {
  const angle = useRef(nodeAngle(0, count));
  const head = useRef<THREE.Mesh>(null);
  const trail = useRef<(THREE.Mesh | null)[]>([]);
  const history = useRef<number[]>(Array(14).fill(nodeAngle(0, count)));

  useFrame((_, dt) => {
    const target = nodeAngle(active, count);
    // always travel clockwise (decreasing angle) around the loop
    let diff = (angle.current - target) % TAU;
    if (diff < 0) diff += TAU;
    angle.current -= diff * (1 - Math.exp(-dt * 3.2)) + dt * 0.02 * (diff > 0.01 ? 1 : 0);
    const a = angle.current;
    head.current?.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
    history.current.unshift(a);
    history.current.length = 14;
    history.current.forEach((ha, i) => {
      const m = trail.current[i];
      if (m) m.position.set(Math.cos(ha) * R, Math.sin(ha) * R, 0);
    });
  });

  return (
    <>
      <mesh ref={head}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color={brand.cyan} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} ref={(el) => void (trail.current[i] = el)} scale={1 - i / 15}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={brand.cyan} transparent opacity={0.5 * (1 - i / 14)} />
        </mesh>
      ))}
    </>
  );
}

function Dust({ count = 700 }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const r = mulberry32(11);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [brand.sageLight, brand.sage, brand.mustardLight, brand.auburnLight, '#ffffff'].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const a = r() * TAU;
      const rad = R + (r() - 0.5) * (r() < 0.8 ? 0.5 : 1.6);
      positions[i * 3] = Math.cos(a) * rad;
      positions[i * 3 + 1] = Math.sin(a) * rad;
      positions[i * 3 + 2] = (r() - 0.5) * 0.6;
      const c = palette[Math.floor(r() * palette.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z -= dt * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.8} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Wheel({ active, count }: { active: number; count: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const { pointer } = state;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -0.35 - pointer.y * 0.2, 0.05);
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, 0.25 + pointer.x * 0.3, 0.05);
  });
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[R, 0.012, 16, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
      <mesh>
        <torusGeometry args={[R - 0.45, 0.004, 8, 200]} />
        <meshBasicMaterial color={brand.sage} transparent opacity={0.5} />
      </mesh>
      <Dust />
      <Nodes active={active} count={count} />
      <Pulse active={active} count={count} />
    </group>
  );
}

export default function FlywheelScene({ active, count, run }: { active: number; count: number; run: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7], fov: 45 }} frameloop={run ? 'always' : 'never'} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={30} />
      <Wheel active={active} count={count} />
    </Canvas>
  );
}
