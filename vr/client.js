// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {Module} from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {
  // const scene = new THREE.Scene();
  // const cubeModule = new CubeModule()
  const vr = new VRInstance(bundle, 'vrGame', parent, {
    // Add custom options here
    ...options,
  });

  // let crate = new THREE.TextureLoader().load('../components/crate.gif')  

  // let randomNum = Math.floor(Math.random()*10 + 1)
  // console.log(randomNum)
  // let cubesArr = []

  // for (var i = 0; i < randomNum; i++) {
  //   let posX = (Math.random() < 0.5) ? (Math.floor(Math.random()*3)) : Math.floor(Math.random()*-3);
  //   let posY = (Math.random() < 0.5) ? (Math.floor(Math.random()*3)) : Math.floor(Math.random()*-2);
  //   let posZ = Math.floor(Math.random()* -15) - 1 ;

  //   let geo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  //   let texture = new THREE.MeshBasicMaterial({ map: crate })

  //   let cube = new THREE.Mesh(geo, texture)

  //   cube.position.x = posX
  //   cube.position.y = posY
  //   cube.position.z = posZ
  //   cubesArr.push(cube)
  //   scene.add(cube)
  // }

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
    // const seconds = timestamp / 1000;
    // // console.log(timestamp)
    // for (var i = 0; i < cubesArr.length; i++) {
    //   let curr = cubesArr[i]
    //   // curr.position.x = curr.position.x + (0.01);
    //   // curr.position.y = curr.position.y + (0.01);
    //   curr.position.z = curr.position.z + (0.005)
    //   if (curr.position.z === 0){

      // }
    // }
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
