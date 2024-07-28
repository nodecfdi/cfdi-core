export const toFloat = (value: string): number => {
  const resultFloat = Number.parseFloat(value);

  return Number.isNaN(resultFloat) ? 0 : resultFloat;
};

export const roundNumber = (num: number, precision: number): number => {
  const numSign = num >= 0 ? 1 : -1;

  return toFloat(
    (
      Math.round(num * Math.pow(10, precision) + numSign * 0.0001) / Math.pow(10, precision)
    ).toFixed(precision),
  );
};

export const formatNumber = (num: number, precision: number): string => {
  return roundNumber(num, precision).toFixed(precision);
};
