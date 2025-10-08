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
import { useProgramMobile } from '~/routes/devices-data/program/use-program-mobile';
import { useEffect, useState } from 'react';
import { Input } from '~/components/ui/input';
import { LoaderCircle } from '~/components/loader-circle';
import { Switch } from '~/components/ui/switch';
import { EyePasswordButton } from '~/components/eye-password-button';
import { AlertDialog } from '~/components/alert-dialog';

const formSchema = z.object({
  mobileEnabled: z.boolean(),
  mobileApn: z.string().min(1, 'Campo obrigatório'),
  mobileUser: z.string().min(1, 'Campo obrigatório'),
  mobilePassword: z.string().min(1, 'Campo obrigatório'),
});

export type FormValues = z.infer<typeof formSchema>;

export type Props = {
  deviceId: number;
};

export function ProgramMobile({ deviceId }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { data, isLoading } = useProgramMobile(deviceId);
  const { executePost } = usePost('alx_prg_mobile');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileEnabled: true,
      mobileApn: '',
      mobileUser: '',
      mobilePassword: '',
    },
  });
  const isEnabled = form.watch('mobileEnabled');
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
        enabled: data.mobileEnabled,
        apn: data.mobileApn,
        user: data.mobileUser,
        password: data.mobilePassword,
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
            <h3 className='font-bold'>Programar Mobile</h3>
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
            name='mobileEnabled'
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
            name='mobileApn'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>APN</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='text'
                    {...field}
                    disabled={!isEnabled || isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mobileUser'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Usuário</FormLabel>
                <FormControl className='w-1/2'>
                  <Input
                    id={field.name}
                    type='text'
                    {...field}
                    disabled={!isEnabled || isLoading || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mobilePassword'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Senha</FormLabel>
                <div className='relative w-1/2'>
                  <FormControl>
                    <Input
                      id={field.name}
                      type={isPasswordVisible ? 'text' : 'password'}
                      className='pr-10'
                      {...field}
                      disabled={!isEnabled || isLoading || isSubmitting}
                    />
                  </FormControl>
                  <EyePasswordButton
                    isPasswordVisible={isPasswordVisible}
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
}
