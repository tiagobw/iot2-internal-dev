import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { cn } from '~/lib/utils';
import { Button } from '~/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/contexts/auth/use-auth';
import { displayToast } from '~/utils/toast/toast';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '~/components/ui/form';
import { EyePasswordButton } from '~/components/eye-password-button';

const formSchema = z.object({
  login: z
    .string({ error: 'Login é obrigatório.' })
    .min(1, 'O login deve ter pelo menos 1 caractere.'),
  password: z
    .string({ error: 'Senha é obrigatória.' })
    .min(1, 'A senha deve ter pelo menos 1 caractere.'),
});

export type FormValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { login, isLoading } = useAuth();

  async function onSubmit(data: FormValues) {
    try {
      const body = {
        user: data.login,
        password: data.password,
      };
      await login(body);
    } catch (error) {
      displayToast({ error });
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='flex justify-center'>
          <CardTitle className='text-8xl'>ALX</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-6'
            >
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input placeholder='Digite seu login' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          className='pr-10'
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder='Digite sua senha'
                          {...field}
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
              <Button
                type='submit'
                className='w-full'
                disabled={isLoading}
                isLoading={isLoading}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
