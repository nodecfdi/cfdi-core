import type { AttributeName, AttributesRecord } from '../types';
import { isValidXmlName } from '../utils/xml';

export default class XmlAttributes<TAttributes extends string = string> {
  public readonly [Symbol.toStringTag] = 'XmlAttributes';

  private readonly _attributes = new Map<string, string>();

  public constructor(attributes: AttributesRecord<TAttributes> = {}) {
    this.import(attributes);
  }

  public get size(): number {
    return this._attributes.size;
  }

  public get length(): number {
    return this._attributes.size;
  }

  public get(name: AttributeName<TAttributes>): string {
    return this._attributes.get(name) ?? '';
  }

  public set(
    name: AttributeName<TAttributes>,
    value: string | { toString: () => string } | null = null,
  ): this {
    if (value === null) {
      this.delete(name);

      return this;
    }

    if (!isValidXmlName(name)) {
      throw new SyntaxError(`Cannot set attribute with an invalid xml name: ${name}`);
    }

    this._attributes.set(name, value.toString());

    return this;
  }

  public delete(name: AttributeName<TAttributes>): boolean {
    return this._attributes.delete(name);
  }

  public clear(): this {
    this._attributes.clear();

    return this;
  }

  public has(name: AttributeName<TAttributes>): boolean {
    return this._attributes.has(name);
  }

  public import(attributes: AttributesRecord<TAttributes>): this {
    for (const [key, value] of Object.entries(attributes)) {
      const fixedValue = this.castValueToString(key, value);
      this.set(key, fixedValue);
    }

    return this;
  }

  public export(): Record<string, string> {
    return Object.fromEntries(this._attributes);
  }

  public exportMap(): Map<string, string> {
    return this._attributes;
  }

  public forEach(
    callbackFn: (value: string, key: string, map: Map<string, string>) => void,
    thisArgument?: unknown,
  ): void {
    this._attributes.forEach(callbackFn, thisArgument);
  }

  public entries(): IterableIterator<[string, string]> {
    return this._attributes.entries();
  }

  public keys(): IterableIterator<string> {
    return this._attributes.keys();
  }

  public values(): IterableIterator<string> {
    return this._attributes.values();
  }

  public [Symbol.iterator](): IterableIterator<[string, string]> {
    return this._attributes[Symbol.iterator]();
  }

  private castValueToString(key: string, value: unknown): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    if (/boolean|number|string/u.test(typeof value)) {
      return String(value);
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return value.toString();
    }

    throw new SyntaxError(`Cannot convert value of attribute ${key} to string`);
  }
}
