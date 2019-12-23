import * as THREE from "three";
import { COLORS, CUBE_WIDTH } from "../../utils";

import Shape from "./Shape";
import Cube from "../Cube";

const LINE_LENGTH = 4;

class LineShape extends Shape {
  constructor() {
    super();
    this.mesh = new THREE.Object3D();
    this.cubes = [];
    for (let i = 0; i < LINE_LENGTH; i++) {
      const c = new Cube(COLORS.red);
      c.mesh.position.y = i * CUBE_WIDTH;
      this.cubes.push(c);
      this.mesh.add(c.mesh);
    }
  }
}

export default LineShape;
