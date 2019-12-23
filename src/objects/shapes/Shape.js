import { CUBE_WIDTH } from "../../utils";

class Shape {
  constructor() {
    this.mesh = null;
    this.cubes = [];
  }
  moveX(Xdirection) {
    if (this.mesh) {
      this.mesh.position.x + CUBE_WIDTH * Xdirection;
    }
  }

  getRelativeShapePosition(archPosition) {
    const shapePosition = this.mesh.position;
    return {
      x: shapePosition.x - archPosition.x - CUBE_WIDTH,
      y: shapePosition.y - archPosition.y - CUBE_WIDTH
    };
  }

  getCubesSlotPositions(archPosition) {
    const relativeShapePosition = this.getRelativeShapePosition(archPosition);
    return this.cubes.map(c => {
      return c.getCubeSlotPosition(relativeShapePosition);
    });
  }

  canGoDown(archPosition, slotsMatrix) {
    const activeShapeSlots = this.getCubesSlotPositions(archPosition);
    return activeShapeSlots.reduce((acc, slot) => {
      if (slotsMatrix[slot.x][slot.y - 1]) {
        acc = false;
      }
      return acc;
    }, true);
  }
}

export default Shape;
