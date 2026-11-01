import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createKit } from "./kit";
import { scenes } from "./scenes";

export type LiveName = keyof typeof scenes;

/**
 * Renders one Nexora scene into a canvas. The caller decides when it
 * runs (only while visible) via start()/stop().
 */
export function createLive(canvas: HTMLCanvasElement, name: LiveName) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  let small = false;
  const update = scenes[name](scene, camera, createKit(scene));

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    small = w * h < 360_000;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.25);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    // rAF timestamps can precede the resume time: never step backwards.
    const dt = Math.max(0, (now - last) / 1000);
    // Small scenes run at ~30 fps to keep several cards cheap.
    if (small && dt < 1 / 32) return;
    // Clamp the step so a backgrounded tab does not jump the animation.
    t += Math.min(dt, 1 / 20);
    last = now;
    update(t);
    renderer.render(scene, camera);
  }

  resize();
  update(0);
  renderer.render(scene, camera);

  return {
    start() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      raf = 0;
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
      });
      env.dispose();
      renderer.dispose();
    },
  };
}
