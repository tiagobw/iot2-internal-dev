import { type ColumnDef } from '@tanstack/react-table';
import {
  FileText,
  Trash2,
  TriangleAlert,
  type LucideProps,
} from 'lucide-react';
import { Link } from 'react-router';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { DataTableColumnHeader } from '~/components/table/data-table-column-header';
import type { Data } from '~/routes/devices/use-data';

const iconProps: LucideProps = {
  size: 18,
};

type GetColumns = (executeDelete: Function) => ColumnDef<Data>[];

export const getColumns: GetColumns = (executeDelete) => {
  return [
    {
      id: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const data = row.original;
        const className = data.commFailure
          ? 'text-yellow-600'
          : 'text-gray-300';

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

        if (data.screenType === '-') {
          return <div className='text-center'>-</div>;
        }

        const modelAndSerialId = `${data.model} - ${data.serialId}`;

        return (
          <div className='flex justify-center'>
            <Link
              to={`devices-data/${data.id}/read-data?name=${modelAndSerialId}`}
            >
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
        const data = row.original;

        return (
          <div className='flex justify-center'>
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2
                  className='cursor-pointer text-red-600'
                  {...iconProps}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você tem certeza que deseja excluir {data.model}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => executeDelete(data.id)}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
};
