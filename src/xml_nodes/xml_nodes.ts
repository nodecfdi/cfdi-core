import { type XmlNodeInterface } from '../types.js';
import XmlNodesSorter from './xml_nodes_sorter.js';

export default class XmlNodes extends Array<XmlNodeInterface> {
  private readonly _sorter: XmlNodesSorter;

  public constructor(nodes: XmlNodeInterface[] = []) {
    super();
    this._sorter = new XmlNodesSorter();
    this.importFromArray(nodes);
  }

  public static get [Symbol.species](): ArrayConstructor {
    return Array;
  }

  public add(...nodes: XmlNodeInterface[]): this {
    let somethingChange = false;

    for (const node of nodes) {
      if (!this.has(node)) {
        this.push(node);
        somethingChange = true;
      }
    }

    if (somethingChange) {
      this.order();
    }

    return this;
  }

  public delete(node: XmlNodeInterface): this {
    const index = this.indexOf(node);

    if (index !== -1) {
      this.splice(index, 1);
    }

    return this;
  }

  public clear(): this {
    this.splice(0, this.length);

    return this;
  }

  public has(node: XmlNodeInterface): boolean {
    return this.includes(node);
  }

  public first(): XmlNodeInterface | undefined {
    return this.at(0);
  }

  public get(position: number): XmlNodeInterface {
    const node = this.at(position);

    if (!node) {
      throw new RangeError(`The index ${position} does not exists`);
    }

    return node;
  }

  public firstNodeWithName(nodeName: string): XmlNodeInterface | undefined {
    return this.find((node) => node.name() === nodeName);
  }

  public getNodesByName(nodeName: string): XmlNodes {
    const nodes = new XmlNodes();

    for (const node of this) {
      if (node.name() === nodeName) {
        nodes.add(node);
      }
    }

    return nodes;
  }

  public order(): void {
    this.splice(0, this.length, ...this._sorter.sort(this));
  }

  /**
   * It takes only the unique string names and sort using the order of appearance.
   */
  public setOrder(names: string[]): void {
    if (this._sorter.setOrder(names)) {
      this.order();
    }
  }

  public getOrder(): string[] {
    return this._sorter.getOrder();
  }

  public importFromArray(nodes: XmlNodeInterface[]): this {
    for (const [index, node] of nodes.entries()) {
      if (
        typeof node.searchNodes !== 'function' ||
        typeof node.children !== 'function' ||
        typeof node.name !== 'function'
      ) {
        throw new SyntaxError(`The element index ${index} is not a XmlNodeInterface object`);
      }
    }

    this.add(...nodes);

    return this;
  }
}
