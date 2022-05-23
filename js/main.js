const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
/*
  1. FOV. seberapa lebar kameramu
  2. Aspect ratio. seberapa lebar kameramu tergantung pada tinggi kameramu
  3. Near. jarak dekat kamera
  4. Far. jarak jauh kamera
*/

const renderer = new THREE.WebGLRenderer();

camera.position.z = 5;

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,0,-1);

// scene.add(cube);

renderer.setSize(window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth/this.window.innerHeight;
  camera.updateProjectionMatrix();
})

function animate() {
	requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
	renderer.render(scene,camera );
}

animate();