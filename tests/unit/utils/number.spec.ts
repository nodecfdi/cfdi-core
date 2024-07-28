import { format, parseFloat, round } from '#src/utils/number';

describe('number utils', () => {
  test('format floating point with another decimal different of 5', () => {
    expect(format(1e-8, 8)).toBe('0.00000001');
  });

  test('format floating point number 5 upper half of an integer', () => {
    expect(format(0.1234565, 6)).toBe('0.123457');
  });

  test('format other numbers with fraction such as .005', () => {
    expect(format(1.015, 2)).toBe('1.02');
    expect(format(4.015, 2)).toBe('4.02');
    expect(format(5.015, 2)).toBe('5.02');
    expect(format(6.015, 2)).toBe('6.02');
    expect(format(7.015, 2)).toBe('7.02');
    expect(format(128.015, 2)).toBe('128.02');
    expect(format(0.005, 2)).toBe('0.01');
  });

  test('parseFloat works with NaN numbers', () => {
    expect(parseFloat('')).toBe(0);
    expect(parseFloat('0.0001')).toBe(0.0001);
    expect(parseFloat('1.0')).toBe(1);
  });

  test('round works with negative numbers', () => {
    expect(round(-1.015, 2)).toBe(-1.02);
  });
});
