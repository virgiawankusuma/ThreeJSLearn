/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import * as THREE from 'three';
import '../styles/main.css';

const canvas = document.querySelector('.result');
const scene = new THREE.Scene();

// material
const geometry = new THREE.BoxGeometry(1, 1, 2);
const material = new THREE.MeshBasicMaterial({
  color: '#FFA500',
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: innerWidth,
  height: innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

// camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100,
);

camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(cube.position);
scene.add(camera);

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

  // cube.rotation.y += 0.01;
  window.requestAnimationFrame(loop);
};

loop();
