import type { AttributeName, AttributesRecord, XmlNodeInterface } from '../types';
import { isValidXmlName } from '../utils/xml';
import XmlAttributes from './xml_attributes';
import XmlNodes from './xml_nodes';

export default class XmlNode<TAttributes extends string = string> implements XmlNodeInterface<TAttributes> {
  private readonly _name: string;

  private readonly _attributes: XmlAttributes<TAttributes>;

  private readonly _children: XmlNodes;

  private _value: string;

  private _cdata: string;

  public constructor(
    name: string,
    attributes: AttributesRecord<TAttributes> = {},
    children: XmlNodeInterface[] = [],
    value = '',
    cdata = '',
  ) {
    if (!isValidXmlName(name)) {
      throw new SyntaxError(`Cannot create a node with an invalid xml name: ${name}`);
    }

    this._name = name;
    this._attributes = new XmlAttributes<TAttributes>(attributes);
    this._children = new XmlNodes(children);
    this._value = value;
    this._cdata = cdata;
  }

  public get length(): number {
    return this._children.length;
  }

  public name(): string {
    return this._name;
  }

  public children(): XmlNodes {
    return this._children;
  }

  public addChild(node: XmlNodeInterface): XmlNodeInterface {
    this._children.add(node);

    return node;
  }

  public attributes(): XmlAttributes<TAttributes> {
    return this._attributes;
  }

  public hasAttribute(name: AttributeName<TAttributes>): boolean {
    return this._attributes.has(name);
  }

  public setAttribute(name: AttributeName<TAttributes>, value: string | null = null): void {
    this._attributes.set(name, value);
  }

  public getAttribute(name: AttributeName<TAttributes>): string {
    return this._attributes.get(name);
  }

  public addAttributes(attributes: AttributesRecord<TAttributes>): void {
    this._attributes.import(attributes);
  }

  public clear(): void {
    this._attributes.clear();
    this._children.clear();
  }

  public searchAttribute(...searchPath: string[]): string {
    const attribute = searchPath.pop();
    const node = this.searchNode(...searchPath);

    if (!attribute || !node) {
      return '';
    }

    return node.getAttribute(attribute);
  }

  public searchNodes(...searchPath: string[]): XmlNodes {
    const nodes = new XmlNodes();
    const nodeName = searchPath.pop();
    const parent = this.searchNode(...searchPath);

    if (parent) {
      for (const child of parent.children()) {
        if (child.name() === nodeName) {
          nodes.add(child);
        }
      }
    }

    return nodes;
  }

  public searchNode(...searchPath: string[]): XmlNodeInterface | undefined {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: XmlNodeInterface | undefined = this;

    for (const searchName of searchPath) {
      node = node.children().firstNodeWithName(searchName);
      if (!node) {
        break;
      }
    }

    return node;
  }

  public value(): string {
    return this._value;
  }

  public setValue(value: string): void {
    this._value = value;
  }

  public cdata(): string {
    return this._cdata;
  }

  public setCData(cdata: string): void {
    this._cdata = cdata;
  }

  public [Symbol.iterator](): IterableIterator<XmlNodeInterface> {
    return this._children[Symbol.iterator]();
  }
}
