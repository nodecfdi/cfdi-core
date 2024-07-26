import { isValidXmlName } from '#src/utils/xml';

export default class XmlAttributes {
  private readonly _attributes = new Map<string, string>();

  public constructor(attributes: Record<string, unknown> = {}) {
    this.import(attributes);
  }

  public get size(): number {
    return this._attributes.size;
  }

  public get length(): number {
    return this._attributes.size;
  }

  public get(name: string): string {
    return this._attributes.get(name) ?? '';
  }

  public set(name: string, value: string | null = null): this {
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

  public delete(name: string): boolean {
    return this._attributes.delete(name);
  }

  public clear(): this {
    this._attributes.clear();

    return this;
  }

  public has(name: string): boolean {
    return this._attributes.has(name);
  }

  public import(attributes: Record<string, unknown>): this {
    for (const [key, value] of Object.entries(attributes)) {
      const fixedValue = this.castValueToString(key, value);
      this.set(key, fixedValue);
    }

    return this;
  }

  public export(): Record<string, string> {
    return Object.fromEntries(this._attributes.entries());
  }

  public exportMap(): Map<string, string> {
    return this._attributes;
  }

  public forEach(
    callbackFn: (value: string, key: string, map: Map<string, string>) => void,
    thisArgument?: unknown,
  ): void {
    // eslint-disable-next-line unicorn/no-array-for-each, unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
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

  public readonly [Symbol.toStringTag] = 'XmlAttributes';

  private castValueToString(key: string, value: unknown): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    if (/boolean|number|string/u.test(typeof value)) {
      return `${value as boolean | number | string}`;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      return value.toString();
    }

    throw new SyntaxError(`Cannot convert value of attribute ${key} to string`);
  }
}
