import {
  type Attr,
  type Document,
  DOMImplementation,
  DOMParser,
  type Element,
  type Node,
  onErrorStopParsing,
  type Text,
  XMLSerializer,
} from '@xmldom/xmldom';

export const getParser = (): DOMParser => {
  return new DOMParser({
    onError: onErrorStopParsing,
  });
};

export const getSerializer = (): XMLSerializer => {
  return new XMLSerializer();
};

export const getDomImplementation = (): DOMImplementation => {
  return new DOMImplementation();
};

export const isNode = (nodo: unknown): nodo is Node & { nodeType: number } => {
  return (
    typeof nodo === 'object' &&
    nodo !== null &&
    'nodeType' in nodo &&
    'nodeName' in nodo &&
    typeof nodo.nodeType === 'number' &&
    nodo.nodeType >= 1 &&
    nodo.nodeType <= 11 &&
    typeof nodo.nodeName === 'string'
  );
};

export const isElement = (nodo: unknown): nodo is Element => {
  return isNode(nodo) && nodo.nodeType === 1;
};

export const isAttribute = (nodo: unknown): nodo is Attr => {
  return isNode(nodo) && nodo.nodeType === 2;
};

export const isText = (nodo: unknown): nodo is Text => {
  return isNode(nodo) && nodo.nodeType === 3;
};

export const isDocument = (nodo: unknown): nodo is Document => {
  return isNode(nodo) && nodo.nodeType === 9;
};
