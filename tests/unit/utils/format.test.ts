import { Decimal } from 'decimal.js';
import { describe, expect, test } from 'vitest';
import { formatDatetime, formatNumber } from '../../../src/utils/format';

describe('format utils', () => {
  test('format floating point with another decimal different of 5', () => {
    expect(formatNumber(1e-8, 8)).toBe('0.00000001');
  });

  test('format floating point number 5 upper half of an integer', () => {
    expect(formatNumber(0.123_456_5, 6)).toBe('0.123457');
  });

  test('format other numbers with fraction such as .005', () => {
    expect(formatNumber(4.015, 2)).toBe('4.02');
    expect(formatNumber(5.015, 2)).toBe('5.02');
    expect(formatNumber(6.015, 2)).toBe('6.02');
    expect(formatNumber(7.015, 2)).toBe('7.02');
    expect(formatNumber(128.015, 2)).toBe('128.02');
    expect(formatNumber(0.005, 2)).toBe('0.01');
  });

  test('format with 6 of precision', () => {
    expect(formatNumber(1.234_566_4, 6)).toBe('1.234566');
    expect(formatNumber(1.234_566_5, 6)).toBe('1.234567');
    expect(formatNumber(1.234_567_4, 6)).toBe('1.234567');
    expect(formatNumber(1.234_567_5, 6)).toBe('1.234568');
    expect(formatNumber(1, 6)).toBe('1.000000');
  });

  test('format number with default decimals, strings and Decimal', () => {
    expect(formatNumber(18.9008, 4)).toBe('18.9008');
    expect(formatNumber(18.9008)).toBe('18.90');
    expect(formatNumber('1.005', 2)).toBe('1.01');
    expect(formatNumber(new Decimal('1234.5'), 2)).toBe('1234.50');
    expect(formatNumber(10, 0)).toBe('10');
  });

  test('format datetime in local time and UTC from Date and milliseconds', () => {
    const localDate = new Date(2024, 0, 5, 9, 8, 7);
    expect(formatDatetime(localDate)).toBe('2024-01-05T09:08:07');
    expect(formatDatetime(localDate.getTime())).toBe('2024-01-05T09:08:07');

    const utcMs = Date.UTC(2024, 11, 31, 23, 59, 58);
    expect(formatDatetime(utcMs, true)).toBe('2024-12-31T23:59:58');
    expect(formatDatetime(new Date(utcMs), true)).toBe('2024-12-31T23:59:58');
  });

  test('format datetime throws on invalid date', () => {
    expect(() => formatDatetime(NaN)).toThrow('Invalid date value');
  });
});
