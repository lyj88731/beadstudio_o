export default class Camera {
  x = 0;
  y = 0;

  zoom = 1;

  minZoom = 0.2;
  maxZoom = 20;

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  setZoom(nextZoom: number) {
    this.zoom = Math.min(
      this.maxZoom,
      Math.max(this.minZoom, nextZoom)
    );
  }

  zoomIn() {
    this.setZoom(this.zoom * 1.1);
  }

  zoomOut() {
    this.setZoom(this.zoom / 1.1);
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
  }
}