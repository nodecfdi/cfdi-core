import { Decimal } from 'decimal.js';

export const toFloat = (value: string): number => {
  const resultFloat = Number(value);

  return Number.isNaN(resultFloat) ? 0 : resultFloat;
};

export const roundNumber = (num: Decimal.Value, precision: number): number => {
  return new Decimal(num).toDecimalPlaces(precision).toNumber();
};
