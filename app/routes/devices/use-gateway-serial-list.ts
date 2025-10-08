import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

type DataFromApi = {
  serial: string;
};

export const useGatewaySerialList = () => {
  const [{ data, loading, error }] = useAxios<DataFromApi[]>(
    {
      url: 'alx_gateways_serial_list',
    },
    {
      useCache: false,
    },
  );

  const finalData: SelectOption[] = useMemo(
    () =>
      data
        ? data.map((d) => ({
            id: d.serial,
            value: String(d.serial),
            label: d.serial,
          }))
        : [],
    [data],
  );

  return { data: finalData, isLoading: loading, error };
};
