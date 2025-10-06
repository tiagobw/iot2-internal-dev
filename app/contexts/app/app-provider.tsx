import { AuthProvider } from '~/contexts/auth/auth-provider';
import { TooltipProvider } from '~/components/ui/tooltip';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  );
};

export { AppProvider };
