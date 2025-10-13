import { Card } from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import type { IoEventsData } from '~/routes/devices-data/read-data/use-io-events';

type Props = {
  isLoading: boolean;
  headerData: {
    title: string;
  };
  tableData: IoEventsData[];
};

export function IoEvents({ headerData, tableData }: Props) {
  return (
    <Card className='flex flex-col items-center w-full p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>{headerData.title}</h3>
      </div>
      <div className='flex flex-col gap-1 items-center w-full max-h-56'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center border-r'>Data</TableHead>
              <TableHead className='text-center border-r'>
                Tipo Evento
              </TableHead>
              <TableHead className='text-center border-r'>DI 1</TableHead>
              <TableHead className='text-center border-r'>DI 2</TableHead>
              <TableHead className='text-center border-r'>CT 1</TableHead>
              <TableHead className='text-center border-r'>CT 2</TableHead>
              <TableHead className='text-center border-r'>Frq. 1</TableHead>
              <TableHead className='text-center border-r'>Frq. 2</TableHead>
              <TableHead className='text-center border-r'>AI 1</TableHead>
              <TableHead className='text-center border-r'>AI 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.length > 0 ? (
              tableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center border-r'>
                    {item.datetime}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.eventType}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.di1}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.di2}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.ct1}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.ct2}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.freq1}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.freq2}
                  </TableCell>
                  <TableCell className='text-center border-r'>
                    {item.ea1}
                  </TableCell>
                  <TableCell className='text-center'>{item.ea2}</TableCell>
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
