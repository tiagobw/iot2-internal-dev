import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '~/contexts/auth/use-auth';
// import GlobalLayout from '../layout/global-layout';

export default function RequireAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return (
    // <GlobalLayout>
    <Outlet />
    // </GlobalLayout>
  );
}
