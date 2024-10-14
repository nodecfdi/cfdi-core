import XmlNode from '#src/xml_nodes/xml_node';

describe('xml node', () => {
  test('construct without arguments', () => {
    const node = new XmlNode('name');

    expect(node.name()).toBe('name');
    expect(node.attributes()).toHaveLength(0);
    expect(node.children()).toHaveLength(0);
    expect(node).toHaveLength(0);
    expect(node.value()).toBe('');
  });

  test('construct with arguments', () => {
    const dummyNode = new XmlNode('dummy');
    const attributes = { foo: 'bar' };
    const children = [dummyNode];
    const value = 'xee';
    const node = new XmlNode('name', attributes, children, value);

    expect(node.getAttribute('foo')).toBe('bar');
    expect(node.children().firstNodeWithName('dummy')).toBe(dummyNode);
    expect(node.value()).toBe(value);
  });

  test('construct with empty name', () => {
    expect((): XmlNode => new XmlNode('')).toThrow('invalid xml name');
  });

  test('construct with untrimmed empty name', () => {
    expect((): XmlNode => new XmlNode('\n \t \n')).toThrow('invalid xml name');
  });

  test('construct with untrimmed name', () => {
    expect((): XmlNode => new XmlNode(' x ')).toThrow(
      'Cannot create a node with an invalid xml name',
    );
  });

  test('search attribute', () => {
    const node = new XmlNode('root', { level: '1' }, [
      new XmlNode('child', { level: '2' }, [
        new XmlNode('grandchild', { level: '3.1' }),
        new XmlNode('grandchild', { level: '3.2' }),
      ]),
    ]);

    expect(node.searchAttribute('level')).toBe('1');
    expect(node.searchAttribute('child', 'level')).toBe('2');
    expect(node.searchAttribute('child', 'grandchild', 'level')).toBe('3.1');

    expect(node.searchAttribute('not-found-child', 'child', 'grandchild', 'level')).toBe('');
    expect(node.searchAttribute('not-found-attribute')).toBe('');
  });

  test('search node', () => {
    const grandChildOne = new XmlNode('grandchild', { level: '3.1' });
    const grandChildTwo = new XmlNode('grandchild', { level: '3.2' });
    const child = new XmlNode('child', { level: '2' }, [grandChildOne, grandChildTwo]);
    const root = new XmlNode('root', { level: '1' }, [child]);

    expect(root.searchNode()).toBe(root);
    expect(root.searchNode('child')).toBe(child);
    expect(root.searchNode('child', 'grandchild')).toBe(grandChildOne);

    expect(root.searchNode('child', 'grandchild', 'not-found')).toBeUndefined();
    expect(root.searchNode('not-found', 'child', 'grandchild')).toBeUndefined();
    expect(root.searchNode('not-found')).toBeUndefined();
  });

  test('search nodes', () => {
    const grandChildOne = new XmlNode('grandchild', { level: '3.1' });
    const grandChildTwo = new XmlNode('grandchild', { level: '3.2' });
    const child = new XmlNode('child', { level: '2' }, [grandChildOne, grandChildTwo]);
    const root = new XmlNode('root', { level: '1' }, [child]);
    const nodesChild = root.searchNodes('child');
    const nodesGrandChild = root.searchNodes('child', 'grandchild');

    expect(nodesChild).toHaveLength(1);
    expect(nodesChild.first()).toBe(child);

    expect(nodesGrandChild).toHaveLength(2);
    expect(nodesGrandChild.get(0)).toBe(grandChildOne);
    expect(nodesGrandChild.get(1)).toBe(grandChildTwo);

    expect(root.searchNodes('child', 'grandchild', 'not-found')).toHaveLength(0);
    expect(root.searchNodes('not-found', 'child', 'grandchild')).toHaveLength(0);
    expect(root.searchNodes('not-found')).toHaveLength(0);
  });

  test('alias for get and set of attributes', () => {
    const node = new XmlNode('x');

    node.setAttribute('id', 'form');
    node.setAttribute('key', 'custom');
    expect(node.attributes().has('id')).toBeTruthy();
    expect(node.attributes().has('key')).toBeTruthy();
    expect(node.getAttribute('id')).toBe('form');
    expect(node.getAttribute('key')).toBe('custom');

    node.setAttribute('id', 'the-form');
    expect(node.getAttribute('id')).toBe('the-form');

    node.setAttribute('id', null);
    expect(node.attributes().has('id')).toBeFalsy();
    expect(node.getAttribute('id')).toBe('');

    node.setAttribute('key');
    expect(node.attributes().has('key')).toBeFalsy();
    expect(node.getAttribute('key')).toBe('');
  });

  test('value property', () => {
    const node = new XmlNode('x');

    node.setValue('first');

    expect(node.value()).toBe('first');
    node.setValue('second');

    expect(node.value()).toBe('second');
  });

  test('add children', () => {
    const node = new XmlNode('x');
    const childrenNode = new XmlNode('y');

    node.addChild(childrenNode);

    expect(node).toHaveLength(1);
  });

  test('add attributes', () => {
    const node = new XmlNode('x');
    expect(node.attributes().size).toBe(0);

    node.addAttributes({ foo: 'foo' });
    expect(node.attributes().size).toBe(1);
  });

  test('clear all', () => {
    const node = new XmlNode('x', { foo: '1' });
    const childrenNode = new XmlNode('y');
    node.addChild(childrenNode);

    expect(node).toHaveLength(1);
    expect(node.attributes().size).toBe(1);

    node.clear();
    expect(node).toHaveLength(0);
    expect(node.attributes().size).toBe(0);
  });

  test('iterate from node childrens', () => {
    const node = new XmlNode('x');
    const childrenNode1 = new XmlNode('y1');
    const childrenNode2 = new XmlNode('y2');
    node.addChild(childrenNode1);
    node.addChild(childrenNode2);

    let i = 1;
    for (const child of node) {
      expect(child.name()).equals(`y${i}`);
      i += 1;
    }
  });

  test('alias for has of attributes', () => {
    const node = new XmlNode('x');
    node.setAttribute('id', 'form');
    node.setAttribute('key', 'custom');

    expect(node.hasAttribute('id')).toBeTruthy();
    expect(node.hasAttribute('key')).toBeTruthy();

    node.setAttribute('id', null);
    expect(node.hasAttribute('id')).toBeFalsy();

    node.setAttribute('key');
    expect(node.hasAttribute('key')).toBeFalsy();
  });
});
