import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  enabled: boolean;
  time: string;
};

export type Data = {
  gpsEnabled: boolean;
  gpsTime: string;
};

export const useProgramGps = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_gps_pub',
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
            gpsEnabled: Boolean(data.enabled),
            gpsTime: data.time ?? '',
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
