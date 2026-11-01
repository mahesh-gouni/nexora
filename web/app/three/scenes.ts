import type * as THREE from "three";
import type { Kit } from "./kit";

/** Builds a scene and returns its per-frame update (t = seconds). */
export type SceneBuilder = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  h: Kit,
) => (t: number) => void;

const ease = (x: number) => 1 - Math.pow(1 - x, 3);

/* ------------------------------------------------------------------ hero */
const hero: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [5, 9, 7], keyI: 2.4, rim: [-5, 3, -4], rimI: 30 });
  const back = new THREE.PointLight(0xf5a623, 22, 30, 1.8);
  back.position.set(3.5, 3, -3);
  scene.add(back, h.ground(-2.35, 0.32));

  const N = new THREE.Group();
  N.add(
    h.capsuleBetween([-1.5, 1.5, 0], [-1.5, -1.5, 0], 0.62, M.graphiteMatte),
  );
  N.add(h.capsuleBetween([1.5, 1.5, 0], [1.5, -1.5, 0], 0.62, M.amber));
  N.add(h.capsuleBetween([-1.5, 1.5, 0.42], [1.5, -1.5, 0.42], 0.62, M.ink));
  const d1 = h.sphere(0.46, M.amberGlow);
  const d2 = h.sphere(0.24, M.amber);
  const d3 = h.sphere(0.24, M.amber);
  N.add(d1, d2, d3);
  N.position.set(0.3, 0.1, 0);
  scene.add(N);

  const panels: { g: THREE.Group; y: number; p: number }[] = [];
  const panel = (
    w: number,
    hh: number,
    pos: [number, number, number],
    rot: [number, number, number],
    p: number,
  ) => {
    const g = new THREE.Group();
    g.add(h.box(w, hh, 0.08, 0.04, M.glass));
    const edge = h.box(w * 0.94, 0.03, 0.09, 0.012, M.amberGlow);
    edge.position.set(0, hh / 2 - 0.12, 0.01);
    g.add(edge);
    [0.18, 0, -0.18].forEach((y, i) => {
      const l = h.box(w * (0.55 - i * 0.12), 0.07, 0.09, 0.03, M.glassLight);
      l.position.set(-w * (0.2 + i * 0.06) + w * 0.03, y * hh * 1.6, 0.02);
      g.add(l);
    });
    g.position.set(...pos);
    g.rotation.set(rot[0], rot[1], rot[2]);
    scene.add(g);
    panels.push({ g, y: pos[1], p });
  };
  panel(3.0, 1.9, [-3.6, 1.2, -2.2], [0.05, 0.55, -0.04], 0);
  panel(2.2, 1.3, [4.1, -0.6, -1.4], [-0.05, -0.6, 0.03], 2);
  panel(1.5, 0.95, [-2.6, -1.5, 1.6], [-0.1, 0.4, 0.05], 4);

  const rnd = h.rng(7);
  const bits: { o: THREE.Mesh; y: number; s: number }[] = [];
  [
    [-4.6, -0.6, 0.5],
    [4.8, 2.0, -0.8],
    [-1.0, 3.3, -1.8],
    [2.4, -2.0, 1.4],
    [-5.2, 2.6, -3.5],
    [5.6, -1.9, -2.6],
  ].forEach((p, i) => {
    const s = 0.25 + rnd() * 0.35;
    const o =
      i % 3 === 0
        ? h.sphere(s * 0.6, i % 2 ? M.amber : M.graphite)
        : h.box(s, s, s, s * 0.22, i % 2 ? M.graphite : M.ink);
    o.position.set(p[0], p[1], p[2]);
    o.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    scene.add(o);
    bits.push({ o, y: p[1], s: 0.3 + rnd() * 0.5 });
  });

  camera.fov = 28;
  camera.position.set(0.6, 0.9, 16);
  camera.lookAt(0.3, 0.3, 0);

  return (t) => {
    N.rotation.set(
      0.08 + Math.sin(t * 0.5) * 0.04,
      -0.5 + Math.sin(t * 0.35) * 0.16,
      0.02,
    );
    N.position.y = 0.1 + Math.sin(t * 0.8) * 0.08;
    d1.position.set(2.65, 2.75 + Math.sin(t * 1.4) * 0.12, 0.2);
    d2.position.set(
      2.65 + Math.cos(t * 0.9) * 0.85,
      2.75 + Math.sin(t * 0.9) * 0.6,
      0.2 + Math.sin(t * 0.9) * 0.4,
    );
    d3.position.set(
      2.65 + Math.cos(t * 0.9 + Math.PI) * 0.85,
      2.75 + Math.sin(t * 0.9 + Math.PI) * 0.6,
      0.2 - Math.sin(t * 0.9) * 0.4,
    );
    panels.forEach(
      ({ g, y, p }) => (g.position.y = y + Math.sin(t * 0.7 + p) * 0.15),
    );
    bits.forEach(({ o, y, s }, i) => {
      o.position.y = y + Math.sin(t * s * 2 + i) * 0.2;
      o.rotation.x += 0.003 * (1 + s);
      o.rotation.y += 0.004 * (1 + s);
    });
  };
};

