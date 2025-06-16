import treeImage from "../assets/tree.png";

export class Tree {
  private static MAX_SIZE = 100;

  private wrapper: HTMLDivElement;
  private element: HTMLImageElement;
  private label: HTMLDivElement;
  private size: number;
  private static slots: number[] = [];

  constructor(container: HTMLElement | null) {
    this.size = 50;

    this.wrapper = document.createElement("div");
    this.wrapper.className = "absolute flex flex-col items-center";

    this.label = document.createElement("div");
    this.label.className = "text-white text-sm font-bold mb-1";
    this.label.innerText = `${this.size}`;

    this.element = document.createElement("img");
    this.element.src = treeImage;
    this.element.className = "tree";

    this.wrapper.style.left = `${Tree.getRandomPosition()}px`;
    this.wrapper.style.bottom = `15px`;

    this.wrapper.appendChild(this.label);
    this.wrapper.appendChild(this.element);

    container?.appendChild(this.wrapper);

    this.updateSize();
  }

  public getSize() {
    return this.size;
  }

  private updateSize() {
    this.element.style.height = `${this.size}px`;
    this.label.innerText = `${this.size}`;
  }

  public static getMaxSize() {
    return Tree.MAX_SIZE;
  }

  public static upgradeMaxSize() {
    Tree.MAX_SIZE += 50;
  }

  public destroy() {
    this.wrapper.remove();
  }

  private static initSlots() {
    const slotWidth = Tree.MAX_SIZE;
    Tree.slots = [];
    for (let x = 0; x < window.innerWidth - slotWidth; x += slotWidth) {
      Tree.slots.push(x);
    }
  }

  private static getRandomPosition(): number {
    if (Tree.slots.length === 0) Tree.initSlots();

    const index = Math.floor(Math.random() * Tree.slots.length);
    const pos = Tree.slots.splice(index, 1)[0];

    return pos;
  }

  public grow(replantLevel: number) {
    this.size += 10 + replantLevel;
    if (this.size > Tree.getMaxSize()) this.size = Tree.getMaxSize();
    this.updateSize();
  }
}
