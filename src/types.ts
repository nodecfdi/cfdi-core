import type XmlAttributes from '#src/xml_nodes/xml_attributes';
import type XmlNodes from '#src/xml_nodes/xml_nodes';

export interface XmlNodeInterface {
  addAttributes(attributes: Record<string, unknown>): void;
  addChild(node: XmlNodeInterface): XmlNodeInterface;
  attributes(): XmlAttributes;
  setAttribute(name: string, value?: string | null): void;
  getAttribute(name: string): string;
  children(): XmlNodes;
  clear(): void;
  length: number;
  name(): string;
  searchAttribute(...searchPath: string[]): string;
  searchNode(...searchPath: string[]): XmlNodeInterface | undefined;
  searchNodes(...searchPath: string[]): XmlNodes;
  setValue(value: string): void;
  value(): string;
  [Symbol.iterator](): IterableIterator<XmlNodeInterface>;
}
