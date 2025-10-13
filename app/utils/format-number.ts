export const formatNumber = (
  value?: number | string | null,
  fractionDigits: number = 3,
): string => {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return '-';
  }

  return numericValue.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};
