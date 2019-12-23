import * as THREE from "three";

import Lights from "./Lights";

class Scene {
  constructor() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    this.scene = new THREE.Scene();

    // this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    this.lights = new Lights();
    this.addToScene(this.lights.hemisphereLight);
    this.addToScene(this.lights.shadowLight);
    this.addToScene(this.lights.ambientLight);

    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;

    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    this.camera.position.x = 20;
    this.camera.position.y = 20;
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    this.renderer.setSize(WIDTH, HEIGHT);

    this.renderer.shadowMap.enabled = true;

    this.container = document.getElementById("world");
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.handleWindowResize, false);
  }

  handleWindowResize() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = WIDTH / HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  addToScene(object) {
    this.scene.add(object);
  }
}

export default Scene;
