export const parseFloat = (value: string): number => {
  const resultFloat = Number.parseFloat(value);

  return Number.isNaN(resultFloat) ? 0 : resultFloat;
};

export const round = (num: number, precision: number): number => {
  const numSign = num >= 0 ? 1 : -1;

  return parseFloat(
    (
      Math.round(num * Math.pow(10, precision) + numSign * 0.0001) / Math.pow(10, precision)
    ).toFixed(precision),
  );
};

export const format = (num: number, precision: number): string => {
  return round(num, precision).toFixed(precision);
};
