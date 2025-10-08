import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  enabled: boolean;
  time: string;
};

export type Data = {
  otaEnabled: boolean;
  otaTime: string;
};

export const useProgramOta = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_ota',
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
            otaEnabled: Boolean(data.enabled),
            otaTime: data.time ?? '12:00',
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
