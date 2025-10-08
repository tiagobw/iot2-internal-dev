import { useMemo } from 'react';
import useAxios from 'axios-hooks';

import type { SelectOption } from '~/components/select';

export type DataFromApi = {
  baud_rate: number;
  data_bits: number;
  stop_bits: number;
  modbus_address: number;
  intra_frames: number;
  parity: string;
};

export type Data = {
  rsBaudRate: SelectOption;
  rsDataBits: SelectOption;
  rsStopBits: SelectOption;
  rsParity: SelectOption;
  rsModbusAddress: string;
  rsIntraFrames: string;
};

export const RS_SPEED_OPTIONS: SelectOption[] = [
  { label: '300', value: '300', id: '300' },
  { label: '600', value: '600', id: '600' },
  { label: '1200', value: '1200', id: '1200' },
  { label: '1800', value: '1800', id: '1800' },
  { label: '2400', value: '2400', id: '2400' },
  { label: '3600', value: '3600', id: '3600' },
  { label: '4800', value: '4800', id: '4800' },
  { label: '7200', value: '7200', id: '7200' },
  { label: '9600', value: '9600', id: '9600' },
  { label: '14400', value: '14400', id: '14400' },
  { label: '19200', value: '19200', id: '19200' },
  { label: '28800', value: '28800', id: '28800' },
  { label: '38400', value: '38400', id: '38400' },
  { label: '57600', value: '57600', id: '57600' },
  { label: '115200', value: '115200', id: '115200' },
  { label: '230400', value: '230400', id: '230400' },
];

export const RS_DATA_BITS_OPTIONS: SelectOption[] = [
  { label: '7', value: '7', id: '7' },
  { label: '8', value: '8', id: '8' },
];

export const RS_STOP_BITS_OPTIONS: SelectOption[] = [
  { label: '1', value: '1', id: '1' },
  { label: '1.5', value: '1.5', id: '1.5' },
  { label: '2', value: '2', id: '2' },
];

export const RS_PARITY_OPTIONS: SelectOption[] = [
  { label: 'Nenhuma', value: '0', id: '0' },
  { label: 'Impar', value: '1', id: '1' },
  { label: 'Par', value: '2', id: '2' },
];

export const useProgramRs = (deviceId: number | null) => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_serial',
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
            rsBaudRate:
              RS_SPEED_OPTIONS.find(
                (option) => option.value === String(data.baud_rate),
              ) || RS_SPEED_OPTIONS[0],
            rsDataBits:
              RS_DATA_BITS_OPTIONS.find(
                (option) => option.value === String(data.data_bits),
              ) || RS_DATA_BITS_OPTIONS[0],
            rsStopBits:
              RS_STOP_BITS_OPTIONS.find(
                (option) => option.value === String(data.stop_bits),
              ) || RS_STOP_BITS_OPTIONS[0],
            rsParity:
              RS_PARITY_OPTIONS.find(
                (option) => option.value === String(data.parity),
              ) || RS_PARITY_OPTIONS[0],
            rsModbusAddress: String(data.modbus_address),
            rsIntraFrames: String(data.intra_frames),
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
