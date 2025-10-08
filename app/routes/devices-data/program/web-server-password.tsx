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
import { Input } from '~/components/ui/input';
import { AlertDialog } from '~/components/alert-dialog';
import { useState } from 'react';
import { EyePasswordButton } from '~/components/eye-password-button';
import { LoaderCircle } from '~/components/loader-circle';

const formSchema = z.object({
  password: z
    .string({ error: 'Senha é obrigatória.' })
    .min(1, 'A senha deve ter pelo menos 1 caractere.'),
});

export type FormValues = z.infer<typeof formSchema>;

export type WebServerPasswordProps = {
  deviceId: number;
};

export function WebServerPassword({ deviceId }: WebServerPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { executePost } = usePost('st01_gtw_password_prog');
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        device_id: deviceId,
        password: data.password,
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
            <h3 className='font-bold'>Senha Web Server</h3>
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
            name='password'
            render={({ field }) => (
              <FormItem className='flex justify-between items-center w-full gap-2'>
                <FormLabel className='w-1/2'>Senha</FormLabel>
                <div className='relative w-1/2'>
                  <FormControl>
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      className='pr-10'
                      {...field}
                      disabled={isSubmitting}
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
