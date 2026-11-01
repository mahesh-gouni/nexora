// Foundations: ascending architectural slabs with an amber keystone
export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [6, 11, 4], keyI: 2.6, rim: [-6, 4, -2], rimI: 30, shadowR: 8 });
  scene.add(h.ground(-1.5, 0.34));
  for (let i = 0; i < 7; i++) {
    const hgt = 0.35 + i * 0.42;
    const b = h.box(1.1, hgt, 3.2, 0.06, i === 6 ? M.amber : (i % 2 ? M.graphite : M.graphiteMatte));
    b.position.set(-3.3 + i * 1.12, -1.5 + hgt / 2, 0); scene.add(b);
  }
  const col = h.box(0.5, 4.2, 0.5, 0.08, M.ink); col.position.set(-2.4, 0.6, -2.2); scene.add(col);
  const s = h.sphere(0.42, M.amberGlow); s.position.set(3.35, 2.3, 0.4); scene.add(s);
  camera.position.set(-3.5, 3.2, 12); camera.lookAt(0, 0.4, 0); camera.fov = 32;
};
