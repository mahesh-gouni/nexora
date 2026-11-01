// Technology stack: three floating layers (interface / API / data)
export default (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [4, 10, 5], rim: [-5, 2, -4], rimI: 26 });
  scene.add(h.ground(-2.4, 0.26));
  const layer = (y, mat, accent) => {
    const s = h.box(3.6, 0.32, 3.6, 0.14, mat); s.position.y = y; scene.add(s);
    if (accent) { const a = h.box(1.2, 0.08, 0.3, 0.04, M.amberGlow); a.position.set(-0.9, y + 0.2, 1.2); scene.add(a); }
  };
  layer(1.5, M.glass, true);
  layer(0, M.graphite, false);
  layer(-1.5, M.amber, false);
  [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].forEach(([x, z]) => {
    const c = h.capsuleBetween([x, -1.3, z], [x, 1.3, z], 0.05, M.graphiteMatte); scene.add(c);
  });
  camera.position.set(7.6, 5.8, 7.6); camera.lookAt(0, -0.1, 0); camera.fov = 30;
};
