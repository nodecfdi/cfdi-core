import { Decimal } from 'decimal.js';
import { describe, expect, test } from 'vitest';
import { roundNumber, toFloat } from '../../../src/utils/number';

describe('number utils', () => {
  test('parseFloat works with NaN numbers', () => {
    expect(toFloat('')).toBe(0);
    expect(toFloat('0.0001')).toBe(0.0001);
    expect(toFloat('a')).toBe(0);
  });

  test('round works with negative numbers, strings and Decimal', () => {
    expect(roundNumber(-1.015, 2)).toBe(-1.02);
    expect(roundNumber(1.004_999, 2)).toBe(1);
    expect(roundNumber('1.005', 2)).toBe(1.01);
    expect(roundNumber(new Decimal('123.456'), 2)).toBe(123.46);
  });
});
