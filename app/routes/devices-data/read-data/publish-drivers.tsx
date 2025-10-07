import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { CloudDownload } from 'lucide-react';
import { LoaderCircle } from '~/components/loader-circle';
import { useDriversList } from '~/routes/devices-data/read-data/use-drivers-list';
import Select from '~/components/select';
import { usePublishDrivers } from '~/routes/devices-data/read-data/use-publish-drivers';

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
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const { data: driversList, isLoading: isLoadingDriversList } =
    useDriversList(deviceId);
  const { callback, isLoading: isLoadingPublishDrivers } = usePublishDrivers(
    deviceId,
    form.watch('driver')?.id === 'all'
      ? null
      : Number(form.watch('driver')?.id),
  );

  return (
    <Card className='flex flex-col items-center w-full sm:w-100 p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>Publicar dados do(s) driver(s)</h3>
        <Tooltip asChild text='Requisitar Dados'>
          <button
            type='button'
            onClick={callback}
            disabled={
              isLoadingDriversList ||
              isLoadingPublishDrivers ||
              !form.watch('driver')
            }
            className={`flex justify-center items-center cursor-pointer disabled:text-gray-300 disabled:pointer-events-none text-blue-600`}
          >
            {isLoadingPublishDrivers ? <LoaderCircle /> : <CloudDownload />}
          </button>
        </Tooltip>
      </div>
      <Form {...form}>
        <form className='flex flex-col items-center w-full gap-6'>
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
                    isDisabled={isLoadingDriversList || isLoadingPublishDrivers}
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
