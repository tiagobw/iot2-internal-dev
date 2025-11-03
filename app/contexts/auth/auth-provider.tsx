import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import useAxios from 'axios-hooks';

import { setOnUnauthorizedCallback } from '~/lib/axios';

const IS_LOGGED_IN_KEY = 'isLoggedIn';

export type LoginCredentials = {
  user: string;
  password: string;
};

export type AuthContextType = {
  userId: number;
  companyId: number;
  isLoggedIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem(IS_LOGGED_IN_KEY) || 'false'),
  );

  const [{ loading: loginLoading }, executeLogin] = useAxios<
    { user_id: number; company_id: number },
    LoginCredentials
  >(
    {
      url: 'login',
      method: 'POST',
    },
    { manual: true },
  );

  const logout = useCallback(async () => {
    const currentlyLoggedIn = JSON.parse(
      localStorage.getItem(IS_LOGGED_IN_KEY) || 'false',
    );
    if (!currentlyLoggedIn) return;

    setIsLoggedIn(false);
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      try {
        const { data } = await executeLogin({ data: credentials });
        setUserId(data?.user_id);
        setCompanyId(data?.company_id);
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
    setOnUnauthorizedCallback(logout);
  }, [logout]);

  const value: AuthContextType = useMemo(
    () => ({
      isLoggedIn,
      userId: userId!,
      companyId: companyId!,
      login,
      logout,
      isLoading: loginLoading,
    }),
    [companyId, isLoggedIn, login, loginLoading, logout, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
