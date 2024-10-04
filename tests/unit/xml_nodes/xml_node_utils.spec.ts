import 'jest-xml-matcher';
import { readFileSync } from 'node:fs';
import { getSerializer } from '#src/dom';
import { documentElement, newDocumentContent } from '#src/utils/xml';
import XmlNode from '#src/xml_nodes/xml_node';
import {
  nodeFromXmlElement,
  nodeFromXmlString,
  nodeToXmlElement,
  nodeToXmlString,
} from '#src/xml_nodes/xml_node_utils';
import { filePath } from '../../test_utils.js';

describe('xml node utils', () => {
  test('node to xml string xml header', () => {
    const node = new XmlNode('book', {}, [
      new XmlNode('chapter', { toc: '1' }),
      new XmlNode('chapter', { toc: '2' }),
    ]);

    let xmlString = nodeToXmlString(node, true);
    expect(xmlString.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBeTruthy();

    xmlString = nodeToXmlString(node, false);
    expect(xmlString.startsWith('<book>')).toBeTruthy();
  });

  test.each([
    ['simple xml', filePath('nodes/sample.xml')],
    ['with texts xml', filePath('nodes/sample-with-texts.xml')],
    ['cfdi', filePath('cfdi33.xml')],
  ])('export from file and export again %s', (_name, filename) => {
    const source = readFileSync(filename, 'utf8');
    const document = newDocumentContent(source);

    // Create node from element
    const node = nodeFromXmlElement(documentElement(document));

    // Create element from node
    const element = nodeToXmlElement(node);
    const xmlString = nodeToXmlString(node);

    // Compare versus source
    const xmlSave = getSerializer().serializeToString(element.ownerDocument!);

    expect(xmlSave).toEqualXML(source);
    expect(xmlString).toEqualXML(source);
  });

  test('node from xml string', () => {
    const node = new XmlNode('book', {}, [
      new XmlNode('chapter', { toc: '1' }),
      new XmlNode('chapter', { toc: '2' }),
    ]);
    const xmlString = nodeToXmlString(node, true);
    const resultNode = nodeFromXmlString(xmlString);

    expect(resultNode.name()).toBe(node.name());
    expect(resultNode.searchAttribute('chapter', 'toc')).toBe('1');
  });

  test('import xml with namespace without prefix', () => {
    const file = filePath('xml-with-namespace-definitions-at-child-level.xml');
    const node = nodeFromXmlString(readFileSync(file, 'utf8'));
    const inspected = node.searchNode('base:Third', 'innerNS');
    if (!inspected) {
      throw new Error('The specimen does not have the required test case');
    }

    expect(inspected.getAttribute('xmlns')).toBe('http://external.com/inner');
  });

  test('xml with value with special chars', () => {
    const content = '<root>ampersand: &amp;</root>';
    const node = nodeFromXmlString(content);

    expect(node.value()).toBe('ampersand: &');
    expect(nodeToXmlString(node)).toBe(content);
  });

  test('xml with value with inner comment', () => {
    const content = '<root>ampersand: <!-- comment -->&amp;</root>';
    const expectedContent = '<root>ampersand: &amp;</root>';
    const node = nodeFromXmlString(content);

    expect(node.value()).toBe('ampersand: &');
    expect(nodeToXmlString(node)).toBe(expectedContent);
  });

  test('xml with value with inner white space', () => {
    const expectedValue = '\n\nfirst line\n\tsecond line\n\t third line \t\nfourth line\n\n';
    const content = `<root>${expectedValue}</root>`;
    const node = nodeFromXmlString(content);

    expect(node.value()).toStrictEqual(expectedValue);
    expect(nodeToXmlString(node)).toBe(content);
  });

  test('xml with value with inner element', () => {
    const content = '<root>ampersand: <inner/>&amp;</root>';
    const expectedContent = '<root><inner/>ampersand: &amp;</root>';
    const node = nodeFromXmlString(content);

    expect(node.value()).toBe('ampersand: &');
    expect(nodeToXmlString(node)).toBe(expectedContent);
  });
});
