import { useMemo } from 'react';
import useAxios from 'axios-hooks';

export type DataFromApi = {
  bytes_tx: string | null;
  bytes_rx: string | null;
  error: string | null;
  value: number | null;
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
            bytesTx: data.bytes_tx === null ? '-' : String(data.bytes_tx),
            bytesRx: data.bytes_rx === null ? '-' : String(data.bytes_rx),
            error: data.error === null ? '-' : String(data.error),
            value: data.value === null ? '-' : String(data.value),
            bits32to16: data.bits.slice(0, 16).map((bit) => String(bit)),
            bits15to00: data.bits.slice(16, 32).map((bit) => String(bit)),
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
