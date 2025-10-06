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
import { AlertDialog } from '~/components/alert-dialog';
import { LoaderCircle } from '~/components/loader-circle';
import { useDriversList } from '~/routes/devices-data/read-data/use-drivers-list';
import Select from '~/components/select';

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  driver: OptionSchema,
});

export type FormValues = z.infer<typeof formSchema>;

export type PublishDriversProps = {
  deviceId: number;
};

export function PublishDrivers({ deviceId }: PublishDriversProps) {
  const { data: driversList, isLoading: isLoadingDriversList } =
    useDriversList(deviceId);
  const { executePost } = usePost('alx_cmd_driver_data_pub');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        device_id: deviceId,
        driver_id: data.driver.id === 'all' ? null : Number(data.driver.id),
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
            <h3 className='font-bold'>Publicar dados do(s) driver(s)</h3>
            <AlertDialog
              title='Confirma a execução do comando?'
              onClick={() => form.handleSubmit(onSubmit)()}
              trigger={
                <button
                  className={`flex justify-center items-center cursor-pointer disabled:text-gray-300 disabled:pointer-events-none text-blue-600`}
                  disabled={Boolean(!form.formState.isValid) || isSubmitting}
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
            name='driver'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Lista de Drivers</FormLabel>
                <FormControl>
                  <Select
                    id={field.name}
                    name={field.name}
                    options={driversList}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Selecione'
                    isLoading={isLoadingDriversList}
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
