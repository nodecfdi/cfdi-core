import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import NodeNsDefinitionsMover from '../../../src/xml_nodes/node_ns_definitions_mover';
import { nodeFromXmlString, nodeToXmlString } from '../../../src/xml_nodes/xml_node_utils';
import { filePath } from '../../../test_helpers/test_utils';

describe('node ns definitions mover', () => {
  test('namespace filter getter and setter', () => {
    const processor = new NodeNsDefinitionsMover();
    expect(processor.hasNamespaceFilter()).toBe(false);
    expect(processor.getNamespaceFilter()).toBeNull();
    expect(processor.filterNamespace('http://example.com')).toBe(true);

    const filter = (ns: string): boolean => ns.startsWith('http://www.tempuri.org/');
    expect(processor.setNamespaceFilter(filter)).toBe(processor);
    expect(processor.hasNamespaceFilter()).toBe(true);
    expect(processor.getNamespaceFilter()).toBe(filter);
    expect(processor.filterNamespace('http://www.tempuri.org/base')).toBe(true);
    expect(processor.filterNamespace('http://external.com/ns')).toBe(false);
  });

  test('move definitions with filter', () => {
    const inputFile = filePath('xml-with-namespace-definitions-at-child-level.xml');
    const input = nodeFromXmlString(readFileSync(inputFile, 'utf8'));

    const processor = new NodeNsDefinitionsMover();
    processor.setNamespaceFilter(
      (namespace) => namespace.startsWith('http://www.tempuri.org/'),
    );
    processor.process(input);

    const expectedFile = filePath('xml-with-namespace-definitions-at-root-level-filtered.xml');
    expect(nodeToXmlString(input)).toEqualXML(readFileSync(expectedFile, 'utf8'));
  });

  test('move definitions without filter', () => {
    const inputFile = filePath('xml-with-namespace-definitions-at-child-level.xml');
    const input = nodeFromXmlString(readFileSync(inputFile, 'utf8'));

    const processor = new NodeNsDefinitionsMover();
    processor.process(input);

    const expectedFile = filePath('xml-with-namespace-definitions-at-root-level-all.xml');
    expect(nodeToXmlString(input)).toEqualXML(readFileSync(expectedFile, 'utf8'));
  });
});
