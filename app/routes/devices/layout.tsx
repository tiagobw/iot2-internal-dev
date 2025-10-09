import { Outlet, useNavigate } from 'react-router';

import { getColumns } from './columns';
import { DataTable } from './data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { useData } from '~/routes/devices/use-data';
import { useDelete } from '~/hooks/api/use-delete';

export type OutletContext = Pick<
  ReturnType<typeof useData>,
  'data' | 'executeGet'
>;

export default function Layout() {
  const { executeDelete } = useDelete('');
  const navigate = useNavigate();
  const { data, executeGet, isLoading } = useData();

  const handleDelete = async (id: string | number) => {
    await executeDelete(`devices/${id}`);
    await executeGet();
  };

  const additionalAction = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-2'>
          <span>Adicionar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/add-gateway')}>
          Gateway
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/add-gateway-driver')}>
          Driver do Gateway
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className='flex justify-center p-6'>
      <DataTable
        columns={getColumns(handleDelete)}
        data={data}
        additionalAction={additionalAction}
        isLoading={isLoading}
      />
      <Outlet context={{ data, executeGet }} />
    </div>
  );
}
