import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import useAxios from 'axios-hooks';

import { setOnUnauthorizedCallback } from '~/lib/axios';

const USER_ID_KEY = 'userId';
const COMPANY_ID_KEY = 'companyId';
const IS_LOGGED_IN_KEY = 'isLoggedIn';

const getInitialState = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

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
  const [userId, setUserId] = useState<number | null>(
    getInitialState(USER_ID_KEY, null),
  );
  const [companyId, setCompanyId] = useState<number | null>(
    getInitialState(COMPANY_ID_KEY, null),
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    getInitialState(IS_LOGGED_IN_KEY, false),
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
    setUserId(null);
    setCompanyId(null);
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
    localStorage.setItem(USER_ID_KEY, JSON.stringify(userId));
    localStorage.setItem(COMPANY_ID_KEY, JSON.stringify(companyId));
    localStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
  }, [companyId, isLoggedIn, userId]);

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
