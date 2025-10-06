import { Outlet, useNavigate } from 'react-router';

import { data } from '~/routes/devices/data';
import { columns } from './columns';
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

export default function Layout() {
  const navigate = useNavigate();

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
        <DropdownMenuItem>Dispositivo do Gateway</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className='container p-10'>
      <DataTable
        columns={columns}
        data={data}
        additionalAction={additionalAction}
      />
      <Outlet />
    </div>
  );
}
