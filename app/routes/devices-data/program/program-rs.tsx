import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePost } from '~/hooks/api/use-post';
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
import {
  RS_DATA_BITS_OPTIONS,
  RS_PARITY_OPTIONS,
  RS_SPEED_OPTIONS,
  RS_STOP_BITS_OPTIONS,
  useProgramRs,
} from '~/routes/devices-data/program/use-program-rs';
import { useEffect } from 'react';
import { Input } from '~/components/ui/input';
import { LoaderCircle } from '~/components/loader-circle';
import { AlertDialog } from '~/components/alert-dialog';
import Select from '~/components/select';

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  rsBaudRate: OptionSchema,
  rsDataBits: OptionSchema,
  rsStopBits: OptionSchema,
  rsParity: OptionSchema,
  rsModbusAddress: z.string().min(1, 'Campo obrigatório'),
  rsIntraFrames: z.string().min(1, 'Campo obrigatório'),
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function ProgramRs({ deviceId }: Props) {
  const { data, isLoading } = useProgramRs(deviceId);
  const { executePost } = usePost('alx_prg_serial');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      rsBaudRate: RS_SPEED_OPTIONS[8],
      rsDataBits: RS_DATA_BITS_OPTIONS[1],
      rsStopBits: RS_STOP_BITS_OPTIONS[0],
      rsParity: RS_PARITY_OPTIONS[0],
      rsModbusAddress: '1',
      rsIntraFrames: '100',
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const isDisabled =
    Boolean(!form.formState.isValid) || isLoading || isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        device_id: deviceId,
        baud_rate: Number(data.rsBaudRate.value),
        data_bits: Number(data.rsDataBits.value),
        parity: Number(data.rsParity.value),
        stop_bits: Number(data.rsStopBits.value),
        intra_frames: Number(data.rsIntraFrames),
        modbus_address: Number(data.rsModbusAddress),
      };
      await executePost({
        data: body,
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
    <Card className='flex flex-col items-center w-full sm:w-100 p-8'>
      <Form {...form}>
        <form className='flex flex-col items-center w-full gap-6'>
          <div className='flex items-center gap-4'>
            <h3 className='font-bold'>Programar RS-232/RS-485</h3>
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
            name='rsBaudRate'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Velocidade</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RS_SPEED_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rsDataBits'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Bits de Dados</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RS_DATA_BITS_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rsStopBits'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Stop Bits</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RS_STOP_BITS_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rsParity'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Paridade</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RS_PARITY_OPTIONS}
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isDisabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rsModbusAddress'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Endereço</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='number'
                    {...field}
                    disabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rsIntraFrames'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Intra Frames</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='number'
                    {...field}
                    disabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
}
