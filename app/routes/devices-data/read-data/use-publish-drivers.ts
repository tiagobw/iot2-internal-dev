import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

const URL = 'alx_cmd_driver_data_pub';

export const usePublishDrivers = (
  deviceId: number | null,
  driverId: number | null,
) => {
  const [{ loading: isLoading, error }, executeGet] = useAxios(
    {
      url: URL,
    },
    {
      manual: true,
      useCache: false,
    },
  );

  const callback = useCallback(
    async () =>
      await withTryCatchAndToast(
        async () =>
          await executeGet({
            url: URL,
            params: {
              device_id: deviceId,
              driver_id: driverId,
            },
          }),
      ),
    [deviceId, driverId, executeGet],
  );

  return {
    isLoading,
    error,
    callback,
  };
};
