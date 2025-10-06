import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

type DataFromApi = {
  driver_id: string | null;
  name: string;
};

export const useDriversList = (deviceId: number | null) => {
  const [{ data, loading, error }] = useAxios<DataFromApi[]>(
    {
      url: 'alx_cmd_drivers_list',
      params: {
        device_id: deviceId,
      },
    },
    {
      useCache: false,
    },
  );

  const finalData: SelectOption[] = useMemo(
    () =>
      data
        ? data.map((d) => ({
            id: d.driver_id === null ? 'all' : String(d.driver_id),
            value: d.driver_id === null ? 'all' : String(d.driver_id),
            label: String(d.name),
          }))
        : [],
    [data],
  );

  return { data: finalData, isLoading: loading, error };
};
