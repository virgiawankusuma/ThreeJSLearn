import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles/main.css';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const canvas = document.querySelector('.result');
const scene = new THREE.Scene();

// material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: '#FFA500',
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

gui.add(cube.position, 'x').min(-3).max(3).step(0.01);
gui.add(cube.position, 'y').min(-3).max(3).step(0.01);
gui.add(cube.position, 'z').min(-3).max(3).step(0.01);

const sizes = {
  width: innerWidth,
  height: innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   1000,
// );

camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(cube.position);
scene.add(camera);

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

// resize
renderer.setSize(sizes.width, sizes.height);

// CLock
const clock = new THREE.Clock();
// gsap.to(cube.position, {duration:2, y:2, stagger:0.2, ease:'bounce'})

const loop = () => {
  const elapsedTime = clock.getElapsedTime();
  // render
  renderer.render(scene, camera);

  cube.rotation.x = elapsedTime;
  // cube.rotation.y = Math.cos(elapsedTime);
  // cube.rotation.x = Math.sin(elapsedTime);
  control.update();

  window.requestAnimationFrame(loop);
};

loop();
