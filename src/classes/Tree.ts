import treeImage from "../assets/tree.png";

export class Tree {
  private static MAX_SIZE = 100;

  private element: HTMLImageElement;
  private size: number;

  constructor(container: HTMLElement | null) {
    this.size = 50;

    this.element = document.createElement("img");
    this.element.src = treeImage;
    this.element.className = "absolute tree";
    this.element.style.left = `${Tree.getRandomPosition()}px`;
    this.updateSize();

    container?.appendChild(this.element);
  }

  public getSize() {
    return this.size;
  }

  private updateSize() {
    this.element.style.height = `${this.size}px`;
  }

  public static getMaxSize() {
    return Tree.MAX_SIZE;
  }

  public static upgradeMaxSize() {
    Tree.MAX_SIZE += 50;
  }

  public destroy() {
    this.element.remove();
  }

  private static getRandomPosition(): number {
    return Math.random() * (window.innerWidth - Tree.MAX_SIZE);
  }

  public grow(replantLevel: number) {
    this.size += 10 + replantLevel;
    if (this.size > Tree.getMaxSize()) this.size = Tree.getMaxSize();
    this.updateSize();
  }
}
