import type { NamespaceFilter, XmlNodeInterface } from '../types';
import type XmlNodes from './xml_nodes';
import SchemaLocations from '../utils/schema_locations';

export default class NodeNsDefinitionsMover {
  private _namespaceFilter: NamespaceFilter | null = null;

  public constructor() {
    this.setNamespaceFilter();
  }

  public hasNamespaceFilter(): boolean {
    return this._namespaceFilter !== null;
  }

  public getNamespaceFilter(): NamespaceFilter | null {
    return this._namespaceFilter;
  }

  public setNamespaceFilter(filter: NamespaceFilter | null = null): this {
    this._namespaceFilter = filter;

    return this;
  }

  public process(root: XmlNodeInterface): void {
    const rootSchemaLocation = SchemaLocations.fromString(
      root.getAttribute('xsi:schemaLocation'),
      false,
    );
    this.processRecursive(root.children(), root, rootSchemaLocation);
    if (!rootSchemaLocation.isEmpty()) {
      root.setAttribute('xsi:schemaLocation', rootSchemaLocation.asString());
    }
  }

  public filterNamespace(namespace: string): boolean {
    if (!this._namespaceFilter) {
      return true;
    }

    return this._namespaceFilter(namespace);
  }

  protected processRecursive(
    children: XmlNodes,
    root: XmlNodeInterface,
    schemaLocations: SchemaLocations,
  ): void {
    for (const child of children) {
      this.moveXmlNs(child, root);
      this.moveXsiSchemaLocation(child, schemaLocations);
      this.processRecursive(child.children(), root, schemaLocations);
    }
  }

  protected moveXmlNs(child: XmlNodeInterface, root: XmlNodeInterface): void {
    const prefix = child.name().split(':', 2)[0];
    if (child.name() === prefix) {
      return; // it does not have a prefix
    }

    const xmlns = `xmlns:${prefix}`;
    if (!child.hasAttribute(xmlns)) {
      return; // it does not have a definition
    }

    const namespaceUri = child.getAttribute(xmlns);
    if (!this.filterNamespace(namespaceUri)) {
      return; // it did not pass the namespace filter
    }

    root.addAttributes({ [xmlns]: namespaceUri });
    child.addAttributes({ [xmlns]: null });
  }

  protected moveXsiSchemaLocation(
    child: XmlNodeInterface,
    rootSchemaLocations: SchemaLocations,
  ): void {
    if (!child.hasAttribute('xsi:schemaLocation')) {
      return;
    }

    const childSchemaLocations = SchemaLocations.fromString(
      child.getAttribute('xsi:schemaLocation'),
      false,
    );
    for (const [namespace, location] of childSchemaLocations) {
      if (!this.filterNamespace(namespace)) {
        continue;
      }

      if (!rootSchemaLocations.has(namespace)) {
        rootSchemaLocations.append(namespace, location);
      }
    }

    for (const [namespace] of rootSchemaLocations) {
      childSchemaLocations.remove(namespace);
    }

    child.addAttributes({
      'xsi:schemaLocation': childSchemaLocations.isEmpty()
        ? null
        : childSchemaLocations.asString(),
    });
  }
}
