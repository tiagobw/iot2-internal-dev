import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  model: string;
  rtu: boolean;
  tcp: boolean;
  ip: string;
  port: string;
  id: string;
  rev: string;
  modbus_address: string;
  timeout: string;
  status: string;
};

export type DriversData = {
  model: string;
  rtu: string;
  tcp: string;
  ip: string;
  port: string;
  id: string;
  rev: string;
  modbusAddress: string;
  timeout: string;
  status: string;
};

const URL = 'alx_cmd_drivers_status';

export const useDriversStatus = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] = useAxios<
    DataFromApi[]
  >(
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

  const mappedData: DriversData[] = useMemo(
    () =>
      data && !isLoading
        ? data?.map((d) => ({
            model: d.model,
            rtu: d.rtu ? 'Sim' : 'Não',
            tcp: d.tcp ? 'Sim' : 'Não',
            ip: d.ip,
            port: d.port,
            id: d.id,
            rev: d.rev,
            modbusAddress: d.modbus_address,
            timeout: d.timeout,
            status: d.status,
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
