import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  bytes_tx: string;
  bytes_rx: string;
  error: string | null;
  value: number;
  bits: number[];
};

export type Data = {
  bytesTx: string;
  bytesRx: string;
  error: string;
  value: string;
  bits32to16: string[];
  bits15to00: string[];
};

export const useSendModbus = () => {
  const [{ data, loading: isLoading, error }, executeGet] =
    useAxios<DataFromApi>(
      {
        url: 'alx_prg_modbus_command',
      },
      {
        manual: true,
        useCache: false,
      },
    );

  const mappedData: Data | undefined = useMemo(
    () =>
      data
        ? {
            bytesTx: data.bytes_tx,
            bytesRx: data.bytes_rx,
            error: data.error || '-',
            value: data.value.toString(),
            bits32to16: data.bits.slice(0, 16).map((bit) => bit.toString()),
            bits15to00: data.bits.slice(16, 32).map((bit) => bit.toString()),
          }
        : undefined,
    [data],
  );

  return {
    data: mappedData,
    isLoading,
    error,
    executeGet,
  };
};
