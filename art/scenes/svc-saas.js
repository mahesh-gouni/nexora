// SaaS: orbiting rings around a core
export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 2, -4], rimI: 26 });
  scene.add(h.ground(-1.9, 0.26));
  const core = h.sphere(0.85, M.amber); scene.add(core);
  const rings = [[1.6, 0.06, [1.2, 0.3, 0]], [2.2, 0.05, [0.4, -0.5, 0.3]], [2.8, 0.045, [1.5, 0.9, 0.2]]];
  rings.forEach(([r, t, rot], i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 24, 160), i === 1 ? M.graphiteMatte : M.ink); m.rotation.set(...rot); m.castShadow = true; scene.add(m);
    const s = h.sphere(0.16 + i * 0.03, i === 0 ? M.amberGlow : M.graphite);
    const a = 0.8 + i * 1.9; const v = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0).applyEuler(new THREE.Euler(...rot)); s.position.copy(v); scene.add(s);
  });
  camera.position.set(4.8, 3.2, 8.6); camera.lookAt(0, -0.1, 0); camera.fov = 32;
};