/* ------------------------------------------------------------- services */
const web: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 2, -3], rimI: 22 });
  scene.add(h.ground(-1.9, 0.3));
  const wins: { g: THREE.Group; y: number }[] = [];
  const win = (
    y: number,
    z: number,
    x: number,
    mat: THREE.Material,
    accent: boolean,
  ) => {
    const g = new THREE.Group();
    g.add(h.box(3.2, 0.1, 2.1, 0.05, mat));
    const top = h.box(3.2, 0.12, 0.28, 0.05, M.ink);
    top.position.set(0, 0.03, -0.92);
    g.add(top);
    [-1.42, -1.26, -1.1].forEach((dx, i) => {
      const d = h.sphere(0.045, i === 0 ? M.amberGlow : M.graphiteMatte);
      d.position.set(dx, 0.12, -0.92);
      g.add(d);
    });
    if (accent) {
      const b = h.box(1.3, 0.06, 0.16, 0.03, M.amber);
      b.position.set(-0.7, 0.08, -0.45);
      g.add(b);
    }
    (
      [
        [-0.2, 0.9],
        [0.15, 1.5],
        [0.5, 1.1],
      ] as const
    ).forEach(([dz, w]) => {
      const l = h.box(w, 0.05, 0.1, 0.03, M.glassLight);
      l.position.set(-1.45 + w / 2, 0.07, dz);
      g.add(l);
    });
    g.position.set(x, y, z);
    g.rotation.set(0, 0.6, 0);
    scene.add(g);
    wins.push({ g, y });
  };
  win(-1.1, 0.4, 0.2, M.graphite, false);
  win(-0.25, -0.2, -0.1, M.glass, false);
  win(0.6, -0.8, -0.4, M.glass, true);
  const s = h.sphere(0.32, M.amberGlow);
  scene.add(s);
  camera.position.set(7.2, 6.4, 7.6);
  camera.lookAt(0.3, -0.15, -0.3);
  return (t) => {
    wins.forEach(
      ({ g, y }, i) =>
        (g.position.y = y + Math.sin(t * 1.1 - i * 0.7) * 0.12 * (i + 1) * 0.6),
    );
    s.position.set(
      0.2 + Math.cos(t * 0.8) * 1.9,
      1.3 + Math.sin(t * 1.6) * 0.25,
      -0.2 + Math.sin(t * 0.8) * 1.4,
    );
  };
};

const commerce: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [5, 9, 5], rim: [-4, 3, -3], rimI: 24 });
  scene.add(h.ground(-1.2, 0.32));
  const b1 = h.box(1.7, 1.7, 1.7, 0.18, M.graphite);
  b1.position.set(-0.6, -0.35, 0.2);
  b1.rotation.y = 0.4;
  const b2 = h.box(1.2, 1.2, 1.2, 0.14, M.amber);
  b2.position.set(0.95, -0.6, 0.6);
  b2.rotation.y = -0.3;
  const b3 = h.box(1.0, 1.0, 1.0, 0.12, M.ink);
  const coin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.14, 48),
    M.amberGlow,
  );
  coin.castShadow = true;
  const s = h.sphere(0.18, M.amber);
  scene.add(b1, b2, b3, coin, s);
  camera.position.set(6, 4.6, 7.2);
  camera.lookAt(0.15, 0.1, 0.2);
  return (t) => {
    // the small parcel lands on the big one, rests, lifts off again
    const c = (t % 4) / 4;
    const lift = c < 0.5 ? 0 : Math.sin((c - 0.5) * 2 * Math.PI) * 0.45;
    b3.position.set(-0.4, 1.1 + lift, 0.1);
    b3.rotation.set(0.15, 0.9 + t * 0.25, 0.1);
    coin.position.set(1.1, 0.75 + Math.sin(t * 1.5) * 0.18, -0.2);
    coin.rotation.set(1.2, 0.2, t * 2.2);
    s.position.set(1.9, 1.5 + Math.abs(Math.sin(t * 2.4)) * 0.4, -0.6);
  };
};

