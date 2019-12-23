import { CUBE_WIDTH, DIRECTIONS } from "../../utils";

class Shape {
  constructor() {
    this.mesh = null;
    this.cubes = [];
  }
  moveX(direction, archPosition, slotsMatrix) {
    if (this.mesh) {
      let Xdirection =
        direction === DIRECTIONS.LEFT
          ? -1
          : direction === DIRECTIONS.RIGHT
          ? 1
          : 0;
      if (this.canGo(direction, archPosition, slotsMatrix)) {
        this.mesh.position.x += CUBE_WIDTH * Xdirection;
      } else {
        console.log("can't go there!");
      }
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

  canGo(direction, archPosition, slotsMatrix) {
    const activeShapeSlots = this.getCubesSlotPositions(archPosition);
    const canGo = activeShapeSlots.reduce((acc, slot) => {
      if (
        (direction === DIRECTIONS.DOWN && !slotsMatrix[slot.x][slot.y - 1]) ||
        (direction === DIRECTIONS.LEFT &&
          (!slotsMatrix[slot.x - 1] || !slotsMatrix[slot.x - 1][slot.y])) ||
        (direction === DIRECTIONS.RIGHT &&
          (!slotsMatrix[slot.x + 1] || !slotsMatrix[slot.x + 1][slot.y]))
      ) {
        acc = false;
      }
      return acc;
    }, true);
    return canGo;
  }
}

export default Shape;
