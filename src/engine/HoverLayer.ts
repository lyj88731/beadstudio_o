import { Container, Graphics } from "pixi.js";

export default class HoverLayer {
  container: Container;
  private graphics: Graphics;

  cellSize = 20;

  constructor() {
    this.container = new Container();

    this.graphics = new Graphics();

    this.container.addChild(this.graphics);
  }

  show(x: number, y: number) {
    this.graphics.clear();

    this.graphics
      .rect(
        x * this.cellSize + 1,
        y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      )
      .fill({
        color: 0x4aa3ff,
        alpha: 0.35,
      });
  }

  hide() {
    this.graphics.clear();
  }
}