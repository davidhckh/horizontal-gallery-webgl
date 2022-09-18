import App from "../App";
import { Plane, Program, Mesh } from "ogl";
import fragmentShader from "../../shaders/teaserImage/fragment.glsl";
import vertexShader from "../../shaders/teaserImage/vertex.glsl";
import { lerp, clamp, map } from "../Utils/math";

export default class TeaserImage {
  constructor(article, index) {
    this.app = new App();
    this.scene = this.app.scene.instance;
    this.gl = this.app.renderer.gl;
    this.scrolling = this.app.scrolling;
    this.camera = this.app.camera.instance;

    this.article = article;
    this.index = index;

    this.sizes = {};

    this.setSizes();
    this.init();
    this.setPositon();
  }

  setSizes() {
    this.sizes.width = 0.9;
    this.sizes.height = 1.4;
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
        uImageSizes: {
          value: [this.image.naturalWidth, this.image.naturalHeight]
        },
        uPlaneSizes: {
          value: [this.sizes.width, this.sizes.height]
        },
        uOffset: { value: 0 },
        uZoom: { value: 0.8 }
      }
    });

    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.mesh.setParent(this.scene);
    this.mesh.scale.x = this.sizes.width;
    this.mesh.scale.y = this.sizes.height;
  }

  setPositon() {
    this.mesh.position.x = this.index * (this.sizes.width + 0.1);
  }

  resize() {}

  update() {
    const positionInViewport = this.mesh.position.x - this.scrolling.current / this.scrolling.ratio;
    this.program.uniforms.uOffset.value = map(positionInViewport, -5, 5, -0.3, 0.3);
  }
}
