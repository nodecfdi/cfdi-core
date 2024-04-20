import { getDomImplementation, getParser, isDocument, isElement } from '#src/dom';

export const documentElement = (document: Document): Element => {
  const rootElement = document.documentElement;

  if (!isElement(rootElement)) {
    throw new TypeError('Document does not have root element');
  }

  return rootElement;
};

export const ownerDocument = (node: Node): Document => {
  if (!node.ownerDocument) {
    if (isDocument(node)) {
      return node;
    }

    throw new TypeError('node.ownerDocument is null but node is not a Document');
  }

  return node.ownerDocument;
};

export const newDocument = (document?: Document): Document => {
  let temporalDocument: Document | undefined = document;
  if (!temporalDocument) {
    temporalDocument = getDomImplementation().createDocument(null, null, null);
  }

  return temporalDocument;
};

export const newDocumentContent = (content: string): Document => {
  if (content === '') {
    throw new TypeError('Received xml string argument is empty');
  }

  try {
    const documentParse = getParser().parseFromString(content, 'text/xml');

    return newDocument(documentParse);
  } catch (error) {
    throw new Error(`Cannot create a Document from xml string, errors: ${JSON.stringify(error)}`);
  }
};

export const isValidXmlName = (name: string): boolean => {
  if (name === '') {
    return false;
  }

  return /^[\p{L}_:][\p{L}\d_:.-]*$/u.test(name);
};

export const createDomElement = (
  makeElement: () => Element,
  errorMessage: string,
  content: string,
): Element => {
  let element: Element | undefined;
  let previousException: Error | undefined;
  try {
    element = makeElement();
  } catch (error) {
    previousException = error as Error;
  }

  if (!element || !isElement(element)) {
    throw new TypeError(
      `${errorMessage} on ${previousException ? previousException.message : 'not is element'}`,
    );
  }

  if (content !== '') {
    element.appendChild(ownerDocument(element).createTextNode(content));
  }

  return element;
};

export const createElement = (document: Document, name: string, content = ''): Element => {
  return createDomElement(
    () => {
      if (!name) {
        throw new TypeError('Empty name');
      }

      return document.createElement(name);
    },
    `Cannot create element with name ${name}`,
    content,
  );
};
