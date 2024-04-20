import XmlNode from '#src/xml_nodes/xml_node';
import XmlNodesSorter from '#src/xml_nodes/xml_nodes_sorter';

describe('xml nodes sorter', () => {
  test('construct with names', () => {
    const values = ['foo', 'bar', 'baz'];
    const sorter = new XmlNodesSorter(values);

    expect(sorter.getOrder()).toStrictEqual(values);
  });

  test('construct without names', () => {
    const sorter = new XmlNodesSorter();

    expect(sorter.getOrder()).toStrictEqual([]);
  });

  test('parse names', () => {
    const sorter = new XmlNodesSorter();

    // All invalid values
    expect(sorter.parseNames([null, undefined, 0, '', {}])).toStrictEqual([]);
    // All valid values
    expect(sorter.parseNames(['foo', 'bar'])).toStrictEqual(['foo', 'bar']);
    // Duplicated values
    expect(sorter.parseNames(['foo', 'bar', 'bar', 'foo', 'baz'])).toStrictEqual([
      'foo',
      'bar',
      'baz',
    ]);
    // Mixed values
    expect(sorter.parseNames(['', 'foo', '', 'bar', '', 'foo'])).toStrictEqual(['foo', 'bar']);
  });

  test('set and get order', () => {
    const sorter = new XmlNodesSorter(['foo', 'bar']);

    expect(sorter.getOrder()).toStrictEqual(['foo', 'bar']);

    // It change
    expect(sorter.setOrder(['bar', 'foo'])).toBeTruthy();
    expect(sorter.getOrder()).toStrictEqual(['bar', 'foo']);

    // It did not change
    expect(sorter.setOrder(['bar', 'foo'])).toBeFalsy();
    expect(sorter.getOrder()).toStrictEqual(['bar', 'foo']);
  });

  test('order', () => {
    const foo1 = new XmlNode('foo');
    const foo2 = new XmlNode('foo');
    const bar = new XmlNode('bar');
    const baz = new XmlNode('baz');
    const yyy = new XmlNode('yyy');

    const order = ['baz', 'bar', 'foo'];
    const unsorted = [yyy, foo1, foo2, bar, baz];
    const expected = [baz, bar, foo1, foo2, yyy];

    const sorter = new XmlNodesSorter(order);
    const sorted = sorter.sort(unsorted);

    expect(JSON.stringify(sorted)).toStrictEqual(JSON.stringify(expected));
  });

  test('order preserve position', () => {
    const list: XmlNode[] = [];

    for (let index = 0; index < 1000; index += 1) {
      list.push(new XmlNode('foo'));
    }

    const sorter = new XmlNodesSorter(['foo']);

    expect(JSON.stringify(sorter.sort(list))).toStrictEqual(JSON.stringify(list));
  });
});
