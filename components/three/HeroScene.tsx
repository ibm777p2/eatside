'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { bowlInnerProfile, bowlOuterProfile, brand, mulberry32, noodleCurve } from './geometry';

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

function Bowl() {
  const outer = useMemo(() => new THREE.LatheGeometry(bowlOuterProfile(), 96), []);
  const inner = useMemo(() => new THREE.LatheGeometry(bowlInnerProfile(), 96), []);

  // A nest of pasta sitting in the bowl
  const nest = useMemo(() => {
    const r = mulberry32(7);
    return Array.from({ length: 22 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 6 }, (_, k) => {
          const a = r() * Math.PI * 2 + k * 0.9;
          const rad = 0.2 + r() * 0.85;
          return new THREE.Vector3(Math.cos(a) * rad, 0.62 + r() * 0.28 + (1 - rad) * 0.05, Math.sin(a) * rad);
        }),
        false,
        'catmullrom',
        0.6,
      );
      return { key: i, geo: new THREE.TubeGeometry(curve, 48, 0.028, 6, false) };
    });
  }, []);

  return (
    <group>
      <mesh geometry={outer} castShadow>
        <meshPhysicalMaterial color={brand.sage} roughness={0.32} clearcoat={1} clearcoatRoughness={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={inner}>
        <meshPhysicalMaterial color={brand.cream} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {nest.map((n) => (
        <mesh key={n.key} geometry={n.geo}>
          <meshStandardMaterial color={brand.mustardLight} roughness={0.45} />
        </mesh>
      ))}
      {/* tomato + basil garnish */}
      <mesh position={[0.18, 0.98, 0.1]} scale={0.16}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color={brand.auburn} roughness={0.15} clearcoat={1} />
      </mesh>
      <mesh position={[-0.22, 0.95, -0.12]} scale={0.13}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color={brand.auburnLight} roughness={0.15} clearcoat={1} />
      </mesh>
      <mesh position={[0.02, 1.0, -0.28]} rotation={[-0.6, 0.4, 0.3]} scale={[0.22, 0.02, 0.12]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color={brand.sageDark} roughness={0.6} />
      </mesh>
    </group>
  );
}

type Ingredient = {
  kind: 'olive' | 'tomato' | 'leaf' | 'noodle' | 'crumb';
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  speed: number;
  seed: number;
};

function Ingredients() {
  const items = useMemo<Ingredient[]>(() => {
    const r = mulberry32(42);
    const kinds: Ingredient['kind'][] = ['olive', 'tomato', 'leaf', 'noodle', 'olive', 'crumb', 'tomato', 'leaf', 'noodle', 'crumb'];
    return Array.from({ length: 20 }, (_, i) => {
      const a = (i / 20) * Math.PI * 2 + r() * 0.4;
      const rad = 2.1 + r() * 1.3;
      return {
        kind: kinds[i % kinds.length],
        pos: [Math.cos(a) * rad, 0.4 + (r() - 0.35) * 2.6, Math.sin(a) * rad * 0.8] as [number, number, number],
        rot: [r() * Math.PI, r() * Math.PI, r() * Math.PI] as [number, number, number],
        scale: 0.7 + r() * 0.6,
        speed: 0.6 + r() * 1.4,
        seed: i + 1,
      };
    });
  }, []);

  const noodleGeos = useMemo(
    () => items.map((it) => (it.kind === 'noodle' ? new THREE.TubeGeometry(noodleCurve(it.seed), 64, 0.035, 8, false) : null)),
    [items],
  );

  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={it.speed} rotationIntensity={1.4} floatIntensity={1.6} floatingRange={[-0.15, 0.15]}>
          <group position={it.pos} rotation={it.rot} scale={it.scale}>
            {it.kind === 'olive' && (
              <mesh scale={[0.13, 0.18, 0.13]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhysicalMaterial color={brand.olive} roughness={0.2} clearcoat={1} />
              </mesh>
            )}
            {it.kind === 'tomato' && (
              <group>
                <mesh scale={0.16}>
                  <sphereGeometry args={[1, 32, 32]} />
                  <meshPhysicalMaterial color={brand.auburn} roughness={0.12} clearcoat={1} />
                </mesh>
                <mesh position={[0, 0.16, 0]} scale={[0.07, 0.015, 0.07]}>
                  <sphereGeometry args={[1, 12, 8]} />
                  <meshStandardMaterial color={brand.sageDark} />
                </mesh>
              </group>
            )}
            {it.kind === 'leaf' && (
              <mesh scale={[0.26, 0.02, 0.13]}>
                <sphereGeometry args={[1, 24, 12]} />
                <meshStandardMaterial color={brand.sageLight} roughness={0.5} />
              </mesh>
            )}
            {it.kind === 'noodle' && noodleGeos[i] && (
              <mesh geometry={noodleGeos[i]!}>
                <meshStandardMaterial color={brand.mustardLight} roughness={0.4} />
              </mesh>
            )}
            {it.kind === 'crumb' && (
              <mesh scale={[0.1, 0.07, 0.09]}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={brand.mustard} roughness={0.9} flatShading />
              </mesh>
            )}
          </group>
        </Float>
      ))}
    </>
  );
}

/** Soft steam particles drifting up out of the bowl. */
function Steam({ count = 90 }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const r = mulberry32(3);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i] = r();
      positions[i * 3] = (r() - 0.5) * 1.4;
      positions[i * 3 + 1] = 1 + r() * 2.2;
      positions[i * 3 + 2] = (r() - 0.5) * 1.4;
    }
    return { positions, seeds };
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = performance.now() / 1000;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      arr[i * 3 + 1] += dt * (0.25 + s * 0.35);
      arr[i * 3] += Math.sin(t * 0.8 + s * 10) * dt * 0.08;
      if (arr[i * 3 + 1] > 3.4) {
        arr[i * 3 + 1] = 1;
        arr[i * 3] = (s - 0.5) * 1.2;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.28} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const start = useRef<number | null>(null);
  const wide = viewport.width > 7;

  useFrame((state, dt) => {
    const g = group.current;
    const s = spin.current;
    if (!g || !s) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = Math.min((state.clock.elapsedTime - start.current) / 1.6, 1);
    const scroll = typeof window !== 'undefined' ? Math.min(window.scrollY / window.innerHeight, 1.5) : 0;

    const base = wide ? 0.68 : Math.min(0.58, viewport.width * 0.21);
    const k = easeOutBack(t) * base * (1 - scroll * 0.25);
    g.scale.setScalar(Math.max(k, 0.0001));

    s.rotation.y += dt * 0.18;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.28 - pointer.y * 0.18 + scroll * 0.5, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.x * 0.12, 0.05);
    const tx = (wide ? viewport.width * 0.27 : 0) + pointer.x * 0.25;
    const ty = (wide ? 0.95 : 1.45) + scroll * 2.2;
    g.position.x = THREE.MathUtils.lerp(g.position.x, tx, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, ty, 0.06);
  });

  return (
    <group ref={group} position={[wide ? viewport.width * 0.27 : 0, -3, 0]}>
      <group ref={spin}>
        <Bowl />
        <Ingredients />
      </group>
      <Steam />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={6} blur={2.6} far={2} color="#000000" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.1, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ camera }) => camera.lookAt(0, 0.6, 0)}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={2.2} color="#fff6e8" />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color={brand.cyan} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#f6f5ee" />
        <Lightformer form="ring" intensity={2} position={[4, 3, 2]} scale={2} color="#82f9fd" />
      </Environment>
      <Rig />
    </Canvas>
  );
}
