import { describe, expect, test } from 'vitest';
import CfdiVersion from '../../../src/version_discovery/cfdi_version';
import XmlNode from '../../../src/xml_nodes/xml_node';
import { nodeToXmlString } from '../../../src/xml_nodes/xml_node_utils';

describe('cfdi version', () => {
  test.each([
    ['4.0', '4.0', 'Version', '4.0'],
    ['3.3', '3.3', 'Version', '3.3'],
    ['3.2', '3.2', 'version', '3.2'],
    ['4.0 bad case', '', 'version', '4.0'],
    ['3.3 bad case', '', 'version', '3.3'],
    ['3.2 bad case', '', 'Version', '3.2'],
    ['4.0 non set', '', 'Version', null],
    ['3.3 non set', '', 'Version', null],
    ['3.2 non set', '', 'version', null],
    ['4.0 empty', '', 'Version', ''],
    ['3.3 empty', '', 'Version', ''],
    ['3.2 empty', '', 'version', ''],
    ['4.0 wrong number', '', 'Version', '2.1'],
    ['3.3 wrong number', '', 'Version', '2.1'],
    ['3.2 wrong number', '', 'version', '2.0'],
  ])('discover %s', (_case, expected, attribute, value) => {
    const node = new XmlNode('cfdi', { [attribute]: value });
    const cfdiVersion = new CfdiVersion();
    expect(cfdiVersion.getFromNode(node)).toBe(expected);
    expect(cfdiVersion.getFromXmlString(nodeToXmlString(node))).toBe(expected);
  });
});
