import * as THREE from "three";

class Lights {
  constructor() {
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // this.helper = new THREE.CameraHelper(this.shadowLight.shadow.camera);

    this.shadowLight.position.set(150, 350, 350);

    this.shadowLight.castShadow = true;

    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
    this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);
  }
}

export default Lights;
