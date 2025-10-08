import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  enabled: boolean;
  apn: string;
  user: string;
  password: string;
};

export type Data = {
  mobileEnabled: boolean;
  mobileApn: string;
  mobileUser: string;
  mobilePassword: string;
};

export const useProgramMobile = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_mobile',
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
            mobileEnabled: Boolean(data.enabled),
            mobileApn: data.apn ?? '',
            mobileUser: data.user ?? '',
            mobilePassword: data.password ?? '',
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
