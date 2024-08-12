/// <reference lib="dom" />

declare module '@xmldom/xmldom' {
  // eslint-disable-next-line no-var
  var DOMImplementation: DOMImplementationStatic;

  interface DOMImplementationStatic {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    new (): DOMImplementation;
  }
}
