import { Decimal } from 'decimal.js';

export default class CurrencyDecimals {
  private readonly _currency: string;

  private readonly _decimals: number;

  public constructor(currency: string, decimals: number) {
    if (!/^[A-Z]{3}$/u.test(currency)) {
      throw new Error('Property currency is not valid');
    }

    if (!Number.isSafeInteger(decimals) || decimals < 0) {
      throw new RangeError('Property decimals cannot be less than zero');
    }

    this._currency = currency;
    this._decimals = decimals;
  }

  public currency(): string {
    return this._currency;
  }

  public decimals(): number {
    return this._decimals;
  }

  public round(value: Decimal.Value): Decimal {
    return new Decimal(value).toDecimalPlaces(this._decimals);
  }

  public doesNotExceedDecimals(value: string): boolean {
    return CurrencyDecimals.decimalsCount(value) <= this._decimals;
  }

  public static decimalsCount(value: string): number {
    const dotIndex = value.lastIndexOf('.');
    if (dotIndex === -1) {
      return 0;
    }

    return value.length - dotIndex - 1;
  }

  public static newFromKnownCurrencies(
    currency: string,
    defaultDecimals?: number,
  ): CurrencyDecimals {
    let decimals = this.knownCurrencyDecimals(currency);
    if (decimals < 0) {
      if (defaultDecimals === undefined) {
        throw new RangeError(`The currency ${currency} is not known`);
      }

      decimals = defaultDecimals;
    }

    return new this(currency, decimals);
  }

  public static knownCurrencyDecimals(currency: string): number {
    const knownCurrencies: Record<string, number> = {
      MXN: 2,
      EUR: 2,
      USD: 2,
      XXX: 0,
    };

    return Object.hasOwn(knownCurrencies, currency) ? knownCurrencies[currency] : -1;
  }
}
