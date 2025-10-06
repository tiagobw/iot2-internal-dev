import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Select from '~/components/select';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const formSchema = z.object({
  device: z.object({
    id: z.string(),
    value: z.string(),
    label: z.string(),
  }),
  serialNumber: z.string().min(1, {
    message: 'O número de série deve ter pelo menos 1 caractere.',
  }),
});

export function GatewayForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col h-full gap-4 p-4'
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
                  options={[
                    { id: 'opcao1', label: 'Opção 1', value: 'opcao1' },
                    { id: 'opcao2', label: 'Opção 2', value: 'opcao2' },
                    { id: 'opcao3', label: 'Opção 3', value: 'opcao3' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
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
                <Input placeholder='Digite' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-auto w-full' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
