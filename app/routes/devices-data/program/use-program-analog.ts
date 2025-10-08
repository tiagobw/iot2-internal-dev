import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

export type DataFromApi = {
  analog_1: boolean;
  analog_2: boolean;
};

export type Data = {
  analog1: SelectOption;
  analog2: SelectOption;
};

export const ANALOG_OPTIONS: SelectOption[] = [
  { label: '0 - 10 V', value: 'false', id: 'false' },
  { label: '4 - 20 mA', value: 'true', id: 'true' },
];

export const useProgramAnalog = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_analog',
        params: { device_id: deviceId },
      },
      {
        manual: !deviceId,
        useCache: false,
      },
    );

  const mappedData: Data | undefined = useMemo(
    () =>
      data
        ? {
            analog1:
              ANALOG_OPTIONS.find(
                (option) => option.value === String(data.analog_1),
              ) || ANALOG_OPTIONS[0],
            analog2:
              ANALOG_OPTIONS.find(
                (option) => option.value === String(data.analog_2),
              ) || ANALOG_OPTIONS[0],
          }
        : undefined,
    [data],
  );

  return {
    data: mappedData,
    isLoading,
    error,
  };
};
