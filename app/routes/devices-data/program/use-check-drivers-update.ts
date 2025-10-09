import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  model: string | null;
  current_version: number | null;
  version_available: number | null;
  need_update: boolean | null;
};

export type DriversData = {
  model: string;
  currentVersion: string;
  versionAvailable: string;
  needUpdate: string;
};

const URL = 'alx_pgr_drivers_update';

export const useCheckDriversUpdate = (deviceId: number | null) => {
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

  const mappedData: DriversData[] = useMemo(
    () =>
      data && !isLoading
        ? data?.map((d) => ({
            model: d?.model === null ? '-' : d?.model,
            currentVersion:
              d?.current_version === null ? '-' : String(d?.current_version),
            versionAvailable:
              d?.version_available === null
                ? '-'
                : String(d?.version_available),
            needUpdate:
              d?.need_update === null ? '-' : d?.need_update ? 'Sim' : 'Não',
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
