import { formatNumber, roundNumber, toFloat } from '#src/utils/number';

describe('number utils', () => {
  test('format floating point with another decimal different of 5', () => {
    expect(formatNumber(1e-8, 8)).toBe('0.00000001');
  });

  test('format floating point number 5 upper half of an integer', () => {
    expect(formatNumber(0.1234565, 6)).toBe('0.123457');
  });

  test('format other numbers with fraction such as .005', () => {
    expect(formatNumber(4.015, 2)).toBe('4.02');
    expect(formatNumber(5.015, 2)).toBe('5.02');
    expect(formatNumber(6.015, 2)).toBe('6.02');
    expect(formatNumber(7.015, 2)).toBe('7.02');
    expect(formatNumber(128.015, 2)).toBe('128.02');
    expect(formatNumber(0.005, 2)).toBe('0.01');
  });

  test('parseFloat works with NaN numbers', () => {
    expect(toFloat('')).toBe(0);
    expect(toFloat('0.0001')).toBe(0.0001);
    expect(toFloat('1.0')).toBe(1);
  });

  test('round works with negative numbers', () => {
    expect(roundNumber(-1.015, 2)).toBe(-1.02);
  });
});
