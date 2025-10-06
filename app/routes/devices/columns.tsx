import { type ColumnDef } from '@tanstack/react-table';
import {
  FileText,
  Trash2,
  TriangleAlert,
  type LucideProps,
} from 'lucide-react';
import { Link } from 'react-router';

import { DataTableColumnHeader } from '~/components/table/data-table-column-header';
import type { Data } from '~/routes/devices/use-data';

const iconProps: LucideProps = {
  size: 18,
};

export const columns: ColumnDef<Data>[] = [
  {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const data = row.original;
      const className = data.commFailure ? 'text-yellow-600' : 'text-gray-300';

      return (
        <div className='flex justify-center'>
          <TriangleAlert className={className} {...iconProps} />
        </div>
      );
    },
  },
  {
    accessorKey: 'isEnabled',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Habilitado' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-center'>
          {row.getValue('isEnabled') ? 'Sim' : 'Não'}
        </div>
      );
    },
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modelo' />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('model')}</div>;
    },
  },
  {
    accessorKey: 'lastComm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Última Comunicação' />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('lastComm')}</div>;
    },
  },
  {
    accessorKey: 'serialId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Número de Série' />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('serialId')}</div>;
    },
  },
  {
    id: 'data',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dados' />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className='flex justify-center'>
          <Link to={`devices-data/${data.id}/read-data`}>
            <FileText className='cursor-pointer' {...iconProps} />
          </Link>
        </div>
      );
    },
  },
  {
    id: 'delete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Excluir' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex justify-center'>
          <Trash2 className='cursor-pointer text-red-600' {...iconProps} />
        </div>
      );
    },
  },
];
