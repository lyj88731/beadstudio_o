import { Container } from "pixi.js";

export default class Camera {

  x = 0;
  y = 0;

  zoom = 1;

  minZoom = 0.1;
  maxZoom = 10;


  apply(world: Container) {

    world.position.set(
      this.x,
      this.y
    );

    world.scale.set(
      this.zoom
    );

  }


  zoomAt(
    factor:number,
    mouseX:number,
    mouseY:number
  ) {

    const beforeX =
      (mouseX - this.x) / this.zoom;

    const beforeY =
      (mouseY - this.y) / this.zoom;


    this.zoom *= factor;


    this.zoom =
      Math.max(
        this.minZoom,
        Math.min(
          this.maxZoom,
          this.zoom
        )
      );


    const afterX =
      beforeX * this.zoom + this.x;

    const afterY =
      beforeY * this.zoom + this.y;


    this.x += mouseX - afterX;
    this.y += mouseY - afterY;

  }


  move(
    dx:number,
    dy:number
  ) {

    this.x += dx;
    this.y += dy;

  }


  fitCenter(
    width:number,
    height:number,
    screenWidth:number,
    screenHeight:number
  ) {

    const padding = 100;


    this.zoom =
      Math.min(
        (screenWidth - padding) / width,
        (screenHeight - padding) / height
      );


    this.x =
      screenWidth / 2 -
      (width / 2) * this.zoom;


    this.y =
      screenHeight / 2 -
      (height / 2) * this.zoom;

  }

}