import * as THREE from "three";
import LineShape from "./shapes/LineShape";
import { ARCH_HEIGHT, ARCH_WIDTH, CUBE_WIDTH, DIRECTIONS } from "../utils";
import Scene from "./Scene";
import Arch from "./Arch";

const KEY_CODES = Object.freeze({
  LEFT: 106,
  RIGHT: 108,
  DOWN: 107
});

class Game {
  constructor() {
    this.scene = new Scene();
    this.arch = null;
    this.shapes = [];
    this.slotsMatrix = [];
    this.activeShape = null;
    this.fallInterval = null;
    this.createArch();
    this.initializeSlotsMatrix();
    this.listenToKeypress();
    this.generateShape();
  }

  listenToKeypress() {
    window.addEventListener("keypress", e => {
      if (e.keyCode === KEY_CODES.LEFT) {
        this.moveActiveShapeX(DIRECTIONS.LEFT);
      } else if (e.keyCode === KEY_CODES.RIGHT) {
        this.moveActiveShapeX(DIRECTIONS.RIGHT);
      }
    });
  }

  generateShape() {
    const newShape = new LineShape();
    newShape.mesh.position.y = ARCH_HEIGHT * CUBE_WIDTH + CUBE_WIDTH / 2;
    newShape.mesh.position.x = CUBE_WIDTH * 3.5;
    this.activeShape = newShape;
    this.shapes.push(newShape);
    this.scene.addToScene(newShape.mesh);
    this.fallInterval = setInterval(() => this.activeShapeFall(), 200);
    return newShape;
  }

  createArch() {
    this.arch = new Arch(ARCH_WIDTH, ARCH_HEIGHT);
    this.arch.mesh.position.x = (-ARCH_WIDTH * CUBE_WIDTH) / 2 + CUBE_WIDTH / 2;
    this.arch.mesh.position.y = CUBE_WIDTH / 2;
    this.scene.addToScene(this.arch.mesh);
  }

  moveActiveShapeX(dir) {
    this.activeShape.moveX(dir, this.arch.mesh.position, this.slotsMatrix);
  }

  initializeSlotsMatrix() {
    const slotsMatrix = [];
    for (let i = 0; i < ARCH_WIDTH - 2; i++) {
      const row = [];
      for (let j = 0; j < ARCH_HEIGHT + 4; j++) {
        row.push(1);
      }
      slotsMatrix.push(row);
    }
    this.slotsMatrix = slotsMatrix;
  }

  blockSpotInSlotMatrix() {
    const activeShapeSlots = this.activeShape.getCubesSlotPositions(
      this.arch.mesh.position
    );
    let canContinue = true;
    activeShapeSlots.forEach(s => {
      if (s.y > ARCH_HEIGHT - 1) {
        canContinue = false;
      }
      this.slotsMatrix[s.x][s.y] = 0;
    });
    return canContinue;
  }

  activeShapeFall() {
    const canGoDown = this.activeShape.canGo(
      DIRECTIONS.DOWN,
      this.arch.mesh.position,
      this.slotsMatrix
    );

    if (canGoDown) {
      this.activeShape.mesh.position.y -= CUBE_WIDTH;
    } else {
      clearInterval(this.fallInterval);
      const canContinue = this.blockSpotInSlotMatrix();
      if (canContinue) {
        this.generateShape();
      } else {
        console.log("game over");
      }
    }
  }
}

export default Game;
