import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  enabled: boolean;
  qos: string;
  retain: boolean;
  status: string;
  host: string;
  port: string;
  user: string;
  password: string;
  topic_pub: string;
  topic_sub: string;
  restored: boolean;
};

export type Data = {
  enabled: string;
  qos: string;
  retain: string;
  status: string;
  host: string;
  port: string;
  user: string;
  password: string;
  topic_pub: string;
  topic_sub: string;
  restored: string;
};

const URL = 'alx_cmd_mqtt';

export const useMqttStatus = (deviceId: number | null) => {
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
            qos: data.qos,
            retain: data.retain ? 'Sim' : 'Não',
            status: data.status,
            host: data.host,
            port: data.port,
            user: data.user,
            password: data.password,
            topic_pub: data.topic_pub,
            topic_sub: data.topic_sub,
            restored: data.restored ? 'Sim' : 'Não',
          }
        : {
            enabled: '-',
            qos: '-',
            retain: '-',
            status: '-',
            host: '-',
            port: '-',
            user: '-',
            password: '-',
            topic_pub: '-',
            topic_sub: '-',
            restored: '-',
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
