import { Navigate, Outlet, useLocation } from 'react-router';
import Header from '~/components/layout/header';

import { useAuth } from '~/contexts/auth/use-auth';

export default function RequireAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
