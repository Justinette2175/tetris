import * as THREE from "three";
import { COLORS, CUBE_WIDTH } from "../utils";

import Cube from "./Cube";

class Arch {
  constructor(width, height) {
    this.mesh = new THREE.Object3D();
    for (let i = 0; i < width; i++) {
      const bottomC = new Cube(COLORS.blue);
      bottomC.mesh.position.y = 0;
      bottomC.mesh.position.z = 0;
      bottomC.mesh.position.x = i * CUBE_WIDTH;
      bottomC.castShadow = true;
      bottomC.receiveShadow = true;
      this.mesh.add(bottomC.mesh);
    }
    for (let i = 1; i < height; i++) {
      const leftC = new Cube(COLORS.blue);
      const rightC = new Cube(COLORS.blue);
      leftC.mesh.position.y = i * CUBE_WIDTH;
      leftC.mesh.position.z = 0;
      leftC.mesh.position.x = 0;
      leftC.castShadow = true;
      leftC.receiveShadow = true;
      this.mesh.add(leftC.mesh);

      rightC.mesh.position.y = i * CUBE_WIDTH;
      rightC.mesh.position.z = 0;
      rightC.mesh.position.x = (width - 1) * CUBE_WIDTH;
      rightC.castShadow = true;
      rightC.receiveShadow = true;
      this.mesh.add(rightC.mesh);
    }
  }
}

export default Arch;
