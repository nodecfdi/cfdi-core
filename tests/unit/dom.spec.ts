import {
  type Attr,
  type Document,
  DOMImplementation,
  DOMParser,
  type Element,
  XMLSerializer,
} from '@xmldom/xmldom';
import {
  getDomImplementation,
  getParser,
  getSerializer,
  isAttribute,
  isCDataSection,
  isDocument,
  isElement,
  isText,
} from '#src/dom';

describe('dom', () => {
  let document: Document;
  let element: Element;
  let attribute: Attr;

  beforeEach(() => {
    document = getDomImplementation().createDocument('', '');
    element = document.createElement('myNode');
    element.setAttribute('name', 'first');
    attribute = element.attributes.getNamedItem('name')!;
  });

  test('return instance of xmldom', () => {
    expect(getDomImplementation()).toBeInstanceOf(DOMImplementation);
    expect(getParser()).toBeInstanceOf(DOMParser);
    expect(getSerializer()).toBeInstanceOf(XMLSerializer);
  });

  test('is element', () => {
    expect(isElement(document)).toBeFalsy();
    expect(isElement(element)).toBeTruthy();
    expect(isElement(attribute)).toBeFalsy();
  });

  test('is document', () => {
    expect(isDocument(document)).toBeTruthy();
    expect(isDocument(element)).toBeFalsy();
    expect(isDocument(attribute)).toBeFalsy();
  });

  test('is attr', () => {
    expect(isAttribute(document)).toBeFalsy();
    expect(isAttribute(element)).toBeFalsy();
    expect(isAttribute(attribute)).toBeTruthy();
  });

  test('is text', () => {
    expect(isText(document)).toBeFalsy();
    expect(isText(element)).toBeFalsy();
    expect(isText(attribute)).toBeFalsy();

    const textNode = document.createTextNode('first');
    expect(isText(textNode)).toBeTruthy();
  });

  test('is cdata section', () => {
    expect(isCDataSection(document)).toBeFalsy();
    expect(isCDataSection(element)).toBeFalsy();
    expect(isCDataSection(attribute)).toBeFalsy();

    const cdataNode = document.createCDATASection('<root>first</root>');
    expect(isCDataSection(cdataNode)).toBeTruthy();
  });
});
