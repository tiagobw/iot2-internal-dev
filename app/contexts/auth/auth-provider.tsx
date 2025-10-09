import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import useAxios from 'axios-hooks';

import { ejectInterceptors, setupInterceptors } from '~/lib/axios';

const IS_LOGGED_IN_KEY = 'isLoggedIn';

export type LoginCredentials = {
  user: string;
  password: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem(IS_LOGGED_IN_KEY) || 'false'),
  );

  const [{ loading: loginLoading }, executeLogin] = useAxios<
    void,
    LoginCredentials
  >(
    {
      url: 'login',
      method: 'POST',
    },
    { manual: true },
  );

  const [{ loading: logoutLoading }, executeLogout] = useAxios(
    {
      url: 'logout',
      method: 'POST',
    },
    { manual: true },
  );

  const logout = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      await executeLogout();
    } catch (error) {
      console.error(
        'Logout request failed, but clearing session locally.',
        error,
      );
    } finally {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, executeLogout]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      try {
        await executeLogin({ data: credentials });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        throw error;
      }
    },
    [executeLogin],
  );

  useEffect(() => {
    localStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const interceptorId = setupInterceptors(logout);

    return () => {
      ejectInterceptors(interceptorId);
    };
  }, [logout]);

  const value: AuthContextType = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      isLoading: loginLoading || logoutLoading,
    }),
    [isLoggedIn, login, loginLoading, logout, logoutLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
