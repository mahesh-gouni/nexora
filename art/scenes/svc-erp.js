// ERP: a modular city of blocks on a base plate
export default (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [5, 10, 4], rim: [-5, 3, -4], rimI: 26 });
  scene.add(h.ground(-1.05, 0.3));
  const base = h.box(4.4, 0.25, 4.4, 0.1, M.ink); base.position.y = -0.95; scene.add(base);
  const r = h.rng(11);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const hgt = 0.25 + r() * 1.6;
    const amber = (i === 1 && j === 2) || (i === 3 && j === 0);
    const mat = amber ? M.amber : (r() > 0.55 ? M.graphite : (r() > 0.5 ? M.graphiteMatte : M.glass));
    const b = h.box(0.82, hgt, 0.82, 0.1, mat);
    b.position.set(-1.5 + i * 1.0, -0.82 + hgt / 2, -1.5 + j * 1.0); scene.add(b);
  }
  camera.position.set(7.2, 6.8, 7.2); camera.lookAt(0, -0.2, 0); camera.fov = 30;
};
