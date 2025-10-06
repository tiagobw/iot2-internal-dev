import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export const toBrazilISOString = (date?: Date): string | undefined => {
  if (!date) return undefined;

  const timeZone = 'America/Sao_Paulo';
  const tzDate = new TZDate(date, timeZone);

  return format(tzDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};
