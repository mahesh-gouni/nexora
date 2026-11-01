// Admin dashboards: 3D bar chart and a donut segment on a tablet slab
export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 3, -4], rimI: 24 });
  scene.add(h.ground(-0.85, 0.3));
  const slab = h.box(4.6, 0.18, 3.2, 0.12, M.ink); slab.position.y = -0.75; scene.add(slab);
  [0.5, 0.9, 0.7, 1.4, 1.1, 1.9].forEach((v, i) => {
    const b = h.box(0.38, v, 0.38, 0.08, i === 5 ? M.amber : M.graphite);
    b.position.set(-1.9 + i * 0.55, -0.66 + v / 2, -0.55); scene.add(b);
  });
  const ring = (start, len, mat) => { const m = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.17, 32, 96, len), mat); m.castShadow = true; m.rotation.set(-Math.PI / 2, 0, start); m.position.set(1.35, -0.48, 0.75); scene.add(m); };
  ring(0, Math.PI * 1.35, M.graphiteMatte);
  ring(Math.PI * 1.38, Math.PI * 0.6, M.amber);
  const line = h.box(2.4, 0.05, 0.12, 0.03, M.glassLight); line.position.set(-0.8, -0.63, 0.75); scene.add(line);
  const line2 = h.box(1.6, 0.05, 0.12, 0.03, M.glassLight); line2.position.set(-1.2, -0.63, 1.1); scene.add(line2);
  camera.position.set(6.6, 6.2, 7.8); camera.lookAt(-0.2, -0.3, 0.2); camera.fov = 30;
};
