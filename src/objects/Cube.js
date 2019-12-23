import * as THREE from "three";
import { COLORS, CUBE_WIDTH } from "../utils";

class Cube {
  constructor(color = COLORS.red) {
    const geom = new THREE.BoxGeometry(
      CUBE_WIDTH,
      CUBE_WIDTH,
      CUBE_WIDTH,
      20,
      20,
      20
    );
    const material = new THREE.MeshPhongMaterial({
      color
    });
    this.mesh = new THREE.Mesh(geom, material);
    this.mesh.position.y = -CUBE_WIDTH;
  }

  getCubeSlotPosition(relativeShapePosition = { x: 0, y: 0 }) {
    const cubePosition = this.mesh.position;
    const relativeCPosition = {
      x: relativeShapePosition.x + cubePosition.x,
      y: relativeShapePosition.y + cubePosition.y
    };
    return {
      x: relativeCPosition.x / CUBE_WIDTH,
      y: relativeCPosition.y / CUBE_WIDTH
    };
  }
}

export default Cube;
