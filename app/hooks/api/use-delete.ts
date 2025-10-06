import useAxios from 'axios-hooks';

import { useIsLoading } from '~/hooks/use-is-loading';

export const useDelete = <T>(url: string) => {
  const [{ data: dataFromDelete, loading, error }, executeDelete] = useAxios<T>(
    {
      url,
      method: 'DELETE',
    },
    { manual: true },
  );
  const isLoading = useIsLoading(loading);

  return {
    data: dataFromDelete,
    executeDelete,
    isLoadingDelete: isLoading,
    errorDelete: error,
  };
};
