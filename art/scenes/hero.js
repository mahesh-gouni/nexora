export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [5, 9, 7], keyI: 2.4, rim: [-5, 3, -4], rimI: 30 });
  const back = new THREE.PointLight(0xf5a623, 22, 30, 1.8); back.position.set(3.5, 3, -3); scene.add(back);
  scene.add(h.ground(-2.35, 0.32));

  const N = new THREE.Group();
  N.add(h.capsuleBetween([-1.5, 1.5, 0], [-1.5, -1.5, 0], 0.62, M.graphiteMatte));
  N.add(h.capsuleBetween([1.5, 1.5, 0], [1.5, -1.5, 0], 0.62, M.amber));
  N.add(h.capsuleBetween([-1.5, 1.5, 0.42], [1.5, -1.5, 0.42], 0.62, M.ink));
  const d1 = h.sphere(0.46, M.amberGlow); d1.position.set(2.65, 2.75, 0.2);
  const d2 = h.sphere(0.24, M.amber); d2.position.set(3.4, 3.25, 0.1);
  const d3 = h.sphere(0.24, M.amber); d3.position.set(3.45, 2.3, 0.3);
  N.add(d1, d2, d3);
  N.rotation.set(0.08, -0.5, 0.02);
  N.position.set(0.3, 0.1, 0);
  scene.add(N);

  // Floating glass interface panels (no text: purely abstract)
  const panel = (w, hh, pos, rot, mat = M.glass) => {
    const g = new THREE.Group();
    const p = h.box(w, hh, 0.08, 0.04, mat); g.add(p);
    // thin amber edge along the top and a few content "lines"
    const edge = h.box(w * 0.94, 0.03, 0.09, 0.012, M.amberGlow); edge.position.set(0, hh / 2 - 0.12, 0.01); g.add(edge);
    [0.18, 0.0, -0.18].forEach((y, i) => { const l = h.box(w * (0.55 - i * 0.12), 0.07, 0.09, 0.03, M.glassLight); l.position.set(-w * (0.2 + i * 0.06) + w * 0.03, y * hh * 1.6, 0.02); g.add(l); });
    g.position.set(...pos); g.rotation.set(...rot); scene.add(g); return g;
  };
  panel(3.0, 1.9, [-3.6, 1.2, -2.2], [0.05, 0.55, -0.04]);
  panel(2.2, 1.3, [4.1, -0.6, -1.4], [-0.05, -0.6, 0.03]);
  panel(1.5, 0.95, [-2.6, -1.5, 1.6], [-0.1, 0.4, 0.05]);

  // small floating cubes / spheres
  const rnd = h.rng(7);
  const spots = [[-4.6, -0.6, 0.5], [4.8, 2.0, -0.8], [-1.0, 3.3, -1.8], [2.4, -2.0, 1.4], [-5.2, 2.6, -3.5], [5.6, -1.9, -2.6]];
  spots.forEach((p, i) => {
    const s = 0.25 + rnd() * 0.35;
    const o = i % 3 === 0 ? h.sphere(s * 0.6, i % 2 ? M.amber : M.graphite) : h.box(s, s, s, s * 0.22, i % 2 ? M.graphite : M.ink);
    o.position.set(...p); o.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3); scene.add(o);
  });

  camera.fov = 28;
  camera.position.set(0.6, 0.9, 16);
  camera.lookAt(0.3, 0.3, 0);
};
