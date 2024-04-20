import XmlAttributes from '#src/xml_nodes/xml_attributes';

describe('xml attributes', () => {
  test('construct without arguments', () => {
    const attributes = new XmlAttributes();

    expect(attributes).toHaveLength(0);
    expect(attributes.size).toBe(0);
  });

  test('construct with members', () => {
    const data = {
      foo: 'bar',
      id: 'sample',
    };
    const attributes = new XmlAttributes(data);

    expect(attributes).toHaveLength(2);
    for (const [key, value] of attributes.entries()) {
      expect(attributes.has(key)).toBeTruthy();
      expect(attributes.get(key)).toStrictEqual(value);
    }
  });

  test.each([
    ['empty', ''],
    ['white_space', ' '],
    ['digit', '0'],
    ['digit_hyphen_text', '0-foo'],
    ['hyphen', '-'],
    ['hyphen_text', '-x'],
    ['inner_space', 'foo bar'],
  ])('set with invalid names %s', (_name, attribute) => {
    const attributes = new XmlAttributes();

    expect(() => attributes.set(attribute, '')).toThrow('invalid xml name');
  });

  test('set method', () => {
    const attributes = new XmlAttributes();

    // First
    attributes.set('foo', 'bar');
    expect(attributes).toHaveLength(1);
    expect(attributes.get('foo')).toBe('bar');
    // Second
    attributes.set('lorem', 'ipsum');
    expect(attributes).toHaveLength(2);
    expect(attributes.get('lorem')).toBe('ipsum');
    // Override
    attributes.set('foo', 'BAR');
    expect(attributes).toHaveLength(2);
    expect(attributes.get('foo')).toBe('BAR');
  });

  test('get method on non existent', () => {
    const attributes = new XmlAttributes();

    expect(attributes.get('foo')).toBe('');
  });

  test('delete', () => {
    const attributes = new XmlAttributes();
    attributes.set('foo', 'bar');
    attributes.delete('bar');
    expect(attributes).toHaveLength(1);

    attributes.delete('foo');
    expect(attributes).toHaveLength(0);
  });

  test('clear', () => {
    const attributes = new XmlAttributes();
    attributes.set('foo', 'bar');
    attributes.set('bar', 'foo');
    expect(attributes).toHaveLength(2);

    attributes.clear();
    expect(attributes).toHaveLength(0);
  });

  test('iterator', () => {
    const data = {
      foo: 'bar',
      lorem: 'ipsum',
    };
    const created: Record<string, string> = {};
    const attributes = new XmlAttributes(data);

    for (const [key, value] of attributes.entries()) {
      created[key] = value;
    }

    expect(created).toStrictEqual(data);
  });

  test('iterate attributes with for', () => {
    const data = {
      foo: 'bar',
      lorem: 'ipsum',
    };
    const created: Record<string, string> = {};
    const attributes = new XmlAttributes(data);

    for (const [key, value] of attributes) {
      created[key] = value;
    }

    expect(created).toStrictEqual(data);
  });

  test('iterate attributes with forEach', () => {
    const data = {
      foo: 'bar',
      lorem: 'ipsum',
    };
    const created: Record<string, string> = {};
    const attributes = new XmlAttributes(data);

    // eslint-disable-next-line unicorn/no-array-for-each
    attributes.forEach((value, key) => {
      created[key] = value;
    });

    expect(created).toStrictEqual(data);
  });

  test('obtain keys and values from attributes', () => {
    const data = {
      foo: 'bar',
      lorem: 'ipsum',
    };
    const attributes = new XmlAttributes(data);

    expect([...attributes.keys()]).toStrictEqual(Object.keys(data));
    expect([...attributes.values()]).toStrictEqual(Object.values(data));
  });

  test('set to null or undefined perform remove', () => {
    const attributes = new XmlAttributes({
      bar: 'foo',
      foo: 'bar',
    });

    expect(attributes.has('foo')).toBeTruthy();
    expect(attributes.has('bar')).toBeTruthy();
    attributes.set('foo', null);
    attributes.set('bar', undefined);
    expect(attributes.has('foo')).toBeFalsy();
    expect(attributes.has('bar')).toBeFalsy();
  });

  test('import with undefined or null perform remove', () => {
    const attributes = new XmlAttributes({
      constructor: undefined,
      empty: null,
      importArray: '1',
      offsetGet: '1',
      offsetSet: '1',
      set: '1',
    });

    expect(attributes).toHaveLength(4);
    expect(attributes.has('constructor')).toBeFalsy();
    expect(attributes.has('empty')).toBeFalsy();
    expect(attributes).toHaveLength(4);

    attributes.set('set', null);
    expect(attributes.has('set')).toBeFalsy();
    expect(attributes).toHaveLength(3);

    attributes.import({ importArray: undefined });
    expect(attributes.has('importArray')).toBeFalsy();
    expect(attributes).toHaveLength(2);

    attributes.set('offsetSet', null);
    expect(attributes.has('offsetSet')).toBeFalsy();
    expect(attributes).toHaveLength(1);

    attributes.set('offsetGet', undefined);
    expect(attributes.has('offsetGet')).toBeFalsy();
    expect(attributes).toHaveLength(0);
  });

  test('import with invalid value', () => {
    expect(
      () =>
        new XmlAttributes({
          foo: [],
        }),
    ).toThrow('Cannot convert value of attribute foo to string');
  });

  test('set with object to string', () => {
    const expectedValue = 'foo';

    // eslint-disable-next-line func-style, unicorn/consistent-function-scoping
    function Foo(this: { value: string }, value: string): void {
      this.value = value;
    }

    const toStringObject: string = new (Foo as unknown as new (value: string) => string)('foo');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Foo.prototype.toString = function (): string {
      return (this as { value: string }).value;
    };

    const attributes = new XmlAttributes({
      constructor: toStringObject,
    });

    attributes.set('offsetSet', toStringObject);
    attributes.set('set', toStringObject);
    attributes.import({
      importArray: toStringObject,
    });

    expect(attributes.get('constructor')).toBe(expectedValue);
    expect(attributes.get('offsetSet')).toBe(expectedValue);
    expect(attributes.get('set')).toBe(expectedValue);
    expect(attributes.get('importArray')).toBe(expectedValue);
  });

  test('export record and map', () => {
    const attributes = new XmlAttributes();

    attributes.set('foo', 'bar');

    expect(attributes.export()).toStrictEqual({
      foo: 'bar',
    });

    expect(attributes.exportMap()).toBeInstanceOf(Map);
  });
});
