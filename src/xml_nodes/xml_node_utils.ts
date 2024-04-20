import { getSerializer } from '#src/dom';
import { type XmlNodeInterface } from '#src/types';
import { documentElement, newDocumentContent } from '#src/utils/xml';
import XmlNodeExporter from '#src/xml_nodes/xml_node_exporter';
import XmlNodeImporter from '#src/xml_nodes/xml_node_importer';

export const nodeToXmlElement = (node: XmlNodeInterface): Element => {
  return new XmlNodeExporter(node).export();
};

export const nodeToXmlString = (node: XmlNodeInterface, withXmlHeader = false): string => {
  const element = nodeToXmlElement(node);
  if (withXmlHeader) {
    const document = element.ownerDocument;
    const pi = document.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    document.insertBefore(pi, document.firstChild);

    return getSerializer().serializeToString(document);
  }

  return getSerializer().serializeToString(element.ownerDocument);
};

export const nodeFromXmlElement = (element: Element): XmlNodeInterface => {
  return new XmlNodeImporter(element).import();
};

export const nodeFromXmlString = (content: string): XmlNodeInterface => {
  return nodeFromXmlElement(documentElement(newDocumentContent(content)));
};
