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

  test('format with 6 of precision', () => {
    expect(formatNumber(1.2345664, 6)).toBe('1.234566');
    expect(formatNumber(1.2345665, 6)).toBe('1.234567');
    expect(formatNumber(1.2345674, 6)).toBe('1.234567');
    expect(formatNumber(1.2345675, 6)).toBe('1.234568');
    expect(formatNumber(1, 6)).toBe('1.000000');
  });

  test('parseFloat works with NaN numbers', () => {
    expect(toFloat('')).toBe(0);
    expect(toFloat('0.0001')).toBe(0.0001);
    expect(toFloat('a')).toBe(0);
  });

  test('round works with negative numbers', () => {
    expect(roundNumber(-1.015, 2)).toBe(-1.02);
  });
});
