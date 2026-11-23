import { describe, expect, test } from 'vitest';
import TfdVersion from '../../../src/version_discovery/tfd_version';
import XmlNode from '../../../src/xml_nodes/xml_node';
import { nodeToXmlString } from '../../../src/xml_nodes/xml_node_utils';

describe('tfd version', () => {
  test.each([
    ['1.1', '1.1', 'Version', '1.1'],
    ['1.0', '1.0', 'version', '1.0'],
    ['1.1 bad case', '', 'version', '1.1'],
    ['1.0 bad case', '', 'Version', '1.0'],
    ['1.1 non set', '', 'Version', null],
    ['1.0 non set', '', 'version', null],
    ['1.1 empty', '', 'Version', ''],
    ['1.0 empty', '', 'version', ''],
    ['1.1 wrong number', '', 'Version', '2.1'],
    ['1.0 wrong number', '', 'version', '2.0'],
  ])('discover %s', (_case, expected, attribute, value) => {
    const node = new XmlNode('tfd', { [attribute]: value });
    const tfdVersion = new TfdVersion();
    expect(tfdVersion.getFromNode(node)).toBe(expected);
    expect(tfdVersion.getFromXmlString(nodeToXmlString(node))).toBe(expected);
  });
});
