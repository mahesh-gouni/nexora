// Custom web applications: stacked floating app windows
export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 2, -3], rimI: 22 });
  scene.add(h.ground(-1.9, 0.3));
  const win = (y, z, x, mat, accent) => {
    const g = new THREE.Group();
    g.add(h.box(3.2, 0.1, 2.1, 0.05, mat));
    const top = h.box(3.2, 0.12, 0.28, 0.05, M.ink); top.position.set(0, 0.03, -0.92); g.add(top);
    [-1.42, -1.26, -1.1].forEach((dx, i) => { const d = h.sphere(0.045, i === 0 ? M.amberGlow : M.graphiteMatte); d.position.set(dx, 0.12, -0.92); g.add(d); });
    if (accent) { const b = h.box(1.3, 0.06, 0.16, 0.03, M.amber); b.position.set(-0.7, 0.08, -0.45); g.add(b); }
    [[-0.2, 0.9], [0.15, 1.5], [0.5, 1.1]].forEach(([dz, w]) => { const l = h.box(w, 0.05, 0.1, 0.03, M.glassLight); l.position.set(-1.45 + w / 2, 0.07, dz); g.add(l); });
    g.position.set(x, y, z); g.rotation.set(0, 0.6, 0); scene.add(g);
  };
  win(-1.1, 0.4, 0.2, M.graphite, false);
  win(-0.25, -0.2, -0.1, M.glass, false);
  win(0.6, -0.8, -0.4, M.glass, true);
  const s = h.sphere(0.32, M.amberGlow); s.position.set(1.7, 1.4, 0.3); scene.add(s);
  camera.position.set(7.2, 6.4, 7.6); camera.lookAt(0.3, -0.15, -0.3); camera.fov = 30;
};
