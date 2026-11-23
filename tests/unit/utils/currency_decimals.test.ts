import { Decimal } from 'decimal.js';
import { describe, expect, test } from 'vitest';
import CurrencyDecimals from '../../../src/utils/currency_decimals';

describe('currency decimals', () => {
  test('create generic', () => {
    const curdec = new CurrencyDecimals('FOO', 2);
    expect(curdec.currency()).toBe('FOO');
    expect(curdec.decimals()).toBe(2);
  });

  test.each(['', 'ÑÑÑ', 'XXXX'])('create with invalid currency code %s', (currency) => {
    expect(() => new CurrencyDecimals(currency, 2)).toThrow('currency');
  });

  test('create with negative decimals', () => {
    expect(() => new CurrencyDecimals('FOO', -1)).toThrow('decimals');
  });

  test('round returns a Decimal instance with exact rounding', () => {
    const mxn = new CurrencyDecimals('MXN', 2);
    const rounded = mxn.round('1.005');
    expect(rounded).toBeInstanceOf(Decimal);
    expect(rounded.toFixed(2)).toBe('1.01');
    expect(mxn.round(1.004_999).toFixed(2)).toBe('1.00');
    expect(mxn.round(new Decimal('123.456')).toNumber()).toBe(123.46);
  });

  test('does not exceed decimals', () => {
    const foo = new CurrencyDecimals('FOO', 3);
    expect(foo.doesNotExceedDecimals('1')).toBe(true);
    expect(foo.doesNotExceedDecimals('1.000')).toBe(true);
    expect(foo.doesNotExceedDecimals('1.999')).toBe(true);
    expect(foo.doesNotExceedDecimals('1.0001')).toBe(false);
    expect(foo.doesNotExceedDecimals('1.0000')).toBe(false);
  });

  test('decimals count', () => {
    expect(CurrencyDecimals.decimalsCount('1')).toBe(0);
    expect(CurrencyDecimals.decimalsCount('1.')).toBe(0);
    expect(CurrencyDecimals.decimalsCount('1.0')).toBe(1);
    expect(CurrencyDecimals.decimalsCount('1.00')).toBe(2);
  });

  test('known currency mexican peso', () => {
    const mxn = CurrencyDecimals.newFromKnownCurrencies('MXN');
    expect(mxn.currency()).toBe('MXN');
    expect(mxn.decimals()).toBe(2);
  });

  test('unknown currency throws', () => {
    expect(() => CurrencyDecimals.newFromKnownCurrencies('FOO')).toThrow('not known');
  });

  test('unknown currency with default decimals', () => {
    const foo = CurrencyDecimals.newFromKnownCurrencies('FOO', 6);
    expect(foo.currency()).toBe('FOO');
    expect(foo.decimals()).toBe(6);
  });

  test('known decimals', () => {
    expect(CurrencyDecimals.knownCurrencyDecimals('MXN')).toBe(2);
    expect(CurrencyDecimals.knownCurrencyDecimals('USD')).toBe(2);
    expect(CurrencyDecimals.knownCurrencyDecimals('EUR')).toBe(2);
    expect(CurrencyDecimals.knownCurrencyDecimals('XXX')).toBe(0);
    expect(CurrencyDecimals.knownCurrencyDecimals('FOO')).toBe(-1);
  });
});
