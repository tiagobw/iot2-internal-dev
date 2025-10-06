import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  baud_rate: string;
  data_bits: string;
  parity: string;
  stop_bits: string;
  modbuss_address: string;
  intra_frames: string;
};

export type Data = {
  baud_rate: string;
  data_bits: string;
  parity: string;
  stop_bits: string;
  modbuss_address: string;
  intra_frames: string;
};

const URL = 'alx_cmd_serial';

export const useRsStatus = (deviceId: number | null) => {
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
            baud_rate: data.baud_rate,
            data_bits: data.data_bits,
            parity: data.parity,
            stop_bits: data.stop_bits,
            modbuss_address: data.modbuss_address,
            intra_frames: data.intra_frames,
          }
        : {
            baud_rate: '-',
            data_bits: '-',
            parity: '-',
            stop_bits: '-',
            modbuss_address: '-',
            intra_frames: '-',
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
