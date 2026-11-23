import type { XmlNodeInterface } from '../types';

export default class XmlNodesSorter {
  /**
   * Map of node name to its position in the naming order.
   * A Map is used instead of a plain object so names like "constructor" or "toString"
   * do not resolve to inherited Object.prototype members.
   */
  private _order = new Map<string, number>();

  public constructor(order: string[] = []) {
    this.setOrder(order);
  }

  public setOrder(names: string[]): boolean {
    const parsedNames = this.parseNames(names);
    const currentNames = this.getOrder();

    if (
      parsedNames.length === currentNames.length
      && parsedNames.every((name, index) => name === currentNames[index])
    ) {
      return false;
    }

    this._order = new Map(parsedNames.map((name, index) => [name, index]));

    return true;
  }

  public parseNames(names: unknown[]): string[] {
    return [...new Set(names.filter((name) => this.isValidName(name)))];
  }

  public getOrder(): string[] {
    return Array.from(this._order, ([name]) => name);
  }

  /**
   * Returns the same array instance when there is no order defined.
   * Array.prototype.toSorted is stable, so nodes with equal weight keep their relative position.
   */
  public sort(nodes: XmlNodeInterface[]): XmlNodeInterface[] {
    if (this._order.size === 0) {
      return nodes;
    }

    return nodes.toSorted((a, b) => this.compareNodesByName(a, b));
  }

  public compareNodesByName(a: XmlNodeInterface, b: XmlNodeInterface): number {
    const aNumber = this.valueByName(a.name());
    const bNumber = this.valueByName(b.name());

    return Math.sign(aNumber - bNumber);
  }

  public valueByName(name: string): number {
    return this._order.get(name) ?? this._order.size;
  }

  private isValidName(name: unknown): name is string {
    return typeof name === 'string' && name !== '' && name !== '0';
  }
}
