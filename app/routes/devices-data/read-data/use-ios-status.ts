import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  di1: boolean;
  di2: boolean;
  ct1: string;
  ct2: string;
  freq1: string;
  freq2: string;
  ea1: string;
  ea2: string;
};

export type Data = {
  di1: string;
  di2: string;
  ct1: string;
  ct2: string;
  freq1: string;
  freq2: string;
  ea1: string;
  ea2: string;
};

const URL = 'alx_cmd_ios_status';

export const useIosStatus = (deviceId: number | null) => {
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
            di1: data.di1 ? 'Sim' : 'Não',
            di2: data.di2 ? 'Sim' : 'Não',
            ct1: data.ct1,
            ct2: data.ct2,
            freq1: data.freq1,
            freq2: data.freq2,
            ea1: data.ea1,
            ea2: data.ea2,
          }
        : {
            di1: '-',
            di2: '-',
            ct1: '-',
            ct2: '-',
            freq1: '-',
            freq2: '-',
            ea1: '-',
            ea2: '-',
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
