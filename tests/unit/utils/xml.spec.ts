import { getDomImplementation, getSerializer } from '#src/dom';
import {
  createElement,
  documentElement,
  isValidXmlName,
  newDocument,
  newDocumentContent,
  ownerDocument,
} from '#src/utils/xml';

describe('xml util', () => {
  test.each([['First_Name'], ['_4-lane'], ['tél'], ['month-day']])(
    'true on valid names current %s',
    (name) => {
      expect(isValidXmlName(name)).toBeTruthy();
    },
  );

  test.each([['Driver`s_License'], ['month/day'], ['first name'], ['4-lane']])(
    'false on invalid names current %s',
    (name) => {
      expect(isValidXmlName(name)).toBeFalsy();
    },
  );

  test('method ownerDocument return same document', () => {
    const document = newDocument();

    expect(ownerDocument(document)).toBe(document);
  });

  test('method ownerDocument null but is document', () => {
    const document = newDocument();
    const documentWithNullOwnerDocument = Object.assign(document, { ownerDocument: null });

    expect(ownerDocument(documentWithNullOwnerDocument)).toBe(document);
  });

  test('method ownerDocument null, but is not document', () => {
    const document = newDocument();
    const invalidDocument = { ...document, ownerDocument: null };

    expect(() => ownerDocument(invalidDocument)).toThrow(
      'node.ownerDocument is null but node is not a Document',
    );
  });

  test('method newDocumentContent with empty xml', () => {
    const xmlEmpty = '';

    expect(() => newDocumentContent(xmlEmpty)).toThrow('Received xml string argument is empty');
  });

  test('method newDocumentContent with invalid xml', () => {
    const xmlInvalid = '<xml a="1" a="2"></xml>';

    expect(() => newDocumentContent(xmlInvalid)).toThrow(
      'Cannot create a Document from xml string',
    );
  });

  test('method documentElement without root element', () => {
    expect(() => documentElement(newDocument())).toThrow('Document does not have root element');
  });

  test('method documentElement with root element', () => {
    const document = getDomImplementation().createDocument('', '');
    const root = document.createElement('root');
    document.appendChild(root);

    expect(documentElement(document)).toStrictEqual(root);
  });

  test.each([
    ['empty', '', ''],
    ['foo', 'foo', 'foo'],
    ['ampersand', '&amp;', '&'],
    ['<', '&lt;', '<'],
    ['>', '&gt;', '>'],
    ['comilla_simple', "'", "'"],
    ['comilla_doble', '"', '"'],
    ['&copy;', '&amp;copy;', '&copy;'],
    ['mixed', 'foo &amp; bar', 'foo & bar'],
  ])('method createElement current %s', (_name, expected, content) => {
    const elementName = 'element';
    const document = newDocument();
    const element = createElement(document, elementName, content);

    document.appendChild(element);
    expect(element.textContent).toStrictEqual(content);

    const rawXml = getSerializer().serializeToString(document);

    // Fixed self-closing tags to full closing tags
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const fixedXml = rawXml.replaceAll(/<(.*?)\s*\/>/g, '<$1></$1>');
    expect(fixedXml).toBe(`<${elementName}>${expected}</${elementName}>`);
  });

  test('method createElement with bad name', () => {
    const document = newDocument();

    expect(() => createElement(document, '')).toThrow('Cannot create element');
  });
});
