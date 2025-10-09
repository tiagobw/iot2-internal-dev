import { AlertDialog } from '~/components/alert-dialog';
import { Button } from '~/components/button';

import { Card } from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useCheckDriversUpdate } from '~/routes/devices-data/program/use-check-drivers-update';

export type Props = {
  deviceId: number;
};

export function CheckDriversUpdate({ deviceId }: Props) {
  const { callback, data, isLoading } = useCheckDriversUpdate(deviceId);

  return (
    <Card className='flex flex-col items-center w-full p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>Comando</h3>
      </div>
      <div className='flex flex-col gap-2 items-center w-full'>
        <AlertDialog
          title='Confirma a execução do comando?'
          onClick={callback}
          trigger={
            <Button
              className='w-full'
              isLoading={isLoading}
              disabled={isLoading}
            >
              Verificar Atualização de Drivers
            </Button>
          }
        />
      </div>
      <div className='flex flex-col gap-1 items-center w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center border-r'>Modelo</TableHead>
              <TableHead className='text-center border-r'>Rev. Atual</TableHead>
              <TableHead className='text-center border-r'>
                Rev. Dispon.
              </TableHead>
              <TableHead className='text-center'>Atualização?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center border-r'>
                    {item.model}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.currentVersion}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.versionAvailable}
                  </TableCell>
                  <TableCell className='text-center'>
                    {item.needUpdate}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
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
