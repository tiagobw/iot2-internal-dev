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
import { useEffect } from 'react';
import { Input } from '~/components/ui/input';
import { LoaderCircle } from '~/components/loader-circle';
import { AlertDialog } from '~/components/alert-dialog';
import Select from '~/components/select';
import {
  useProgramIo,
  AI_OPTIONS,
  DI_MASK_OPTIONS,
  ERROR_AI_OPTIONS,
} from '~/routes/devices-data/program/use-program-io';

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  ioTime: z.string().min(1, 'Campo obrigatório'),
  ioDi1Mask: OptionSchema,
  ioDi1Value: z.string().min(1, 'Campo obrigatório'),
  ioDi2Mask: OptionSchema,
  ioDi2Value: z.string().min(1, 'Campo obrigatório'),
  ioEa1Error: OptionSchema,
  ioEa2Error: OptionSchema,
  ioAi1Mask: OptionSchema,
  ioAi1Value: z.string().min(1, 'Campo obrigatório'),
  ioAi2Mask: OptionSchema,
  ioAi2Value: z.string().min(1, 'Campo obrigatório'),
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function ProgramIo({ deviceId }: Props) {
  const { data, isLoading } = useProgramIo(deviceId);
  const { executePost } = usePost('alx_prg_ios_pub');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      ioTime: '',
      ioDi1Mask: DI_MASK_OPTIONS[0],
      ioDi1Value: '',
      ioDi2Mask: DI_MASK_OPTIONS[0],
      ioDi2Value: '',
      ioEa1Error: ERROR_AI_OPTIONS[0],
      ioEa2Error: ERROR_AI_OPTIONS[0],
      ioAi1Mask: AI_OPTIONS[0],
      ioAi1Value: '',
      ioAi2Mask: AI_OPTIONS[0],
      ioAi2Value: '',
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
        time: Number(data.ioTime),
        di_1_mask: Number(data.ioDi1Mask.value),
        di_2_mask: Number(data.ioDi2Mask.value),
        di_1_value: Number(data.ioDi1Value),
        di_2_value: Number(data.ioDi2Value),
        ea_1_error: Number(data.ioEa1Error.value),
        ea_2_error: Number(data.ioEa2Error.value),
        ea_1_mask: Number(data.ioAi1Mask.value),
        ea_2_mask: Number(data.ioAi2Mask.value),
        ea_1_value: Number(data.ioAi1Value),
        ea_2_value: Number(data.ioAi2Value),
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
            <h3 className='font-bold'>Programar Publicação IOs</h3>
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
            name='ioTime'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Tempo [seg.]</FormLabel>
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
            name='ioDi1Mask'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>DI 1</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={DI_MASK_OPTIONS}
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
            name='ioDi1Value'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>DI 1 Valor</FormLabel>
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
            name='ioDi2Mask'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>DI 2</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={DI_MASK_OPTIONS}
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
            name='ioDi2Value'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>DI 2 Valor</FormLabel>
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
            name='ioEa1Error'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Erro em AI 1</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={ERROR_AI_OPTIONS}
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
            name='ioEa2Error'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Erro em AI 2</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={ERROR_AI_OPTIONS}
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
            name='ioAi1Mask'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>AI 1</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={AI_OPTIONS}
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
            name='ioAi1Value'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>AI 1 Valor</FormLabel>
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
            name='ioAi2Mask'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>AI 2</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={AI_OPTIONS}
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
            name='ioAi2Value'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>AI 2 Valor</FormLabel>
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
