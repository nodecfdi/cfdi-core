import type { XmlNodeInterface } from '../types';
import NodeNsDefinitionsMover from '../xml_nodes/node_ns_definitions_mover';

export default class SatNsDefinitionsMover {
  public move(root: XmlNodeInterface): void {
    const nodeNsDefinitionsMover = new NodeNsDefinitionsMover();
    nodeNsDefinitionsMover.setNamespaceFilter((namespaceUri) => namespaceUri.startsWith('http://www.sat.gob.mx/'));
    nodeNsDefinitionsMover.process(root);
  }
}
