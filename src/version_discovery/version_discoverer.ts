import type { Document, Element } from '@xmldom/xmldom';
import type { ContainerWithAttributeInterface, XmlNodeInterface } from '../types';
import { documentElement, newDocumentContent } from '../utils/xml';
import DomElementContainer from './dom_element_container';
import NodeContainer from './node_container';

export default abstract class VersionDiscoverer {
  /**
   * Returns a key/value map where the key is the version number
   * and the value is the attribute name to query.
   */
  public abstract rules(): Record<string, string>;

  public discover(container: ContainerWithAttributeInterface): string {
    for (const [versionNumber, attribute] of Object.entries(this.rules())) {
      const currentValue = container.getAttributeValue(attribute);
      if (versionNumber === currentValue) {
        return versionNumber;
      }
    }

    return '';
  }

  public getFromDOMElement(element: Element): string {
    return this.discover(new DomElementContainer(element));
  }

  public getFromDOMDocument(document: Document): string {
    return this.getFromDOMElement(documentElement(document));
  }

  public getFromNode(node: XmlNodeInterface): string {
    return this.discover(new NodeContainer(node));
  }

  public getFromXmlString(contents: string): string {
    return this.getFromDOMDocument(newDocumentContent(contents));
  }
}
