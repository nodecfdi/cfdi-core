import type { XmlNodeInterface } from '../types';
import XmlNodesSorter from './xml_nodes_sorter';

export default class XmlNodes extends Array<XmlNodeInterface> {
  private readonly _sorter: XmlNodesSorter;

  public constructor(nodes: XmlNodeInterface[] = []) {
    super();
    this._sorter = new XmlNodesSorter();
    this.importFromArray(nodes);
  }

  public add(...nodes: XmlNodeInterface[]): this {
    return this.addAll(nodes);
  }

  public delete(node: XmlNodeInterface): this {
    const index = this.indexOf(node);

    if (index !== -1) {
      this.splice(index, 1);
    }

    return this;
  }

  public clear(): this {
    this.splice(0);

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
    const sorted = this._sorter.sort(this);
    if (sorted === this) {
      return; // nothing to sort, avoid rewriting the whole collection
    }

    // assign in place instead of splice(...spread) to avoid "Maximum call stack size exceeded" on large collections
    for (const [index, node] of sorted.entries()) {
      this[index] = node;
    }
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
        typeof node.searchNodes !== 'function'
        || typeof node.children !== 'function'
        || typeof node.name !== 'function'
      ) {
        throw new SyntaxError(`The element index ${index} is not a XmlNodeInterface object`);
      }
    }

    return this.addAll(nodes);
  }

  public static get [Symbol.species](): ArrayConstructor {
    return Array;
  }

  private addAll(nodes: XmlNodeInterface[]): this {
    let somethingChange = false;
    // for bulk additions a Set keeps de-duplication O(1) per node instead of Array#includes O(n)
    const existing = nodes.length > 1 ? new Set<XmlNodeInterface>(this) : undefined;

    for (const node of nodes) {
      if (existing ? existing.has(node) : this.has(node)) {
        continue;
      }

      existing?.add(node);
      this.push(node);
      somethingChange = true;
    }

    if (somethingChange) {
      this.order();
    }

    return this;
  }
}
