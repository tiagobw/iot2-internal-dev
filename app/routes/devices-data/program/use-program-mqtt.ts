import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

export type DataFromApi = {
  enabled: boolean;
  qos: number;
  retain: boolean;
  host: string;
  port: number;
  user: string;
  password: string;
  topic_pub: string;
  topic_sub: string;
};

export type Data = {
  mqttEnabled: boolean;
  mqttQos: SelectOption;
  mqttRetain: boolean;
  mqttHost: string;
  mqttPort: string;
  mqttUser: string;
  mqttPassword: string;
  mqttTopicPub: string;
  mqttTopicSub: string;
};

export const MQTT_QOS_OPTIONS: SelectOption[] = [
  { label: '0', value: '0', id: '0' },
  { label: '1', value: '1', id: '1' },
  { label: '2', value: '2', id: '2' },
];

export const useProgramMqtt = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_mqtt',
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
            mqttEnabled: data.enabled,
            mqttQos:
              MQTT_QOS_OPTIONS.find(
                (option) => option.value === String(data.qos),
              ) || MQTT_QOS_OPTIONS[0],
            mqttRetain: data.retain,
            mqttHost: data.host,
            mqttPort: String(data.port),
            mqttUser: data.user,
            mqttPassword: data.password,
            mqttTopicPub: data.topic_pub,
            mqttTopicSub: data.topic_sub,
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
