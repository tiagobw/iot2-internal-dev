import { LogOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/contexts/auth/use-auth';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className='flex justify-center w-full p-4'>
      <Button onClick={logout} variant='outline'>
        <LogOut /> Sair
      </Button>
    </header>
  );
}
