// CTA backdrop: close crop of the Nexora ribbon
export default (scene, camera, h) => {
  const { M } = h;
  h.lights({ key: [3, 8, 8], rim: [6, 2, -3], rimI: 34 });
  scene.add(h.capsuleBetween([-2.5, 3, -1], [-2.5, -4, -1], 0.9, M.graphiteMatte));
  scene.add(h.capsuleBetween([2.0, 3.5, -1], [2.0, -4, -1], 0.9, M.amber));
  scene.add(h.capsuleBetween([-2.5, 3.2, 0], [2.0, -2.4, 0], 0.9, M.ink));
  const d = h.sphere(0.6, M.amberGlow); d.position.set(3.6, 3.0, 0.3); scene.add(d);
  const d2 = h.sphere(0.3, M.amber); d2.position.set(4.5, 3.6, -0.2); scene.add(d2);
  camera.position.set(0.8, 0.2, 13); camera.lookAt(0.6, 0, 0); camera.fov = 34;
};
