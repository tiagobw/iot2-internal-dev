import { useContext } from 'react';
import { AuthContext, type AuthContextType } from './auth-provider';

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };
