import { type XmlNodeInterface } from '#src/types';
import XmlNode from '#src/xml_nodes/xml_node';
import XmlNodes from '#src/xml_nodes/xml_nodes';

describe('xml nodes', () => {
  test('empty nodes', () => {
    const nodes = new XmlNodes();

    expect(nodes).toHaveLength(0);
    expect(nodes.firstNodeWithName('non-existent')).toBeUndefined();
  });

  test('construct with nodes array', () => {
    const expected = [new XmlNode('foo'), new XmlNode('bar')];
    const nodes = new XmlNodes(expected);

    expect(nodes).toHaveLength(2);
    for (const [index, node] of nodes.entries()) {
      expect(node).toBe(expected[index]);
    }
  });

  test('manipulate the collection', () => {
    const first = new XmlNode('first');
    const second = new XmlNode('second');
    const nodes = new XmlNodes();

    nodes.add(first, second);

    expect(nodes).toHaveLength(2);
    expect(nodes.has(first)).toBeTruthy();
    expect(nodes.has(second)).toBeTruthy();

    const equalToFirst = new XmlNode('foo');

    expect(nodes.has(equalToFirst)).toBeFalsy();

    // Add an equal node
    nodes.add(equalToFirst);
    expect(nodes).toHaveLength(3);

    // Add and identical node
    nodes.add(equalToFirst);
    expect(nodes).toHaveLength(3);

    // Remove the node
    nodes.delete(equalToFirst);
    expect(nodes).toHaveLength(2);

    // Remove the node again
    nodes.delete(equalToFirst);
    expect(nodes).toHaveLength(2);

    expect(nodes.firstNodeWithName('foo')).toBeUndefined();
    expect(nodes.firstNodeWithName('first')).toBe(first);
    expect(nodes.firstNodeWithName('second')).toBe(second);
  });

  test('add find remove', () => {
    const root = new XmlNode('root');
    const nodes = root.children();
    const child = new XmlNode('child');

    nodes.add(child);
    expect(nodes.has(child)).toBeTruthy();

    const found = root.searchNode('child')!;
    expect(found).toBe(child);

    nodes.delete(found);
    expect(nodes.has(child)).toBeFalsy();
  });

  test('first returns undefined', () => {
    const nodes = new XmlNodes();

    expect(nodes.first()).toBeUndefined();
  });

  test('import from array', () => {
    const nodeOne = new XmlNode('one');
    const nodes = new XmlNodes();

    nodes.importFromArray([nodeOne, new XmlNode('two'), new XmlNode('three')]);

    expect(nodes).toHaveLength(3);
    expect(nodes.first()).toBe(nodeOne);
  });

  test('import from array with non node', () => {
    const nodes = new XmlNodes();
    const specimen = {} as unknown as XmlNodeInterface;

    expect(() => nodes.importFromArray([specimen])).toThrow(
      'The element index 0 is not a XmlNodeInterface object',
    );
  });

  test('get throws exception when not found', () => {
    const nodes = new XmlNodes();

    expect(() => nodes.get(0)).toThrow('The index 0 does not exists');
  });

  test('get with existent elements', () => {
    const foo = new XmlNode('foo');
    const bar = new XmlNode('bar');
    const nodes = new XmlNodes([foo, bar]);

    expect(nodes.get(0)).toBe(foo);
    expect(nodes.get(1)).toBe(bar);

    // Get after remove
    nodes.delete(foo);
    expect(nodes.get(0)).toBe(bar);
  });

  test('get nodes by name', () => {
    const nodes = new XmlNodes();
    const first = new XmlNode('children');
    const second = new XmlNode('children');
    const third = new XmlNode('children');

    nodes.importFromArray([first, second, third, new XmlNode('other')]);

    expect(nodes).toHaveLength(4);
    const byName = nodes.getNodesByName('children');

    expect(byName).toHaveLength(3);
    expect(byName.has(first)).toBeTruthy();
    expect(byName.has(second)).toBeTruthy();
    expect(byName.has(third)).toBeTruthy();
  });

  test('ordered children', () => {
    const nodes = new XmlNodes([new XmlNode('foo'), new XmlNode('bar'), new XmlNode('baz')]);

    // Test inital order
    expect([nodes.get(0).name(), nodes.get(1).name(), nodes.get(2).name()]).toStrictEqual([
      'foo',
      'bar',
      'baz',
    ]);

    // Sort previous values
    nodes.setOrder(['baz', '', '0', 'foo', '', 'bar', 'baz']);
    expect(nodes.getOrder()).toStrictEqual(['baz', 'foo', 'bar']);
    expect([nodes.get(0).name(), nodes.get(1).name(), nodes.get(2).name()]).toStrictEqual([
      'baz',
      'foo',
      'bar',
    ]);

    // Sort again same values not modify order
    nodes.setOrder(['baz', '', '0', 'foo', '', 'bar', 'baz']);
    expect(nodes.getOrder()).toStrictEqual(['baz', 'foo', 'bar']);

    // Add other baz (inserted at the bottom)
    nodes.add(new XmlNode('baz', { id: 'second' }));
    expect([nodes.get(0).name(), nodes.get(1).name(), nodes.get(2).name()]).toStrictEqual([
      'baz',
      'baz',
      'foo',
    ]);
    expect(nodes.get(1).getAttribute('id')).toBe('second');

    // Add other not listed
    const notListed = new XmlNode('yyy');

    nodes.add(notListed);
    expect(nodes.get(4)).toBe(notListed);
  });
});
