import useAxios from 'axios-hooks';

import { useIsLoading } from '~/hooks/use-is-loading';

export const usePut = <T>(url: string) => {
  const [{ data, loading, error }, executePut] = useAxios<T>(
    {
      url,
      method: 'PUT',
    },
    { manual: true },
  );
  const isLoading = useIsLoading(loading);

  return {
    data,
    executePut,
    isLoadingPut: isLoading,
    errorPut: error,
  };
};
