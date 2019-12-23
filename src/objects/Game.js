import * as THREE from "three";
import LineShape from "./shapes/LineShape";
import { ARCH_HEIGHT, ARCH_WIDTH, CUBE_WIDTH } from "../utils";
import Scene from "./Scene";
import Arch from "./Arch";

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
    this.generateShape();
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
    this.arch.mesh.position.x = CUBE_WIDTH / 2;
    this.arch.mesh.position.y = CUBE_WIDTH / 2;
    this.scene.addToScene(this.arch.mesh);
  }

  moveShapeX(xDirection) {
    this.activeShape.moveX(xDirection);
  }

  initializeSlotsMatrix() {
    const slotsMatrix = [];
    for (let i = 0; i < ARCH_WIDTH - 1; i++) {
      const row = [];
      for (let j = 0; j < ARCH_HEIGHT - 1; j++) {
        row.push(0);
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
      this.slotsMatrix[s.x][s.y] = 1;
    });
    return canContinue;
  }

  activeShapeFall() {
    const canGoDown = this.activeShape.canGoDown(
      this.arch.mesh.position,
      this.slotsMatrix
    );
    if (canGoDown && this.activeShape.mesh.position.y > CUBE_WIDTH * 1.5) {
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
