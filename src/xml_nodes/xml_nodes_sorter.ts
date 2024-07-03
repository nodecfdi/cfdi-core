import isEqual from 'lodash.isequal';
import { type XmlNodeInterface } from '../types.js';

export default class XmlNodesSorter {
  /** Record of key (string) value (number|int) representing the naming order. */
  private _order: Record<string, number> = {};

  private declare _length: number;

  public constructor(order: string[] = []) {
    this.setOrder(order);
  }

  public setOrder(names: string[]): boolean {
    const order = Object.fromEntries(this.parseNames(names).map((entry, index) => [entry, index]));

    if (isEqual(this._order, order)) {
      return false;
    }

    this._order = order;
    this._length = Object.keys(order).length;

    return true;
  }

  public parseNames(names: unknown[]): string[] {
    return [...new Set(names.filter((name) => this.isValidName(name)))] as string[];
  }

  public getOrder(): string[] {
    return Array.from(Object.entries(this._order), (entry) => entry[0]);
  }

  public sort(nodes: XmlNodeInterface[]): XmlNodeInterface[] {
    let sortedNodes = nodes;

    if (this._length > 0) {
      sortedNodes = this.stableArraySort(
        sortedNodes,
        (a: XmlNodeInterface, b: XmlNodeInterface): number => this.compareNodesByName(a, b),
      );
    }

    return sortedNodes;
  }

  public compareNodesByName(a: XmlNodeInterface, b: XmlNodeInterface): number {
    const aNumber = this.valueByName(a.name());
    const bNumber = this.valueByName(b.name());

    return Math.sign(aNumber - bNumber);
  }

  public valueByName(name: string): number {
    return this._order[name] ?? this._length;
  }

  private isValidName(name: unknown): name is string {
    return typeof name === 'string' && Boolean(name) && name !== '0';
  }

  /**
   * This function is a replacement for sort that try to sort
   * but if items are equal then uses the relative position as second argument.
   */
  private stableArraySort<T = XmlNodeInterface>(input: T[], callable: (a: T, b: T) => number): T[] {
    let list = input.map((value, index) => ({
      index,
      item: value,
    }));

    list = list.sort((first, second) => {
      let value = callable(first.item, second.item);

      if (value === 0) {
        value = Math.sign(first.index - second.index);
      }

      return value;
    });

    return list.map((node) => node.item);
  }
}
