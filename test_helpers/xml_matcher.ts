import type { Element, Node } from '@xmldom/xmldom';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import { expect } from 'vitest';

const NODE_ELEMENT = 1;
const NODE_TEXT = 3;
const NODE_CDATA = 4;
const NODE_COMMENT = 8;

const serializer = new XMLSerializer();

const escapeXmlText = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const escapeXmlAttr = (value: string): string =>
  escapeXmlText(value).replaceAll('"', '&quot;');

const formatNode = (node: Node, indent: number): string => {
  const pad = '  '.repeat(indent);

  if (node.nodeType === NODE_ELEMENT) {
    const element = node as Element;
    const attrs = [...element.attributes]
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map((attr) => ` ${attr.name}="${escapeXmlAttr(attr.value)}"`)
      .join('');

    const children = [...element.childNodes].filter((child) => {
      if (child.nodeType === NODE_TEXT) {
        return (child.nodeValue ?? '').trim() !== '';
      }

      return (
        child.nodeType === NODE_ELEMENT
        || child.nodeType === NODE_CDATA
        || child.nodeType === NODE_COMMENT
      );
    });

    if (children.length === 0) {
      return `${pad}<${element.tagName}${attrs}/>`;
    }

    if (children.length === 1 && children[0].nodeType === NODE_TEXT) {
      return `${pad}<${element.tagName}${attrs}>${escapeXmlText(children[0].nodeValue ?? '')}</${element.tagName}>`;
    }

    const formattedChildren = children.map((child) => formatNode(child, indent + 1)).join('\n');

    return `${pad}<${element.tagName}${attrs}>\n${formattedChildren}\n${pad}</${element.tagName}>`;
  }

  if (node.nodeType === NODE_TEXT) {
    return `${pad}${escapeXmlText((node.nodeValue ?? '').trim())}`;
  }

  if (node.nodeType === NODE_CDATA) {
    return `${pad}<![CDATA[${node.nodeValue ?? ''}]]>`;
  }

  if (node.nodeType === NODE_COMMENT) {
    return `${pad}<!--${node.nodeValue ?? ''}-->`;
  }

  return `${pad}${serializer.serializeToString(node)}`;
};

export const formatXml = (xml: string): string => {
  const doc = new DOMParser().parseFromString(xml.trim(), 'text/xml');
  if (!doc.documentElement) {
    return xml.trim();
  }

  return formatNode(doc.documentElement, 0);
};

export const toEqualXML = (
  received: string,
  expected: string,
): {
  pass: boolean;
  message: () => string;
  actual: string;
  expected: string;
} => {
  const formattedReceived = formatXml(received);
  const formattedExpected = formatXml(expected);
  const pass = formattedReceived === formattedExpected;

  return {
    pass,
    actual: formattedReceived,
    expected: formattedExpected,
    message: () =>
      pass ? 'Expected XML structures not to be equal' : 'Expected XML structures to be equal',
  };
};

expect.extend({ toEqualXML });

interface XmlMatchers<R = unknown> {
  toEqualXML: (expected: string) => R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<R extends void | Promise<void> = void, T = unknown>
    extends XmlMatchers<R> {}

  interface AsymmetricMatchersContaining extends XmlMatchers {}
}
