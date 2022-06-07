import * as THREE from 'three';
import '../styles/main.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Canvas
const canvas = document.querySelector('.result');
// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

// Models
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;
let product = null;
gltfLoader.load('/models/ishana.glb', (glb) => {
  product = glb;
  mixer = new THREE.AnimationMixer(product.scene);
  const clips = glb.animations;
  clips.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });
  scene.add(product.scene);
});

// Lights
const ambientLight = new THREE.HemisphereLight(0xdddddd, 0x111111, 4);
ambientLight.position.set(0.5, 1, 0.25);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.castShadow = true;
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Sizes
const sizes = {
  width: 500,
  height: 254,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  10,
  sizes.width / sizes.height,
  0.1,
  100,
);

camera.position.set(0, 2, 10);
scene.add(camera);

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.target.set(0, 0.3, 0);
control.autoRotate = true;
control.enableRotate = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Full Screen
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitRequestFullscreen;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else if (document.exitFullscreen) {
    // eslint-disable-next-line no-unused-expressions
    document.exitFullscreen;
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
});

// animate
const clock = new THREE.Clock();
let previousTime = 0;

const loop = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer) {
    mixer.update(deltaTime);
  }

  control.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};

loop();
