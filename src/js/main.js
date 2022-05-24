/* eslint-disable camelcase */
import THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
/*
1. FOV. seberapa lebar kameramu
2. Aspect ratio. seberapa lebar kameramu tergantung pada tinggi kameramu
3. Near. jarak dekat kamera
4. Far. jarak jauh kamera
*/
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// const geometry = new THREE.SphereGeometry(1, 32, 16);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,0,-1);

// scene.add(cube);

const geo_saya = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, // 0
  1.0, 1.0, 1.0, // 1
  -1.0, 1.0, 1.0, // 2
  1.0, -1.0, 1, 0, // 3

  -1.0, -1.0, -1.0, // 4
  1.0, 1.0, -1.0, // 5
  -1.0, 1.0, -1.0, // 6
  1.0, -1.0, -1, 0, // 7
]);
const colors = new Float32Array([
  1.0, 0.0, 0.0,
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
]);

geo_saya.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geo_saya.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geo_saya.setIndex([
  // sisi depan
  0, 3, 1,
  1, 2, 0,

  // sisi belakang
  4, 6, 5,
  5, 7, 4,

  // sisi kiri
  4, 0, 2,
  2, 6, 4,

  // sisi kanan
  5, 1, 3,
  3, 7, 5,

  // sisi atas
  1, 5, 6,
  6, 2, 1,

  // sisi bawah
  0, 4, 7,
  7, 3, 0,
]);
const mat_saya = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
const mesh_saya = new THREE.Mesh(geo_saya, mat_saya);
scene.add(mesh_saya);

window.addEventListener('resize', () => {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.y += 0.01;
  // mesh_saya.rotation.y += 0.02;
  mesh_saya.rotation.x += 0.02;
  renderer.render(scene, camera);
}

animate();
