import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { displayToast } from '~/utils/toast/toast';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '~/components/ui/form';
import { Card } from '~/components/ui/card';
import { Tooltip } from '~/components/tooltip';
import { CloudUpload } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { LoaderCircle } from '~/components/loader-circle';
import { AlertDialog } from '~/components/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import Select, { type SelectOption } from '~/components/select';
import { useSendModbus } from '~/routes/devices-data/program/use-send-modbus';
import { Label } from '~/components/ui/label';

function BitsTable({
  headerData,
  tableData,
}: {
  headerData: string[];
  tableData: string[];
}) {
  return (
    <div className='flex flex-col gap-1 items-center w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            {headerData.map((header) => (
              <TableHead
                key={header}
                className='text-center border-r last:border-0'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.length > 0 ? (
            <TableRow>
              {tableData.map((item) => (
                <TableCell
                  key={item}
                  className='text-center border-r last:border-0'
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={headerData?.length} className='text-center'>
                Não há dados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const SERIAL_MODBUS_COMMAND_OPTIONS: SelectOption[] = [
  { id: '3', value: '3', label: '3' },
  { id: '4', value: '4', label: '4' },
];

const SERIAL_MODBUS_VARIABLE_TYPE_OPTIONS: SelectOption[] = [
  { id: '16 bits', value: '16 bits', label: '16 bits' },
  { id: '32 bits', value: '32 bits', label: '32 bits' },
];

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  serialModbusAddress: z.string().min(1, 'Campo obrigatório'),
  serialModbusCommand: OptionSchema,
  serialModbusInitialAddress: z.string().min(1, 'Campo obrigatório'),
  serialModbusVariableType: OptionSchema,
  serialModbusTimeout: z.string().min(1, 'Campo obrigatório'),
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function SendModbus({ deviceId }: Props) {
  const { data, executeGet } = useSendModbus();
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialModbusAddress: '',
      serialModbusCommand: undefined,
      serialModbusInitialAddress: '',
      serialModbusVariableType: undefined,
      serialModbusTimeout: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const isDisabled = Boolean(!form.formState.isValid) || isSubmitting;

  async function onSubmit(data: FormValues) {
    try {
      const params = {
        device_id: deviceId,
        modbus_address: Number(data.serialModbusAddress),
        function: Number(data.serialModbusCommand?.value),
        address: Number(data.serialModbusInitialAddress),
        variable_type: data.serialModbusVariableType?.value,
        time_out: Number(data.serialModbusTimeout),
      };
      await executeGet({
        params,
      });
      displayToast({
        type: 'success',
        message: 'Comando executado com sucesso.',
      });
    } catch (error) {
      displayToast({ error });
    }
  }

  return (
    <Card className='flex flex-col items-center w-full sm:w-fit p-8'>
      <Form {...form}>
        <form className='flex flex-col items-center w-full gap-6'>
          <div className='flex items-center gap-4'>
            <h3 className='font-bold'>Enviar Comando MODBUS Serial</h3>
            <AlertDialog
              title='Confirma a execução do comando?'
              onClick={() => form.handleSubmit(onSubmit)()}
              trigger={
                <button
                  className={`flex justify-center items-center cursor-pointer disabled:text-gray-300 disabled:pointer-events-none text-blue-600`}
                  disabled={isDisabled}
                  type='button'
                >
                  <Tooltip asChild text='Enviar programação'>
                    {isSubmitting ? <LoaderCircle /> : <CloudUpload />}
                  </Tooltip>
                </button>
              }
            />
          </div>
          <FormField
            control={form.control}
            name='serialModbusAddress'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Endereço MODBUS</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='number'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serialModbusCommand'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Comando</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={SERIAL_MODBUS_COMMAND_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serialModbusInitialAddress'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Endereço Inicial</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='number'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serialModbusVariableType'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Tipo Variável</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={SERIAL_MODBUS_VARIABLE_TYPE_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serialModbusTimeout'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Timeout [ms]</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='number'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-center w-full gap-2'>
            <Label className='w-1/2'>Byes TX</Label>
            <span className='w-1/2'>{data?.bytesTx ?? '-'}</span>
          </div>
          <div className='flex justify-between items-center w-full gap-2'>
            <Label className='w-1/2'>Byes RX</Label>
            <span className='w-1/2'>{data?.bytesRx ?? '-'}</span>
          </div>
          <div className='flex justify-between items-center w-full gap-2'>
            <Label className='w-1/2'>Erro</Label>
            <span className='w-1/2'>{data?.error ?? '-'}</span>
          </div>
          <div className='flex justify-between items-center w-full gap-2'>
            <Label className='w-1/2'>Valor</Label>
            <span className='w-1/2'>{data?.value ?? '-'}</span>
          </div>
          <BitsTable
            headerData={[
              '31',
              '30',
              '29',
              '28',
              '27',
              '26',
              '25',
              '24',
              '23',
              '22',
              '21',
              '20',
              '19',
              '18',
              '17',
              '16',
            ]}
            tableData={data?.bits32to16 ?? []}
          />
          <BitsTable
            headerData={[
              '15',
              '14',
              '13',
              '12',
              '11',
              '10',
              '09',
              '08',
              '07',
              '06',
              '05',
              '04',
              '03',
              '02',
              '01',
              '00',
            ]}
            tableData={data?.bits15to00 ?? []}
          />
        </form>
      </Form>
    </Card>
  );
}
