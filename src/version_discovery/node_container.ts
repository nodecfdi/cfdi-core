import type { ContainerWithAttributeInterface, XmlNodeInterface } from '../types';

export default class NodeContainer implements ContainerWithAttributeInterface {
  public constructor(private readonly _node: XmlNodeInterface) {}

  public getAttributeValue(attribute: string): string {
    return this._node.getAttribute(attribute);
  }
}
