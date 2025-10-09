import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

export type DataFromApi = {
  time: number;
  di_1_mask: number;
  di_2_mask: number;
  di_1_value: number;
  di_2_value: number;
  ea_1_error: number;
  ea_2_error: number;
  ea_1_mask: number;
  ea_2_mask: number;
  ea_1_value: number;
  ea_2_value: number;
};

export type Data = {
  ioTime: string;
  ioDi1Mask: SelectOption;
  ioDi1Value: string;
  ioDi2Mask: SelectOption;
  ioDi2Value: string;
  ioEai1Error: SelectOption;
  ioEai2Error: SelectOption;
  ioAi1Mask: SelectOption;
  ioAi1Value: string;
  ioAi2Mask: SelectOption;
  ioAi2Value: string;
};

export const DI_MASK_OPTIONS: SelectOption[] = [
  { label: 'Nenhum', value: '0', id: '0' },
  { label: 'Transição', value: '1', id: '1' },
  { label: 'Contador', value: '2', id: '2' },
  { label: 'Frequência', value: '3', id: '3' },
];

export const ERROR_AI_OPTIONS: SelectOption[] = [
  { label: 'Nenhum', value: '0', id: '0' },
  { label: 'Habilitado', value: '1', id: '1' },
];

export const AI_OPTIONS: SelectOption[] = [
  { label: 'Nenhum', value: '0', id: '0' },
  { label: 'Habilitado', value: '1', id: '1' },
];

export const useProgramIo = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_ios_pub',
        params: { device_id: deviceId },
      },
      {
        manual: !deviceId,
        useCache: false,
      },
    );

  const mappedData: Data | undefined = useMemo(
    () =>
      data
        ? {
            ioTime: String(data.time),
            ioDi1Mask:
              DI_MASK_OPTIONS.find(
                (option) => option.value === String(data.di_1_mask),
              ) || DI_MASK_OPTIONS[0],
            ioDi1Value: String(data.di_1_value),
            ioDi2Mask:
              DI_MASK_OPTIONS.find(
                (option) => option.value === String(data.di_2_mask),
              ) || DI_MASK_OPTIONS[0],
            ioDi2Value: String(data.di_2_value),
            ioEai1Error:
              ERROR_AI_OPTIONS.find(
                (option) => option.value === String(data.ea_1_error),
              ) || ERROR_AI_OPTIONS[0],
            ioEai2Error:
              ERROR_AI_OPTIONS.find(
                (option) => option.value === String(data.ea_2_error),
              ) || ERROR_AI_OPTIONS[0],
            ioAi1Mask:
              AI_OPTIONS.find(
                (option) => option.value === String(data.ea_1_mask),
              ) || AI_OPTIONS[0],
            ioAi1Value: String(data.ea_1_value),
            ioAi2Mask:
              AI_OPTIONS.find(
                (option) => option.value === String(data.ea_2_mask),
              ) || AI_OPTIONS[0],
            ioAi2Value: String(data.ea_2_value),
          }
        : undefined,
    [data],
  );

  return {
    data: mappedData,
    isLoading,
    error,
  };
};
