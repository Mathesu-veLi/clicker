import treeImage from "../assets/tree.png";

export class Tree {
  private element: HTMLImageElement;
  private size: number;

  constructor(container: HTMLElement) {
    this.size = 50;

    this.element = document.createElement("img");
    this.element.src = treeImage;
    this.element.className = "absolute tree";
    this.element.style.left = `${Tree.getRandomPosition()}px`;
    this.updateSize();

    container.appendChild(this.element);
  }

  private updateSize() {
    this.element.style.height = `${this.size}px`;
  }

  private static getRandomPosition(): number {
    return Math.random() * window.innerWidth;
  }
}