const erp: SceneBuilder = (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [5, 10, 4], rim: [-5, 3, -4], rimI: 26 });
  scene.add(h.ground(-1.05, 0.3));
  const base = h.box(4.4, 0.25, 4.4, 0.1, M.ink);
  base.position.y = -0.95;
  scene.add(base);
  const r = h.rng(11);
  const blocks: { m: THREE.Mesh; hgt: number; i: number; j: number }[] = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const hgt = 0.25 + r() * 1.6;
      const amber = (i === 1 && j === 2) || (i === 3 && j === 0);
      const mat = amber
        ? M.amber
        : r() > 0.55
          ? M.graphite
          : r() > 0.5
            ? M.graphiteMatte
            : M.glass;
      const b = h.box(0.82, 1, 0.82, 0.1, mat);
      b.position.set(-1.5 + i, 0, -1.5 + j);
      scene.add(b);
      blocks.push({ m: b, hgt, i, j });
    }
  camera.position.set(7.2, 6.8, 7.2);
  camera.lookAt(0, -0.2, 0);
  return (t) => {
    blocks.forEach(({ m, hgt, i, j }) => {
      const k = 0.65 + 0.35 * Math.sin(t * 1.3 - (i + j) * 0.55);
      const hh = Math.max(0.2, hgt * k);
      m.scale.y = hh;
      m.position.y = -0.82 + hh / 2;
    });
  };
};

const dashboard: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 3, -4], rimI: 24 });
  scene.add(h.ground(-0.85, 0.3));
  const slab = h.box(4.6, 0.18, 3.2, 0.12, M.ink);
  slab.position.y = -0.75;
  scene.add(slab);
  const vals = [0.5, 0.9, 0.7, 1.4, 1.1, 1.9];
  const bars = vals.map((v, i) => {
    const b = h.box(0.38, 1, 0.38, 0.08, i === 5 ? M.amber : M.graphite);
    b.position.set(-1.9 + i * 0.55, 0, -0.55);
    scene.add(b);
    return { b, v };
  });
  const ringA = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.17, 24, 72, Math.PI * 1.35),
    M.graphiteMatte,
  );
  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.17, 24, 72, Math.PI * 0.6),
    M.amber,
  );
  const donut = new THREE.Group();
  ringB.rotation.z = Math.PI * 1.38;
  donut.add(ringA, ringB);
  donut.rotation.x = -Math.PI / 2;
  donut.position.set(1.35, -0.48, 0.75);
  ringA.castShadow = ringB.castShadow = true;
  scene.add(donut);
  const l1 = h.box(2.4, 0.05, 0.12, 0.03, M.glassLight);
  l1.position.set(-0.8, -0.63, 0.75);
  const l2 = h.box(1.6, 0.05, 0.12, 0.03, M.glassLight);
  l2.position.set(-1.2, -0.63, 1.1);
  scene.add(l1, l2);
  camera.position.set(6.6, 6.2, 7.8);
  camera.lookAt(-0.2, -0.3, 0.2);
  return (t) => {
    bars.forEach(({ b, v }, i) => {
      const hh = v * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.8)));
      b.scale.y = hh;
      b.position.y = -0.66 + hh / 2;
    });
    donut.rotation.z = t * 0.6;
  };
};

const saas: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 2, -4], rimI: 26 });
  scene.add(h.ground(-1.9, 0.26));
  const core = h.sphere(0.85, M.amber);
  scene.add(core);
  const orbits = (
    [
      [1.6, 0.06, [1.2, 0.3, 0]],
      [2.2, 0.05, [0.4, -0.5, 0.3]],
      [2.8, 0.045, [1.5, 0.9, 0.2]],
    ] as const
  ).map(([r, t, rot], i) => {
    const g = new THREE.Group();
    g.rotation.set(rot[0], rot[1], rot[2]);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, t, 16, 120),
      i === 1 ? M.graphiteMatte : M.ink,
    );
    ring.castShadow = true;
    const sat = h.sphere(0.16 + i * 0.03, i === 0 ? M.amberGlow : M.graphite);
    g.add(ring, sat);
    scene.add(g);
    return { sat, r, speed: [0.9, -0.6, 0.45][i], phase: 0.8 + i * 1.9 };
  });
  camera.position.set(4.8, 3.2, 8.6);
  camera.lookAt(0, -0.1, 0);
  return (t) => {
    core.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
    orbits.forEach(({ sat, r, speed, phase }) => {
      const a = phase + t * speed;
      sat.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
    });
  };
};

