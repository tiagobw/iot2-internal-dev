import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  device_version: string | null;
  available_version: string | null;
  status: string | null;
};

export type ForceOtaData = {
  deviceVersion: string;
  availableVersion: string;
  status: string;
};

const URL = 'alx_prg_ota_execute';

export const useForceOta = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] = useAxios<
    DataFromApi[]
  >(
    {
      url: URL,
      params: {
        device_id: deviceId,
      },
    },
    {
      manual: true,
      useCache: false,
    },
  );

  const mappedData: ForceOtaData[] = useMemo(
    () =>
      data && !isLoading
        ? data?.map((d) => ({
            deviceVersion: d?.device_version === null ? '-' : d?.device_version,
            availableVersion:
              d?.available_version === null ? '-' : d?.available_version,
            status: d?.status === null ? '-' : d?.status,
          }))
        : [],
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
