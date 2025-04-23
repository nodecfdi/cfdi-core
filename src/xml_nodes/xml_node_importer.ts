import { type Element, NAMESPACE } from '@xmldom/xmldom';
import { isCDataSection, isElement, isText } from '#src/dom';
import { type XmlNodeInterface } from '#src/types';
import XmlNode from '#src/xml_nodes/xml_node';

export default class XmlNodeImporter {
  /**
   * Local record for registered namespaces to avoid set the namespace declaration in every child
   */
  private registeredNamespaces: Record<string, string> = {};

  public constructor(private readonly element: Element) {}

  public import(): XmlNodeInterface {
    return this.importRecursive(this.element);
  }

  private importRecursive(element: Element): XmlNodeInterface {
    const node = new XmlNode(element.tagName);
    node.setValue(this.extractValue(element));
    node.setCData(this.extractCData(element));

    if (element.prefix && element.prefix !== '') {
      this.registerNamespace(node, `xmlns:${element.prefix}`, element.namespaceURI!);
      this.registerNamespace(node, 'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    }

    for (const attribute of element.attributes) {
      node.setAttribute(attribute.nodeName, attribute.nodeValue);
    }

    // element is like <element namespace="uri"/>
    /* istanbul ignore if -- @preserve Hard of test */
    if (element.hasAttributeNS(NAMESPACE.XMLNS, '')) {
      node.setAttribute('xmlns', element.getAttributeNS(NAMESPACE.XMLNS, ''));
    }

    for (const childElement of element.childNodes) {
      if (!isElement(childElement)) {
        continue;
      }

      const childNode = this.importRecursive(childElement);
      node.children().add(childNode);
    }

    return node;
  }

  private registerNamespace(node: XmlNode, prefix: string, uri: string): void {
    if (this.registeredNamespaces[prefix]) {
      return;
    }

    this.registeredNamespaces[prefix] = uri;
    node.setAttribute(prefix, uri);
  }

  private extractValue(element: Element): string {
    const values: string[] = [];

    for (const children of element.childNodes) {
      if (!isText(children)) {
        continue;
      }

      values.push(children.data);
    }

    return values.join('');
  }

  private extractCData(element: Element): string {
    const values: string[] = [];

    for (const children of element.childNodes) {
      if (!isCDataSection(children)) {
        continue;
      }

      values.push(children.data);
    }

    return values.join('');
  }
}
