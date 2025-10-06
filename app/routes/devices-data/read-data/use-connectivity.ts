import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  mobile_enabled: boolean;
  mobile_status: string;
  mobile_net: string;
  mobile_apn: string;
  mobile_user: string;
  mobile_password: string;
  mobile_operator: string;
  mobile_iccid: string;
  mobile_technology: string;
  mobile_rssi: string;
  mobile_restored: boolean;
  wifi_enabled: boolean;
  wifi_status: string;
  wifi_ssid: string;
  wifi_password: string;
  wifi_rssi: string;
  wifi_restored: boolean;
};

export type Data = {
  mobileEnabled: string;
  mobileStatus: string;
  mobileNet: string;
  mobileApn: string;
  mobileUser: string;
  mobilePassword: string;
  mobileOperator: string;
  mobileIccid: string;
  mobileTechnology: string;
  mobileRssi: string;
  mobileRestored: string;
  wifiEnabled: string;
  wifiStatus: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiRssi: string;
  wifiRestored: string;
};

const URL = 'alx_cmd_connections';

export const useConnectivity = (deviceId: number | null) => {
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
            mobileEnabled: data.mobile_enabled ? 'Sim' : 'Não',
            mobileStatus: data.mobile_status,
            mobileNet: data.mobile_net,
            mobileApn: data.mobile_apn,
            mobileUser: data.mobile_user,
            mobilePassword: data.mobile_password,
            mobileOperator: data.mobile_operator,
            mobileIccid: data.mobile_iccid,
            mobileTechnology: data.mobile_technology,
            mobileRssi: data.mobile_rssi,
            mobileRestored: data.mobile_restored ? 'Sim' : 'Não',
            wifiEnabled: data.wifi_enabled ? 'Sim' : 'Não',
            wifiStatus: data.wifi_status,
            wifiSsid: data.wifi_ssid,
            wifiPassword: data.wifi_password,
            wifiRssi: data.wifi_rssi,
            wifiRestored: data.wifi_restored ? 'Sim' : 'Não',
          }
        : {
            mobileEnabled: '-',
            mobileStatus: '-',
            mobileNet: '-',
            mobileApn: '-',
            mobileUser: '-',
            mobilePassword: '-',
            mobileOperator: '-',
            mobileIccid: '-',
            mobileTechnology: '-',
            mobileRssi: '-',
            mobileRestored: '-',
            wifiEnabled: '-',
            wifiStatus: '-',
            wifiSsid: '-',
            wifiPassword: '-',
            wifiRssi: '-',
            wifiRestored: '-',
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
