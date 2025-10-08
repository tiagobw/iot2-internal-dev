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
import { LoaderCircle } from '~/components/loader-circle';
import { AlertDialog } from '~/components/alert-dialog';
import Select, { type SelectOption } from '~/components/select';

const RESET_COUNTERS_OPTIONS: SelectOption[] = [
  { id: 'false', value: 'false', label: 'Não zerar' },
  { id: 'true', value: 'true', label: 'Zerar' },
];

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  counter1: OptionSchema,
  counter2: OptionSchema,
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function ResetCounters({ deviceId }: Props) {
  const { executePost } = usePost('alx_prg_ct_cpu');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      counter1: undefined,
      counter2: undefined,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const isDisabled = Boolean(!form.formState.isValid) || isSubmitting;

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        device_id: deviceId,
        ct_1: data.counter1?.value === 'true',
        ct_2: data.counter2?.value === 'true',
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
            <h3 className='font-bold'>Zerar Contadores</h3>
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
            name='counter1'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Contador 1</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RESET_COUNTERS_OPTIONS}
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
            name='counter2'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Contador 2</FormLabel>
                <FormControl className='w-1/2'>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={RESET_COUNTERS_OPTIONS}
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
        </form>
      </Form>
    </Card>
  );
}
