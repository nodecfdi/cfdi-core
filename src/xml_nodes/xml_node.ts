import { type XmlNodeInterface } from '../types.js';
import { isValidXmlName } from '../utils/xml.js';
import XmlAttributes from './xml_attributes.js';
import XmlNodes from './xml_nodes.js';

export default class XmlNode implements XmlNodeInterface {
  private readonly _name: string;

  private _attributes: XmlAttributes;

  private readonly _children: XmlNodes;

  private _value: string;

  public constructor(
    name: string,
    attributes: Record<string, unknown> = {},
    children: XmlNodeInterface[] = [],
    value = '',
  ) {
    if (!isValidXmlName(name)) {
      throw new SyntaxError(`Cannot create a node with an invalid xml name: ${name}`);
    }

    this._name = name;
    this._attributes = new XmlAttributes(attributes);
    this._children = new XmlNodes(children);
    this._value = value;
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

  public attributes(): XmlAttributes {
    return this._attributes;
  }

  public setAttribute(name: string, value: string | null = null): void {
    this._attributes.set(name, value);
  }

  public getAttribute(name: string): string {
    return this._attributes.get(name);
  }

  public addAttributes(attributes: Record<string, unknown>): void {
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
    // eslint-disable-next-line unicorn/no-this-assignment, @typescript-eslint/no-this-alias
    let self: XmlNodeInterface | undefined = this;

    for (const searchName of searchPath) {
      self = self.children().firstNodeWithName(searchName);
      if (!self) {
        break;
      }
    }

    return self;
  }

  public value(): string {
    return this._value;
  }

  public setValue(value: string): void {
    this._value = value;
  }

  public [Symbol.iterator](): IterableIterator<XmlNodeInterface> {
    return this._children[Symbol.iterator]();
  }
}
