import { useEffect } from 'react';
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
import { Switch } from '~/components/ui/switch';
import { AlertDialog } from '~/components/alert-dialog';
import { useProgramOta } from '~/routes/devices-data/program/use-program-ota';
import { Input } from '~/components/ui/input';

const formSchema = z.object({
  otaEnabled: z.boolean(),
  otaTime: z.string().min(1, 'Campo obrigatório'),
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function ProgramOta({ deviceId }: Props) {
  const { data, isLoading } = useProgramOta(deviceId);
  const { executePost } = usePost('alx_prg_ota');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      otaEnabled: true,
      otaTime: '12:00',
    },
  });
  const isEnabled = form.watch('otaEnabled');
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
        enabled: data.otaEnabled,
        time: data.otaTime,
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
            <h3 className='font-bold'>Programar OTA</h3>
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
            name='otaEnabled'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Habilitado</FormLabel>
                <FormControl className='mr-auto'>
                  <Switch
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='otaTime'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Horário</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                    type='time'
                    id={field.name}
                    {...field}
                    disabled={!isEnabled || isLoading || isSubmitting}
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
