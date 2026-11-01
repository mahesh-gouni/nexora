// Automation: a flowing tube through gates with amber tokens
export default (scene, camera, h) => {
  const { THREE, M } = h;
  h.lights({ key: [4, 9, 6], rim: [-4, 3, -4], rimI: 24 });
  scene.add(h.ground(-1.6, 0.28));
  const curve = new THREE.CatmullRomCurve3([[-3, -0.6, 1], [-1.5, 0.6, 0], [0, -0.3, -0.6], [1.5, 0.7, 0], [3, -0.2, 0.8]].map((p) => new THREE.Vector3(...p)));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.2, 32), M.ink); tube.castShadow = true; scene.add(tube);
  [0.12, 0.5, 0.88].forEach((t, i) => {
    const p = curve.getPointAt(t), tan = curve.getTangentAt(t);
    const gate = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.09, 24, 96), i === 1 ? M.amber : M.graphiteMatte);
    gate.position.copy(p); gate.lookAt(p.clone().add(tan)); gate.castShadow = true; scene.add(gate);
  });
  [0.3, 0.68].forEach((t) => { const s = h.sphere(0.27, M.amberGlow); s.position.copy(curve.getPointAt(t)); scene.add(s); });
  camera.position.set(1.5, 4.2, 8.8); camera.lookAt(0, -0.1, 0); camera.fov = 34;
};
