import { CloudDownload } from 'lucide-react';

import { Tooltip } from '~/components/tooltip';
import { Card } from '~/components/ui/card';
import { LoaderCircle } from '~/components/loader-circle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import type { DriversData } from '~/routes/devices-data/read-data/use-drivers-status';

type Props = {
  isLoading: boolean;
  headerData: {
    title: string;
    getDataCallback: () => void;
  };
  tableData: DriversData[];
};

export function DriversStatus({ headerData, tableData, isLoading }: Props) {
  return (
    <Card className='flex flex-col items-center w-full p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>{headerData.title}</h3>
        <Tooltip asChild text='Requisitar Dados'>
          <button
            type='button'
            onClick={headerData.getDataCallback}
            disabled={isLoading}
            className={`flex justify-center items-center cursor-pointer disabled:text-gray-300 disabled:pointer-events-none text-blue-600`}
          >
            {isLoading ? <LoaderCircle /> : <CloudDownload />}
          </button>
        </Tooltip>
      </div>
      <div className='flex flex-col gap-1 items-center w-full max-h-56'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center border-r'>ID</TableHead>
              <TableHead className='text-center border-r'>Modelo</TableHead>
              <TableHead className='text-center border-r'>RTU</TableHead>
              <TableHead className='text-center border-r'>TCP</TableHead>
              <TableHead className='text-center border-r'>IP</TableHead>
              <TableHead className='text-center border-r'>Porta</TableHead>
              <TableHead className='text-center border-r'>Revisão</TableHead>
              <TableHead className='text-center border-r'>Endereço</TableHead>
              <TableHead className='text-center border-r'>Time-out</TableHead>
              <TableHead className='text-center'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.length > 0 ? (
              tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='text-center border-r'>
                    {item.id}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.model}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.rtu}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.tcp}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.ip}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.port}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.rev}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.modbusAddress}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.timeout}
                  </TableCell>
                  <TableCell className='text-center'>{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className='text-center'>
                  Não há dados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
