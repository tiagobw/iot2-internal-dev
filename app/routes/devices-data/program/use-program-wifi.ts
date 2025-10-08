import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  enabled: boolean;
  ssid: string;
  password: string;
};

export type Data = {
  wifiEnabled: boolean;
  wifiSsid: string;
  wifiPassword: string;
};

export const useProgramWifi = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_wifi',
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
            wifiEnabled: Boolean(data.enabled),
            wifiSsid: data.ssid ?? '',
            wifiPassword: data.password ?? '',
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