const automation: SceneBuilder = (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 3, -4], rimI: 24 });
  scene.add(h.ground(-1.6, 0.28));
  const curve = new THREE.CatmullRomCurve3(
    [
      [-3, -0.6, 1],
      [-1.5, 0.6, 0],
      [0, -0.3, -0.6],
      [1.5, 0.7, 0],
      [3, -0.2, 0.8],
    ].map((p) => new THREE.Vector3(p[0], p[1], p[2])),
  );
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 160, 0.2, 24),
    M.ink,
  );
  tube.castShadow = true;
  scene.add(tube);
  const gates = [0.12, 0.5, 0.88].map((u, i) => {
    const p = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    const gate = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.09, 16, 72),
      i === 1 ? M.amber : M.graphiteMatte,
    );
    gate.position.copy(p);
    gate.lookAt(p.clone().add(tan));
    gate.castShadow = true;
    scene.add(gate);
    return gate;
  });
  const tokens = [0, 0.33, 0.66].map(() => {
    const s = h.sphere(0.27, M.amberGlow);
    scene.add(s);
    return s;
  });
  camera.position.set(1.5, 4.2, 8.8);
  camera.lookAt(0, -0.1, 0);
  return (t) => {
    tokens.forEach((s, i) => {
      const u = (((t * 0.11 + i / 3) % 1) + 1) % 1;
      s.position.copy(curve.getPointAt(u));
      s.scale.setScalar(Math.min(1, u * 12, (1 - u) * 12));
    });
    gates.forEach((g, i) => (g.rotation.z = t * (i % 2 ? -0.8 : 0.8)));
  };
};

/* ---------------------------------------------------------------- about */
const about: SceneBuilder = (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [6, 11, 4], keyI: 2.6, rim: [-6, 4, -2], rimI: 30 });
  scene.add(h.ground(-1.5, 0.34));
  const STEPS = 7;
  const sx = (i: number) => -3.3 + i * 1.12;
  const top = (i: number) => -1.5 + 0.35 + i * 0.42;
  for (let i = 0; i < STEPS; i++) {
    const hgt = 0.35 + i * 0.42;
    const b = h.box(
      1.1,
      hgt,
      3.2,
      0.06,
      i === STEPS - 1 ? M.amber : i % 2 ? M.graphite : M.graphiteMatte,
    );
    b.position.set(sx(i), -1.5 + hgt / 2, 0);
    scene.add(b);
  }
  const col = h.box(0.5, 4.2, 0.5, 0.08, M.ink);
  col.position.set(-2.4, 0.6, -2.2);
  scene.add(col);

  // The ball drops onto the top step, then bounces down every step.
  const R = 0.36;
  const ball = h.sphere(R, M.amberGlow);
  scene.add(ball);
  const Z = 0.5;
  const DROP = 0.7,
    HOP = 0.44,
    OFF = 0.55,
    REST = 0.8;
  const CYCLE = DROP + (STEPS - 1) * HOP + OFF + REST;
  const rest = (i: number) => top(i) + R;
  const groundY = -1.5 + R;

  camera.position.set(-3.5, 3.2, 12);
  camera.lookAt(0, 0.4, 0);

  return (t) => {
    let c = t % CYCLE;
    let x: number,
      y: number,
      squash = 0,
      scale = 1;
    if (c < DROP) {
      const p = c / DROP;
      x = sx(STEPS - 1);
      y = rest(STEPS - 1) + 3.2 * (1 - p * p);
      scale = Math.min(1, p * 3);
    } else if ((c -= DROP) < (STEPS - 1) * HOP) {
      const k = Math.floor(c / HOP);
      const p = (c - k * HOP) / HOP;
      const from = STEPS - 1 - k;
      const to = from - 1;
      x = sx(from) + (sx(to) - sx(from)) * p;
      const y0 = rest(from),
        y1 = rest(to);
      y = y0 + (y1 - y0) * p + 4 * 0.55 * p * (1 - p);
      if (p < 0.12) squash = 1 - p / 0.12;
    } else if ((c -= (STEPS - 1) * HOP) < OFF) {
      const p = c / OFF;
      x = sx(0) - 1.2 * p;
      y = rest(0) + (groundY - rest(0)) * p + 4 * 0.4 * p * (1 - p);
      if (p < 0.12) squash = 1 - p / 0.12;
    } else {
      const p = (c - OFF) / REST;
      x = sx(0) - 1.2 - 0.5 * ease(Math.min(1, p * 1.5));
      y = groundY;
      scale = 1 - ease(Math.max(0, (p - 0.4) / 0.6));
    }
    ball.position.set(x, y - squash * R * 0.18, Z);
    ball.scale.set(
      scale * (1 + squash * 0.18),
      scale * (1 - squash * 0.22),
      scale * (1 + squash * 0.18),
    );
  };
};

