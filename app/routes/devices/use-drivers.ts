import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

type DataFromApi = {
  model: string;
  json_file: string;
};

export const useDrivers = () => {
  const [{ data, loading, error }] = useAxios<DataFromApi[]>(
    {
      url: 'alx_drivers_list',
    },
    {
      useCache: false,
    },
  );

  const finalData: SelectOption[] = useMemo(
    () =>
      data
        ? data.map((d) => ({
            id: d.json_file,
            value: String(d.json_file),
            label: d.model,
          }))
        : [],
    [data],
  );

  return { data: finalData, isLoading: loading, error };
};
