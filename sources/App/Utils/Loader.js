import { Texture } from "ogl";
import EventEmitter from "./EventEmitter";
import App from "../App";

export default class Loader extends EventEmitter {
  constructor() {
    super();

    this.app = new App();
    this.gl = this.app.renderer.gl;
    this.articles = this.app.articles;

    this.loaded = 0;
    this.toLoad = this.articles.length;

    this.cache = {};

    this.loadAll();
  }

  loadAll() {
    this.articles.forEach((article) => {
      this.load(article.image, article);
    });
  }

  load(src, article) {
    const textureMask = new Texture(this.gl, { generateMipmaps: false });
    const image = new Image();
    image.src = src;
    
    image.onload = () => {
      textureMask.image = image;
      this.loaded++;

      article.texture = textureMask;
      article.image = image;

      this.checkFinish();
    };
  }

  checkFinish() {
    if (this.loaded === this.toLoad) {
      this.trigger("loaded");
    }
  }
}
