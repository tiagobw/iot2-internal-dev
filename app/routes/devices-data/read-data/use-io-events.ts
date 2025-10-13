import { useMemo } from 'react';
import useAxios from 'axios-hooks';
import { useInterval } from '~/hooks/use-interval';

export type DataFromApi = {
  datetime: string;
  event_type: string;
  di_1: boolean;
  di_2: boolean;
  ct_1: number;
  ct_2: number;
  freq_1: number;
  freq_2: number;
  ea_error_1: boolean;
  ea_error_2: boolean;
  ea_1: number;
  ea_2: number;
  do_1: boolean;
  do_2: boolean;
};

export type IoEventsData = {
  datetime: string;
  eventType: string;
  di1: string;
  di2: string;
  ct1: string;
  ct2: string;
  freq1: string;
  freq2: string;
  eaError1: string;
  eaError2: string;
  ea1: string;
  ea2: string;
  do1: string;
  do2: string;
};

const URL = 'alx_cmd_ios_events';
const REFETCH_INTERVAL = 15000;

export const useIoEvents = (deviceId: number | null) => {
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
      manual: false,
      useCache: false,
    },
  );

  useInterval(executeGet, Number(REFETCH_INTERVAL));

  const mappedData: IoEventsData[] = useMemo(
    () =>
      data && !isLoading
        ? data?.map((d) => ({
            datetime: d.datetime,
            eventType: d.event_type,
            di1: d.di_1 ? 'Sim' : 'Não',
            di2: d.di_2 ? 'Sim' : 'Não',
            ct1: String(d.ct_1),
            ct2: String(d.ct_2),
            freq1: String(d.freq_1),
            freq2: String(d.freq_2),
            eaError1: d.ea_error_1 ? 'Sim' : 'Não',
            eaError2: d.ea_error_2 ? 'Sim' : 'Não',
            ea1: String(d.ea_1),
            ea2: String(d.ea_2),
            do1: d.do_1 ? 'Sim' : 'Não',
            do2: d.do_2 ? 'Sim' : 'Não',
          }))
        : [],
    [data, isLoading],
  );

  return {
    data: mappedData,
    isLoading,
    error,
  };
};