/* ---------------------------------------------------------------- stack */
const stack: SceneBuilder = (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [4, 10, 5], rim: [-5, 2, -4], rimI: 26 });
  scene.add(h.ground(-2.4, 0.26));
  const layers = (
    [
      [1.5, M.glass, true],
      [0, M.graphite, false],
      [-1.5, M.amber, false],
    ] as const
  ).map(([y, mat, accent]) => {
    const s = h.box(3.6, 0.32, 3.6, 0.14, mat);
    scene.add(s);
    let a: THREE.Mesh | null = null;
    if (accent) {
      a = h.box(1.2, 0.08, 0.3, 0.04, M.amberGlow);
      scene.add(a);
    }
    return { s, a, y };
  });
  const posts = (
    [
      [-1.2, -1.2],
      [1.2, -1.2],
      [-1.2, 1.2],
      [1.2, 1.2],
    ] as const
  ).map(([x, z]) => {
    const c = h.capsuleBetween(
      [x, -1.3, z],
      [x, 1.3, z],
      0.05,
      M.graphiteMatte,
    );
    scene.add(c);
    return c;
  });
  camera.position.set(7.6, 5.8, 7.6);
  camera.lookAt(0, -0.1, 0);
  return (t) => {
    const spread = 1 + 0.18 * Math.sin(t * 0.9);
    layers.forEach(({ s, a, y }, i) => {
      s.position.y = y * spread + Math.sin(t * 1.2 + i) * 0.05;
      s.rotation.y = Math.sin(t * 0.4) * 0.12;
      if (a) {
        a.position.set(-0.9, s.position.y + 0.2, 1.2);
        a.rotation.y = s.rotation.y;
      }
    });
    posts.forEach((p) => (p.scale.y = spread));
  };
};

/* ------------------------------------------------------------------ cta */
const cta: SceneBuilder = (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [3, 8, 8], rim: [6, 2, -3], rimI: 34 });
  scene.add(
    h.capsuleBetween([-2.5, 3, -1], [-2.5, -4, -1], 0.9, M.graphiteMatte),
  );
  scene.add(h.capsuleBetween([2.0, 3.5, -1], [2.0, -4, -1], 0.9, M.amber));
  scene.add(h.capsuleBetween([-2.5, 3.2, 0], [2.0, -2.4, 0], 0.9, M.ink));
  const d = h.sphere(0.6, M.amberGlow);
  const d2 = h.sphere(0.3, M.amber);
  scene.add(d, d2);
  camera.position.set(0.8, 0.2, 13);
  camera.lookAt(0.6, 0, 0);
  return (t) => {
    d.position.set(3.6, 3.0 + Math.sin(t * 1.2) * 0.2, 0.3);
    d2.position.set(
      3.6 + Math.cos(t * 1.1) * 1.0,
      3.0 + Math.sin(t * 1.1) * 0.7,
      0.3 + Math.sin(t * 1.1) * 0.5,
    );
  };
};

export const scenes = {
  hero,
  "svc-web": web,
  "svc-commerce": commerce,
  "svc-erp": erp,
  "svc-dashboard": dashboard,
  "svc-saas": saas,
  "svc-automation": automation,
  about,
  stack,
  cta,
} satisfies Record<string, SceneBuilder>;
