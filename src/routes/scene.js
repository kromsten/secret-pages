
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.mjs';

let renderer;


function init(modelURL) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);


  const loader = new GLTFLoader();

  let object;


  console.log("url:", modelURL);

  loader.load( modelURL,  function ( gltf ) {
    console.log("children", gltf.scene.children[0]);
    scene.add( gltf.scene );


    console.log("gltf:", gltf);

    console.log(gltf.asset);
    object = gltf.asset
    object.rotation.z += 1.7;
    object.rotation.x += 0.2;


  }, undefined, function ( error ) { console.error( error ); } );


  
  camera.position.x = 0;
  camera.position.z = 1.2;


  //scene.add(cube);
  
  const animate = () => {
    requestAnimationFrame(animate);
    object.rotation.x += 0;
    object.rotation.y += 0.01;
    renderer.render(scene, camera);
  };


  const resize = () => {
    renderer.setSize(window.innerWidth / 4, window.innerHeight / 3)
    camera.aspect = (window.innerWidth/4) / (window.innerHeight /3);
    camera.updateProjectionMatrix();
  }; 


  return { animate, resize }
  
}  



export const createScene = (el, modelURL) => {

  const f = init(modelURL);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  renderer.setClearColor (0xfafafa, 1);
  
  f.resize();
  f.animate();
}





/* 


*/


//window.addEventListener('resize', resize);