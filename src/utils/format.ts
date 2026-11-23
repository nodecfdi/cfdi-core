import { Decimal } from 'decimal.js';

export const formatNumber = (value: Decimal.Value, decimals = 2): string => {
  return new Decimal(value).toFixed(decimals);
};

export const formatDatetime = (value: Date | number, useUtc = false): string => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid date value');
  }

  const pad2 = (value: number): string => String(value).padStart(2, '0');

  const year = String(useUtc ? date.getUTCFullYear() : date.getFullYear()).padStart(4, '0');
  const month = pad2((useUtc ? date.getUTCMonth() : date.getMonth()) + 1);
  const day = pad2(useUtc ? date.getUTCDate() : date.getDate());
  const hours = pad2(useUtc ? date.getUTCHours() : date.getHours());
  const minutes = pad2(useUtc ? date.getUTCMinutes() : date.getMinutes());
  const seconds = pad2(useUtc ? date.getUTCSeconds() : date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
