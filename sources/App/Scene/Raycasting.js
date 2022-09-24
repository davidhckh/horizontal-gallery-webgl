import App from "../App";
import { Raycast, Vec2 } from "ogl";

export default class Raycasting {
  constructor() {
    this.app = new App();
    this.sizes = this.app.sizes;
    this.camera = this.app.camera.instance;
    this.gl = this.app.renderer.gl;

    this.hitImage = [];

    //init
    this.mouse = new Vec2();
    this.instance = new Raycast(this.gl);

    //meshes
    this.meshes = [];
    this.app.scene.teaserImages.forEach((teaserImage) => {
      this.meshes.push(teaserImage.mesh);
    });

    window.addEventListener("mousemove", this.handleMove.bind(this), false);
    window.addEventListener("touchmove", this.handleMove.bind(this), false);
    window.addEventListener("click", this.handleClick.bind(this), false);
  }

  handleClick() {
    this.cast();
    if (this.hitImage != null) {
      this.hitImage && this.hitImage.handleClick();
    }
  }

  handleMove() {
    this.cast();
  }

  cast() {
    //raycast
    this.mouse.x = 2.0 * (event.x / this.sizes.width) - 1.0;
    this.mouse.y = 2.0 * (1.0 - event.y / this.sizes.height) - 1.0;
    this.instance.castMouse(this.camera, this.mouse);
    const hits = this.instance.intersectBounds(this.meshes);

    //states
    this.app.scene.teaserImages.forEach((teaserImage) => {
      teaserImage.isHovered = false;
    });

    if (hits.length) {
      this.hitImage = this.app.scene.teaserImages[this.meshes.indexOf(hits[0])];
      this.hitImage.isHovered = true;
    } else {
      this.hitImage = null;
    }

    document.body.style.cursor = hits.length ? "pointer" : "default";
  }
}
