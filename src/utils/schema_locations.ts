export default class SchemaLocations {
  private readonly _pairs = new Map<string, string>();

  public constructor(pairs: Record<string, string> = {}) {
    for (const [namespace, location] of Object.entries(pairs)) {
      this.append(namespace, location);
    }
  }

  public get size(): number {
    return this._pairs.size;
  }

  public get length(): number {
    return this._pairs.size;
  }

  public isEmpty(): boolean {
    return this._pairs.size === 0;
  }

  /**
   * Return a record of pairs using namespace as key and location as value
   */
  public pairs(): Record<string, string> {
    return Object.fromEntries(this._pairs);
  }

  public has(namespace: string): boolean {
    return this._pairs.has(namespace);
  }

  /**
   * Get an array with namespaces that have an empty location
   */
  public getNamespacesWithoutLocation(): string[] {
    const result: string[] = [];
    for (const [namespace, location] of this._pairs) {
      if (location === '') {
        result.push(namespace);
      }
    }

    return result;
  }

  public hasAnyNamespaceWithoutLocation(): boolean {
    return this.getNamespacesWithoutLocation().length > 0;
  }

  public append(namespace: string, location: string): void {
    this._pairs.set(namespace, location);
  }

  public remove(namespace: string): void {
    this._pairs.delete(namespace);
  }

  /**
   * Return the collection of namespace location separated by spaces
   */
  public asString(): string {
    const parts: string[] = [];
    for (const [namespace, location] of this._pairs) {
      if (location !== '') {
        parts.push(`${namespace} ${location}`);
      }
    }

    return parts.join(' ');
  }

  public [Symbol.iterator](): IterableIterator<[string, string]> {
    return this._pairs[Symbol.iterator]();
  }

  /**
   * Create a collection of namespaces (key) and location (value)
   */
  public static fromString(
    schemaLocationValue: string,
    includeLastUnpairedItem = false,
  ): SchemaLocations {
    const schemaLocations = new this();
    const components = schemaLocationValue.split(/\s+/u).filter(Boolean);
    for (let c = 0; c < components.length; c += 2) {
      const location = components[c + 1] ?? '';
      if (location !== '' || includeLastUnpairedItem) {
        schemaLocations.append(components[c], location);
      }
    }

    return schemaLocations;
  }

  /**
   * Create a collection of namespaces (key) and location (value).
   * All locations *must* end with '.xsd', otherwise they are considered namespaces.
   */
  public static fromStringStrictXsd(schemaLocationValue: string): SchemaLocations {
    const schemaLocations = new this();
    const components = schemaLocationValue.split(/\s+/u).filter(Boolean);
    for (let c = 0; c < components.length; c += 1) {
      const namespace = components[c];
      const location = components[c + 1] ?? '';
      if (location.endsWith('.xsd')) {
        schemaLocations.append(namespace, location);
        c += 1;
        continue;
      }

      schemaLocations.append(namespace, '');
    }

    return schemaLocations;
  }
}
