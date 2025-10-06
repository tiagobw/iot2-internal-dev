import useAxios from 'axios-hooks';

import { useIsLoading } from '~/hooks/use-is-loading';

export const usePost = <T>(url: string) => {
  const [{ data, loading, error }, executePost] = useAxios<T>(
    {
      url,
      method: 'POST',
    },
    { manual: true },
  );
  const isLoading = useIsLoading(loading);

  return {
    data,
    executePost,
    isLoadingPost: isLoading,
    errorPost: error,
  };
};
