/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import * as THREE from 'three';
import '../styles/main.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.result');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('wraith/wraith.glb', (glb) => {
  console.log(glb);
  const root = glb.scene;
  root.scale.set(0.03, 0.03, 0.03);

  scene.add(root);
});

// lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.set(0, 1, 2);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

// resize
renderer.setSize(sizes.width, sizes.height);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
