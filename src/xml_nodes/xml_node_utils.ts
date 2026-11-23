import type { Element } from '@xmldom/xmldom';
import type { XmlNodeInterface } from '../types';
import { getSerializer } from '../dom';
import { documentElement, newDocumentContent } from '../utils/xml';
import XmlNodeExporter from './xml_node_exporter';
import XmlNodeImporter from './xml_node_importer';

export const nodeToXmlElement = (node: XmlNodeInterface): Element => {
  return new XmlNodeExporter(node).export();
};

export const nodeToXmlString = (node: XmlNodeInterface, withXmlHeader = false): string => {
  const element = nodeToXmlElement(node);
  const document = element.ownerDocument!;
  if (withXmlHeader) {
    const pi = document.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    document.insertBefore(pi, document.firstChild);
  }

  return getSerializer().serializeToString(document);
};

export const nodeFromXmlElement = (element: Element): XmlNodeInterface => {
  return new XmlNodeImporter(element).import();
};

export const nodeFromXmlString = (content: string): XmlNodeInterface => {
  return nodeFromXmlElement(documentElement(newDocumentContent(content)));
};
