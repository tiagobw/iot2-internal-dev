import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  time: string;
  di1_mask: string;
  di2_mask: string;
  ct1_pub_value: string;
  ct2_pub_value: string;
  freq1_pub_value: string;
  freq2_pub_value: string;
  ea1_error: boolean;
  ea2_error: boolean;
  ea1_mask: string;
  ea2_mask: string;
  ea1_pub_value: string;
  ea2_pub_value: string;
};

export type Data = {
  time: string;
  di1_mask: string;
  di2_mask: string;
  ct1_pub_value: string;
  ct2_pub_value: string;
  freq1_pub_value: string;
  freq2_pub_value: string;
  ea1_error: string;
  ea2_error: string;
  ea1_mask: string;
  ea2_mask: string;
  ea1_pub_value: string;
  ea2_pub_value: string;
};

const URL = 'alx_cmd_ios_pub';

export const useIosPublishing = (deviceId: number | null) => {
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
            time: data.time,
            di1_mask: data.di1_mask,
            di2_mask: data.di2_mask,
            ct1_pub_value: data.ct1_pub_value,
            ct2_pub_value: data.ct2_pub_value,
            freq1_pub_value: data.freq1_pub_value,
            freq2_pub_value: data.freq2_pub_value,
            ea1_error: data.ea1_error ? 'Sim' : 'Não',
            ea2_error: data.ea2_error ? 'Sim' : 'Não',
            ea1_mask: data.ea1_mask,
            ea2_mask: data.ea2_mask,
            ea1_pub_value: data.ea1_pub_value,
            ea2_pub_value: data.ea2_pub_value,
          }
        : {
            time: '-',
            di1_mask: '-',
            di2_mask: '-',
            ct1_pub_value: '-',
            ct2_pub_value: '-',
            freq1_pub_value: '-',
            freq2_pub_value: '-',
            ea1_error: '-',
            ea2_error: '-',
            ea1_mask: '-',
            ea2_mask: '-',
            ea1_pub_value: '-',
            ea2_pub_value: '-',
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
