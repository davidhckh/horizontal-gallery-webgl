import App from "../App";
import TeaserImage from "./TeaserImage";
import { Transform } from "ogl";

export default class Scene {
  constructor() {
    this.app = new App();
    this.loader = this.app.loader;
    this.articles = this.app.articles;

    this.instance = new Transform();

    this.teaserImages = [];

    this.loader.on("loaded", () => {
      this.articles.forEach((article, index) => {
        this.teaserImages.push(new TeaserImage(article, index));
      });
    });
  }

  resize() {
    this.teaserImages.forEach((teaserImage) => {
      teaserImage.resize();
    });
  }

  update() {
    this.teaserImages.forEach((teaserImage) => {
      teaserImage.update();
    });
  }
}
