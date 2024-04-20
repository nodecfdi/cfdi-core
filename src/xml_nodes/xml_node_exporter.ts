import { type XmlNodeInterface } from '../types.js';
import { newDocument } from '../utils/xml.js';

export default class XmlNodeExporter {
  public constructor(private readonly node: XmlNodeInterface) {}

  public export(): Element {
    const document = newDocument();
    const rootElement = this.exportRecursive(document, this.node);
    document.appendChild(rootElement);

    return rootElement;
  }

  private exportRecursive(document: Document, node: XmlNodeInterface): Element {
    const element = document.createElement(node.name());

    for (const [key, value] of node.attributes().entries()) {
      element.setAttribute(key, value);
    }

    for (const child of node.children()) {
      const childElement = this.exportRecursive(document, child);
      element.appendChild(childElement);
    }

    if (node.value() !== '') {
      element.appendChild(document.createTextNode(node.value()));
    }

    return element;
  }
}
