import { describe, expect, test } from 'vitest';
import SchemaLocations from '../../../src/utils/schema_locations';

describe('schema locations', () => {
  test('constructor with empty value', () => {
    const schemaLocations = new SchemaLocations();
    expect(schemaLocations.pairs()).toStrictEqual({});
    expect(schemaLocations).toHaveLength(0);
    expect(schemaLocations.size).toBe(0);
    expect(schemaLocations.isEmpty()).toBe(true);
  });

  test('constructor with valid values', () => {
    const pairs = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    const schemaLocations = new SchemaLocations(pairs);
    expect(schemaLocations.pairs()).toStrictEqual(pairs);
    expect(schemaLocations).toHaveLength(2);
    expect(schemaLocations.isEmpty()).toBe(false);
  });

  test('has namespace', () => {
    const pairs = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    const schemaLocations = new SchemaLocations(pairs);
    expect(schemaLocations.has('http://tempuri.org/my-foo')).toBe(true);
    expect(schemaLocations.has('http://tempuri.org/my-xee')).toBe(false);
  });

  test('append and remove', () => {
    const pairs = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    const schemaLocations = new SchemaLocations(pairs);
    schemaLocations.append('http://tempuri.org/my-xee', 'http://tempuri.org/my-xee.xls');
    expect(schemaLocations.has('http://tempuri.org/my-xee')).toBe(true);
    schemaLocations.remove('http://tempuri.org/my-xee');
    expect(schemaLocations.has('http://tempuri.org/my-xee')).toBe(false);
  });

  test('as string with complete values', () => {
    const pairs = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    const schemaLocations = new SchemaLocations(pairs);
    const expected = 'http://tempuri.org/my-foo http://tempuri.org/my-foo.xls'
      + ' http://tempuri.org/my-bar http://tempuri.org/my-bar.xls';
    expect(schemaLocations.asString()).toBe(expected);
    expect(schemaLocations.hasAnyNamespaceWithoutLocation()).toBe(false);
  });

  test('as string with incomplete values', () => {
    const pairs = {
      'http://tempuri.org/my-aaa': '',
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bbb': '',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
      'http://tempuri.org/my-ccc': '',
    };
    const schemaLocations = new SchemaLocations(pairs);
    const expected = 'http://tempuri.org/my-foo http://tempuri.org/my-foo.xls'
      + ' http://tempuri.org/my-bar http://tempuri.org/my-bar.xls';
    expect(schemaLocations.asString()).toBe(expected);
    expect(schemaLocations.hasAnyNamespaceWithoutLocation()).toBe(true);
    expect(schemaLocations.getNamespacesWithoutLocation()).toStrictEqual([
      'http://tempuri.org/my-aaa',
      'http://tempuri.org/my-bbb',
      'http://tempuri.org/my-ccc',
    ]);
  });

  test('traverse', () => {
    const pairs = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    const schemaLocations = new SchemaLocations(pairs);
    expect(Object.fromEntries(schemaLocations)).toStrictEqual(pairs);
  });

  test('construct from string', () => {
    const input = '  http://tempuri.org/my-foo   http://tempuri.org/my-foo.xls  '
      + 'http://tempuri.org/my-bar        http://tempuri.org/my-bar.xls  ';
    const schemaLocations = SchemaLocations.fromString(input, false);
    const expected = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    expect(schemaLocations.pairs()).toStrictEqual(expected);
  });

  test('construct from string with odd contents excluding last', () => {
    const input = 'http://tempuri.org/my-foo http://tempuri.org/my-foo.xls'
      + ' http://tempuri.org/my-bar http://tempuri.org/my-bar.xls'
      + ' http://tempuri.org/my-xee';
    const schemaLocations = SchemaLocations.fromString(input, false);
    expect(schemaLocations.hasAnyNamespaceWithoutLocation()).toBe(false);
    const expected = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
    };
    expect(schemaLocations.pairs()).toStrictEqual(expected);
  });

  test('construct from string with odd contents including last', () => {
    const input = 'http://tempuri.org/my-foo http://tempuri.org/my-foo.xls'
      + ' http://tempuri.org/my-bar http://tempuri.org/my-bar.xls'
      + ' http://tempuri.org/my-xee';
    const schemaLocations = SchemaLocations.fromString(input, true);
    expect(schemaLocations.hasAnyNamespaceWithoutLocation()).toBe(true);
    const expected = {
      'http://tempuri.org/my-foo': 'http://tempuri.org/my-foo.xls',
      'http://tempuri.org/my-bar': 'http://tempuri.org/my-bar.xls',
      'http://tempuri.org/my-xee': '',
    };
    expect(schemaLocations.pairs()).toStrictEqual(expected);
  });

  test('construct from string strict xsd', () => {
    const source = '  bleh  foo  foo.xsd  bar  baz  zoo  zoo.xsd  baa  xee  xee.xsd  bah  ';
    const schemaLocations = SchemaLocations.fromStringStrictXsd(source);
    expect(schemaLocations.getNamespacesWithoutLocation()).toStrictEqual([
      'bleh',
      'bar',
      'baz',
      'baa',
      'bah',
    ]);
    expect(schemaLocations.asString()).toBe('foo foo.xsd zoo zoo.xsd xee xee.xsd');
  });
});
