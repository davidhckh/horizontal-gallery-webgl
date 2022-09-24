import App from "../App";
import { Plane, Program, Mesh } from "ogl";
import fragmentShader from "../../shaders/teaserImage/fragment.glsl";
import vertexShader from "../../shaders/teaserImage/vertex.glsl";
import { map, lerp } from "../Utils/math";

export default class TeaserImage {
  constructor(article, index) {
    this.app = new App();
    this.scene = this.app.scene.instance;
    this.gl = this.app.renderer.gl;
    this.scrolling = this.app.scrolling;
    this.camera = this.app.camera.instance;
    this.sizes = this.app.sizes;
    this.details = this.app.details;

    this.article = article;
    this.index = index;

    this.init();
    this.setScale();
    this.setPositon();

    this.scrolling.on("update", this.decrease.bind(this));
  }

  init() {
    this.geometry = new Plane(this.gl);
    this.texture = this.article.texture;
    this.image = this.article.image;

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        tMap: { value: this.texture },
        uImageSizes: { value: [this.image.naturalWidth, this.image.naturalHeight] },
        uPlaneSizes: { value: [0, 0] },
        uOffset: { value: 0 },
        uZoom: { value: 0.85 },
        uVelocity: { value: 0 }
      }
    });

    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.mesh.setParent(this.scene);
  }

  setScale() {
    this.mesh.scale.x = 0.83;
    this.mesh.scale.y = 1.3;
    this.targetScaleX = this.mesh.scale.x;
    this.targetScaleY = this.mesh.scale.y;
  }

  setPositon() {
    this.mesh.position.x = this.index * (this.mesh.scale.x + 0.1);
    this.targetPositonX = this.mesh.position.x;
  }

  handleClick() {
    if (!this.isEnlarged && this.details.visible === false) {
      this.enlarge();
    }
  }

  enlarge() {
    this.isEnlarged = true;

    this.fov = this.camera.fov * (Math.PI / 180);

    this.targetScaleY = 2 * Math.tan(this.fov / 2) * this.camera.position.z;
    this.targetScaleX = this.targetScaleY * this.camera.aspect;
    this.targetOffset = 0;
    this.targetZoom = 1;

    this.mesh.position.z = 0.001;

    this.details.show(this.article);
  }

  decrease() {
    //back to initial
    this.isEnlarged = false;

    this.targetZoom = 0.85;
    this.targetScaleX = 0.83;
    this.targetScaleY = 1.3;
    this.targetPositonX = this.index * (this.targetScaleX + 0.1);

    setTimeout(() => {
      if (!this.isEnlarged) {
        this.mesh.position.z = 0;
      }
    }, 500);

    this.details.hide();
  }

  resize() {
    if (this.isEnlarged === true) {
      this.targetScaleY = 2 * Math.tan(this.fov / 2) * this.camera.position.z;
      this.targetScaleX = this.targetScaleY * this.camera.aspect;
    }
  }

  update() {
    //parallax
    const positionInViewport = this.mesh.position.x - this.scrolling.current / this.scrolling.ratio;
    this.program.uniforms.uOffset.value = map(positionInViewport, -4, 4, -0.35, 0.35);

    //velocity
    this.program.uniforms.uVelocity.value = this.scrolling.velocity;

    //hover
    if (!this.isEnlarged) {
      this.targetZoom = this.isHovered === true ? 0.95 : 0.9;
    }

    //scale
    this.mesh.scale.x = lerp(this.mesh.scale.x, this.targetScaleX, 0.11);
    this.mesh.scale.y = lerp(this.mesh.scale.y, this.targetScaleY, 0.11);
    this.program.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y];

    //position
    if (this.app.openingPlayed === true) {
      this.mesh.position.x = lerp(this.mesh.position.x, this.isEnlarged ? this.camera.position.x : this.targetPositonX, 0.11);
    }

    //zoom
    this.program.uniforms.uZoom.value = lerp(this.program.uniforms.uZoom.value, this.targetZoom, 0.11);
  }
}
