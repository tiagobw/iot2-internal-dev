import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  enabled: boolean;
  satelites: string;
  time: string;
  lat: string;
  lon: string;
  high: string;
  speed: string;
  error: string;
  azimute: string;
};

export type Data = {
  enabled: string;
  satelites: string;
  time: string;
  lat: string;
  lon: string;
  high: string;
  speed: string;
  error: string;
  azimute: string;
};

const URL = 'alx_cmd_gps';

export const useGpsStatus = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: URL,
        params: {
          device_id: deviceId,
          device_data: false,
        },
      },
      {
        manual: !deviceId,
        useCache: false,
      },
    );

  const mappedData: Data = useMemo(
    () =>
      data && !isLoading
        ? {
            enabled: data.enabled ? 'Sim' : 'Não',
            satelites: data.satelites,
            time: data.time,
            lat: data.lat,
            lon: data.lon,
            high: data.high,
            speed: data.speed,
            error: data.error,
            azimute: data.azimute,
          }
        : {
            enabled: '-',
            satelites: '-',
            time: '-',
            lat: '-',
            lon: '-',
            high: '-',
            speed: '-',
            error: '-',
            azimute: '-',
          },
    [data, isLoading],
  );

  const callback = useCallback(
    async () =>
      await withTryCatchAndToast(
        async () =>
          await executeGet({
            url: URL,
            params: {
              device_id: deviceId,
              device_data: true,
            },
          }),
      ),
    [deviceId, executeGet],
  );

  return {
    data: mappedData,
    isLoading,
    error,
    callback,
  };
};
