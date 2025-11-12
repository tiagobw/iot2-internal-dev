import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate, useOutletContext } from 'react-router';

import type { OutletContext } from './layout';
import Select from '~/components/select';
import { Input } from '~/components/ui/input';
import { useDevices } from '~/routes/devices/use-devices';
import { usePost } from '~/hooks/api/use-post';
import { useIsLoading } from '~/hooks/use-is-loading';
import { displayToast } from '~/utils/toast/toast';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '~/components/ui/form';
import { Button } from '~/components/button';
import { useAuth } from '~/contexts/auth/use-auth';

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  device: OptionSchema,
  serialNumber: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function GatewayForm() {
  const { companyId } = useAuth();
  const { executeGet } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const { data: devicesList, isLoading: isLoadingDevicesList } = useDevices();
  const { executePost } = usePost('devices');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      device: undefined,
      serialNumber: '',
    },
  });
  const isLoading = useIsLoading(form.formState.isSubmitting);

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        serial_id: data.serialNumber,
        value: data.device.value,
        company_id: companyId,
      };
      await executePost({
        data: body,
      });
      await executeGet();
      navigate('/');
    } catch (error) {
      displayToast({
        error,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-3 p-4'
      >
        <FormField
          control={form.control}
          name='device'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dispositivo</FormLabel>
              <FormControl>
                <Select
                  id={field.name}
                  name={field.name}
                  options={devicesList}
                  value={field.value}
                  onChange={field.onChange}
                  isLoading={isLoadingDevicesList}
                  placeholder='Selecione'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='serialNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Série</FormLabel>
              <FormControl>
                <Input id='serialNumber' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='w-full'
          type='submit'
          disabled={!form.formState.isValid}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
