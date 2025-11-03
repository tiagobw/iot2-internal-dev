import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate, useOutletContext } from 'react-router';

import type { OutletContext } from './layout';
import Select from '~/components/select';
import { Input } from '~/components/ui/input';
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
import { useDrivers } from '~/routes/devices/use-drivers';
import { useGatewaySerialList } from '~/routes/devices/use-gateway-serial-list';
import { useAuth } from '~/contexts/auth/use-auth';

const OptionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.string(),
  label: z.string(),
});

const formSchema = z.object({
  device: OptionSchema,
  gatewaySerialNumber: OptionSchema,
  modbusAddress: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
  timeout: z.string().min(1, {
    message: 'Campo obrigatório.',
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function GatewayDriverForm() {
  const { companyId } = useAuth();
  const { executeGet } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const { data: devicesList, isLoading: isLoadingDevicesList } = useDrivers();
  const { data: gatewaySerialList, isLoading: isLoadingGatewaySerialList } =
    useGatewaySerialList();
  const { executePost } = usePost('drivers');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      device: undefined,
      gatewaySerialNumber: undefined,
      modbusAddress: '',
      timeout: '',
    },
  });
  const isLoading = useIsLoading(form.formState.isSubmitting);

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        model: data.device.label,
        serial_id: data.gatewaySerialNumber.value,
        json_file: data.device.value,
        modbus_address: Number(data.modbusAddress),
        time_out: Number(data.timeout),
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
          name='gatewaySerialNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway Serial Number</FormLabel>
              <FormControl>
                <Select
                  id={field.name}
                  name={field.name}
                  options={gatewaySerialList}
                  value={field.value}
                  onChange={field.onChange}
                  isLoading={isLoadingGatewaySerialList}
                  placeholder='Selecione'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='modbusAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço Modbus</FormLabel>
              <FormControl>
                <Input id='modbusAddress' type='number' max={255} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='timeout'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timeout</FormLabel>
              <FormControl>
                <Input id='timeout' type='number' {...field} />
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
