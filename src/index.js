import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import "./style.css";

import Scene from "./objects/Scene";
import Lights from "./objects/Lights";

import {
  normalize,
  COLORS,
  CUBE_WIDTH,
  ARCH_WIDTH,
  ARCH_HEIGHT
} from "./utils";
import Arch from "./objects/Arch";
import Cube from "./objects/Cube";
import LineShape from "./objects/shapes/LineShape";
import Game from "./objects/Game";

var arch, lights, controls, floor, game;

var mousePos = { x: 0, y: 0 };

function createFloor() {
  const floorMat = new THREE.MeshToonMaterial({
    color: COLORS.brown,
    side: THREE.DoubleSide
  });
  const floorGeo = new THREE.PlaneBufferGeometry(1000, 1000);
  floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotateX(-Math.PI / 2);
  const plane = new THREE.GridHelper(1000, 10);
  game.scene.addToScene(plane);
  game.scene.addToScene(floor);
}

function loop() {
  // render the game.scene.scene
  game.scene.renderer.render(game.scene.scene, game.scene.camera);
  // call the loop function again
  requestAnimationFrame(loop);
}

const init = () => {
  game = new Game();
  createFloor();

  controls = new OrbitControls(
    game.scene.camera,
    game.scene.renderer.domElement
  );
  loop();
};

window.addEventListener("load", init, false);
