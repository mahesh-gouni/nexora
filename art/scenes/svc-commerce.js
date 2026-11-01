// E-commerce: parcels, a coin and a tag-like slab
export default (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [5, 9, 5], rim: [-4, 3, -3], rimI: 24 });
  scene.add(h.ground(-1.2, 0.32));
  const b1 = h.box(1.7, 1.7, 1.7, 0.18, M.graphite); b1.position.set(-0.6, -0.35, 0.2); b1.rotation.y = 0.4; scene.add(b1);
  const b2 = h.box(1.2, 1.2, 1.2, 0.14, M.amber); b2.position.set(0.95, -0.6, 0.6); b2.rotation.y = -0.3; scene.add(b2);
  const b3 = h.box(1.0, 1.0, 1.0, 0.12, M.ink); b3.position.set(-0.4, 1.1, 0.1); b3.rotation.set(0.15, 0.9, 0.1); scene.add(b3);
  const coin = new h.THREE.Mesh(new h.THREE.CylinderGeometry(0.55, 0.55, 0.14, 64), M.amberGlow); coin.castShadow = true;
  coin.position.set(1.1, 0.75, -0.2); coin.rotation.set(1.2, 0.2, 0.5); scene.add(coin);
  const s = h.sphere(0.18, M.amber); s.position.set(1.9, 1.5, -0.6); scene.add(s);
  camera.position.set(6, 4.6, 7.2); camera.lookAt(0.15, 0.1, 0.2); camera.fov = 30;
};
