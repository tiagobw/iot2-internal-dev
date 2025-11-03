import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import { useAuth } from '~/contexts/auth/use-auth';

type DataFromApi = {
  id: number;
  model: string;
  driver: string | null;
  serial_id: string;
  enabled: boolean;
  last_comm: string | null;
  comm_failure: boolean | null;
  screen_type: string | null;
  gateway: boolean;
};

export type Data = {
  id: number;
  model: string;
  driver: string;
  serialId: string;
  isEnabled: boolean;
  lastComm: string;
  commFailure: boolean;
  screenType: string;
  gateway: boolean;
};

export const useData = () => {
  const { companyId } = useAuth();
  const [{ data, loading, error }, executeGet] = useAxios<DataFromApi[]>(
    {
      url: 'devices_list',
      params: {
        company_id: companyId,
      },
    },
    {
      useCache: false,
    },
  );

  const mappedData: Data[] = useMemo(
    () =>
      data
        ? data?.map((item) => ({
            id: item.id,
            model: item.model,
            driver: item.driver ?? '-',
            serialId: item.serial_id,
            isEnabled: item.enabled,
            lastComm: item.last_comm ?? '-',
            commFailure: item.comm_failure ?? false,
            screenType: item.screen_type ?? '-',
            gateway: item.gateway,
          }))
        : [],
    [data],
  );

  return {
    data: mappedData,
    isLoading: loading,
    error,
    executeGet,
  };
};
