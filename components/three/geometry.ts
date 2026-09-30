import * as THREE from 'three';

/** Outer wall of a ceramic bowl, from the foot up to the rim. */
export function bowlOuterProfile(segments = 28) {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0.001, 0.08), new THREE.Vector2(0.5, 0.08), new THREE.Vector2(0.56, 0)];
  pts.push(new THREE.Vector2(0.62, 0), new THREE.Vector2(0.64, 0.1));
  for (let i = 1; i <= segments; i++) {
    const a = (i / segments) * (Math.PI / 2);
    pts.push(new THREE.Vector2(0.64 + Math.sin(a) * 0.8, 0.1 + (1 - Math.cos(a)) * 0.78));
  }
  // rounded rim
  pts.push(new THREE.Vector2(1.445, 0.9), new THREE.Vector2(1.42, 0.915), new THREE.Vector2(1.39, 0.9));
  return pts;
}

/** Inner glaze of the bowl, from the rim down to the centre. */
export function bowlInnerProfile(segments = 28) {
  const pts: THREE.Vector2[] = [];
  for (let i = segments; i >= 0; i--) {
    const a = (i / segments) * (Math.PI / 2);
    pts.push(new THREE.Vector2(0.001 + Math.sin(a) * 1.388, 0.2 + (1 - Math.cos(a)) * 0.7));
  }
  return pts;
}

/** A shallow dinner plate. */
export function plateProfile() {
  return [
    new THREE.Vector2(0.001, 0.02),
    new THREE.Vector2(0.55, 0.02),
    new THREE.Vector2(0.62, 0.0),
    new THREE.Vector2(0.66, 0.05),
    new THREE.Vector2(0.95, 0.12),
    new THREE.Vector2(1.0, 0.13),
    new THREE.Vector2(0.98, 0.15),
    new THREE.Vector2(0.66, 0.09),
    new THREE.Vector2(0.001, 0.07),
  ];
}

/** A loose tangle of noodle-like curves (for the floating pasta strands). */
export function noodleCurve(seed: number) {
  const rand = mulberry32(seed);
  const pts: THREE.Vector3[] = [];
  let p = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < 7; i++) {
    pts.push(p.clone());
    p = p.add(new THREE.Vector3((rand() - 0.5) * 0.5, (rand() - 0.5) * 0.5, (rand() - 0.5) * 0.5));
  }
  return new THREE.CatmullRomCurve3(pts);
}

export function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const brand = {
  sage: '#728d6e',
  sageLight: '#bcd5b4',
  sageDark: '#56694f',
  auburn: '#b56b4e',
  auburnLight: '#eaa689',
  mustard: '#cfb167',
  mustardLight: '#f0d38a',
  cream: '#f6f5ee',
  olive: '#6b7446',
  black: '#171517',
  cyan: '#82f9fd',
};
