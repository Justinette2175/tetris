import * as THREE from "three";
import { COLORS } from "../utils";

class Cloud {
  constructor() {
    this.mesh = new THREE.Object3D();

    var geom = new THREE.BoxGeometry(20, 20, 20);

    var mat = new THREE.MeshPhongMaterial({
      color: COLORS.white
    });

    var nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {
      var m = new THREE.Mesh(geom, mat);

      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      var s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;

      this.mesh.add(m);
    }
  }
}

export default Cloud;
