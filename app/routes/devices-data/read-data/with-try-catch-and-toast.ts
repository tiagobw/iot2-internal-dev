import type { AxiosPromise } from 'axios';

import { displayToast } from '~/utils/toast/toast';

type AsyncCallback = () => AxiosPromise<any>;

export const withTryCatchAndToast = async (asyncCallback: AsyncCallback) => {
  try {
    await asyncCallback();
    displayToast({
      type: 'success',
      message: 'Comando executado com sucesso.',
    });
  } catch (error) {
    displayToast({
      error,
    });
  }
};
