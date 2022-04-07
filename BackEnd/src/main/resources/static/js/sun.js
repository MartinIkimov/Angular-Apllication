
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
// import vertexShader from './shaders/vertexSun.frag';
// import fragmentShader from '/shaders/fragmentSun.frag';
//
// import atmosphereVertexShader from '/shaders/atmosphereVertexSun.frag';
// import atmosphereFragmentShader from '/shaders/atmosphereFragmentSun.frag';

const canvasContainer = document.querySelector('#canvasContainer');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);

// the antialias: true makes the earth look smoother
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas')
});

//only in the vid

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
//this line of code add more resolution to the image depending on the monitor
renderer.setPixelRatio(window.devicePixelRatio);


//create a sphere
//we are using ShaderMaterial instead of BasicMaterial so we can use our own shaders
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({

      //!!! ONLY IF NOT USING CUSTOM SHADERS USE LINES DOWN
      // color: 0xFF0000
      // map the texture on the sphere
      map: new THREE.TextureLoader().load('/images/f48f469bd71cd046d3e9cb340fb608ce_large.png')
    }));

//create atmosphere

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 10000;
  starVertices.push(x, y ,z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 15;


const mouse = {
  x: 0,
  y: 0
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //rotation
  sphere.rotation.y += 0.003;
  gsap.to(group.rotation, {
    x: -mouse.y *0.3,
    y:  mouse.x * 0.5,
    duration: 2
  })
}

animate();


addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
 })