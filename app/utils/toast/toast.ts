import { toast } from 'sonner';

type Props = {
  type?: 'error' | 'warning' | 'success';
  message?: string;
  error?: any;
};

const statusCodesWithServerMessage = [405, 406, 408, 409];

export const displayToast = ({ type, error, message }: Props) => {
  if (error && type !== 'success') {
    if (statusCodesWithServerMessage.includes(error?.response?.status)) {
      return toastWarningMessage(error?.response?.data?.Message);
    }
    return toastErrorMessage(error?.response?.data?.Message);
  }
  if (type === 'warning') {
    return toastWarningMessage(message ?? 'Ocorreu um problema.');
  }
  if (type === 'error') {
    return toastErrorMessage(message ?? 'Ocorreu um erro inesperado.');
  }
  return toastSuccessMessage(message ?? 'Operação realizada com sucesso!');
};

const toastErrorMessage = (message?: string) => {
  const errorMessage = message || 'Ocorreu um erro inesperado.';
  toast.error(errorMessage, { className: 'bg-red-500!' });
};

const toastWarningMessage = (message?: string) => {
  const warningMessage = message || 'Ocorreu um problema.';
  toast.warning(warningMessage, { className: 'bg-yellow-500!' });
};

const toastSuccessMessage = (text: string) => {
  toast.success(text, { className: 'bg-green-500!' });
};
