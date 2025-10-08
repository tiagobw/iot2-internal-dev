import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

type DataFromApi = {
  label: string;
  value: string;
};

export const useDevices = () => {
  const [{ data, loading, error }] = useAxios<DataFromApi[]>(
    {
      url: 'alx_gateways_list',
    },
    {
      useCache: false,
    },
  );

  const finalData: SelectOption[] = useMemo(
    () =>
      data
        ? data.map((d) => ({
            id: d.value,
            value: String(d.value),
            label: d.label,
          }))
        : [],
    [data],
  );

  return { data: finalData, isLoading: loading, error };
};
