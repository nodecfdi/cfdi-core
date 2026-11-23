import type XmlAttributes from './xml_nodes/xml_attributes';
import type XmlNodes from './xml_nodes/xml_nodes';

export type AttributeName<T extends string = string> = T | (string & {});

export type AttributesRecord<T extends string = string> = Partial<Record<T, unknown>>
  & Record<string, unknown>;

export interface XmlNodeInterface<TAttributes extends string = string> {
  addAttributes: (attributes: AttributesRecord<TAttributes>) => void;
  addChild: (node: XmlNodeInterface) => XmlNodeInterface;
  attributes: () => XmlAttributes<TAttributes>;
  setAttribute: (name: AttributeName<TAttributes>, value?: string | null) => void;
  getAttribute: (name: AttributeName<TAttributes>) => string;
  hasAttribute: (name: AttributeName<TAttributes>) => boolean;
  children: () => XmlNodes;
  clear: () => void;
  length: number;
  name: () => string;
  searchAttribute: (...searchPath: string[]) => string;
  searchNode: (...searchPath: string[]) => XmlNodeInterface | undefined;
  searchNodes: (...searchPath: string[]) => XmlNodes;
  setValue: (value: string) => void;
  value: () => string;
  cdata: () => string;
  setCData: (cdata: string) => void;
  [Symbol.iterator]: () => IterableIterator<XmlNodeInterface>;
}

export interface ContainerWithAttributeInterface {
  getAttributeValue: (attribute: string) => string;
}

export type NamespaceFilter = (namespace: string) => boolean;
