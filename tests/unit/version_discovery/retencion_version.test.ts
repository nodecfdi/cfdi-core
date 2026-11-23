import { describe, expect, test } from 'vitest';
import RetencionVersion from '../../../src/version_discovery/retencion_version';
import XmlNode from '../../../src/xml_nodes/xml_node';
import { nodeToXmlString } from '../../../src/xml_nodes/xml_node_utils';

describe('retencion version', () => {
  test.each([
    ['2.0', '2.0', 'Version', '2.0'],
    ['1.0', '1.0', 'Version', '1.0'],
    ['2.0 bad case', '', 'version', '2.0'],
    ['1.0 bad case', '', 'version', '1.0'],
    ['2.0 non set', '', 'Version', null],
    ['1.0 non set', '', 'Version', null],
    ['2.0 empty', '', 'Version', ''],
    ['1.0 empty', '', 'Version', ''],
    ['2.0 wrong number', '', 'Version', '2.1'],
    ['1.0 wrong number', '', 'Version', '2.1'],
  ])('discover %s', (_case, expected, attribute, value) => {
    const node = new XmlNode('retenciones', { [attribute]: value });
    const retencionVersion = new RetencionVersion();
    expect(retencionVersion.getFromNode(node)).toBe(expected);
    expect(retencionVersion.getFromXmlString(nodeToXmlString(node))).toBe(expected);
  });
});
