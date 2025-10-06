import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';

import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

export type DataFromApi = {
  model: string;
  ram: string;
  firmware: string;
  spiffs_usage: string;
  spiffs_size: string;
  spiffs_percentage: string;
  current_date: string;
  current_time: string;
  eeprom_status: string;
  spiffs_status: string;
  wifi_status: string;
  mobile_status: string;
  gps_status: string;
};

export type Data = {
  model: string;
  ram: string;
  firmware: string;
  spiffsUsage: string;
  spiffsSize: string;
  spiffsPercentage: string;
  currentDate: string;
  currentTime: string;
  eepromStatus: string;
  spiffsStatus: string;
  wifiStatus: string;
  mobileStatus: string;
  gpsStatus: string;
};

const URL = 'alx_cmd_gateway_status';

export const useGatewayStatus = (deviceId: number | null) => {
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
            model: data.model,
            ram: data.ram,
            firmware: data.firmware,
            spiffsUsage: data.spiffs_usage,
            spiffsSize: data.spiffs_size,
            spiffsPercentage: data.spiffs_percentage,
            currentDate: data.current_date,
            currentTime: data.current_time,
            eepromStatus: data.eeprom_status,
            spiffsStatus: data.spiffs_status,
            wifiStatus: data.wifi_status,
            mobileStatus: data.mobile_status,
            gpsStatus: data.gps_status,
          }
        : {
            model: '-',
            ram: '-',
            firmware: '-',
            spiffsUsage: '-',
            spiffsSize: '-',
            spiffsPercentage: '-',
            currentDate: '-',
            currentTime: '-',
            eepromStatus: '-',
            spiffsStatus: '-',
            wifiStatus: '-',
            mobileStatus: '-',
            gpsStatus: '-',
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
