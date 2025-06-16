import treeImage from "../assets/tree.png";

export class Tree {
  private static MAX_SIZE = 100;

  private wrapper: HTMLDivElement;
  private element: HTMLImageElement;
  private label: HTMLDivElement;
  private size: number;
  private static usedPositions: number[] = [];

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

  private static getRandomPosition(): number {
    const padding = 50; // distância mínima entre árvores
    let pos: number;
    let tries = 0;

    do {
      pos = Math.random() * (window.innerWidth - Tree.MAX_SIZE);
      tries++;
      // Limite de tentativas pra evitar loop infinito caso fique difícil encontrar espaço
      if (tries > 20) break;
    } while (Tree.usedPositions.some((p) => Math.abs(p - pos) < padding));

    Tree.usedPositions.push(pos);
    return pos;
  }

  public grow(replantLevel: number) {
    this.size += 10 + replantLevel;
    if (this.size > Tree.getMaxSize()) this.size = Tree.getMaxSize();
    this.updateSize();
  }
}
