import type { Element } from '@xmldom/xmldom';
import type { ContainerWithAttributeInterface } from '../types';

export default class DomElementContainer implements ContainerWithAttributeInterface {
  public constructor(private readonly _element: Element) {}

  public getAttributeValue(attribute: string): string {
    return this._element.getAttribute(attribute) ?? '';
  }
}
