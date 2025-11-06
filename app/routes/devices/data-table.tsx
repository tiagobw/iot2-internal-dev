import * as React from 'react';
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Input } from '~/components/ui/input';
import { DataTablePagination } from '~/components/table/data-table-pagination';
import { LoaderCircle } from '~/components/loader-circle';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  additionalAction?: React.ReactNode;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  additionalAction,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full lg:max-w-[70vw]'>
      <div className='flex items-center gap-4 pb-4'>
        <Input
          placeholder='Filtrar'
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className='max-w-sm'
        />
        <div className='ml-auto'>{additionalAction}</div>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex justify-center'>
                    <LoaderCircle />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows?.length > 0 && (
        <div className='flex items-center justify-center sm:justify-end space-x-2 py-4'>
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
