import { describe, expect, test } from 'vitest';
import XmlNode from '../../../src/xml_nodes/xml_node';
import XmlNodesSorter from '../../../src/xml_nodes/xml_nodes_sorter';

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

  test('nodes named like Object.prototype members are treated as not listed', () => {
    const a = new XmlNode('a');
    const b = new XmlNode('b');
    const ctor = new XmlNode('constructor');
    const toStringNode = new XmlNode('toString');
    const proto = new XmlNode('__proto__');

    const sorter = new XmlNodesSorter(['b', 'a']);

    expect(sorter.sort([ctor, a, toStringNode, proto, b])).toStrictEqual([b, a, ctor, toStringNode, proto]);
  });

  test('sort keeps relative position of equal nodes', () => {
    const foo1 = new XmlNode('foo', { id: '1' });
    const bar = new XmlNode('bar');
    const foo2 = new XmlNode('foo', { id: '2' });

    const sorter = new XmlNodesSorter(['bar', 'foo']);
    const sorted = sorter.sort([foo1, bar, foo2]);

    expect(sorted[1]).toBe(foo1);
    expect(sorted[2]).toBe(foo2);
  });

  test('sort returns same instance when there is no order', () => {
    const list = [new XmlNode('foo')];

    expect(new XmlNodesSorter().sort(list)).toBe(list);
  });
});
