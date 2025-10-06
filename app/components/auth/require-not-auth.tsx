import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { useAuth } from '~/contexts/auth/use-auth';

export default function RequireNotAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', {
        state: { from: location },
        replace: true,
      });
    }
  }, [isLoggedIn, location, navigate]);

  return <Outlet />;
}
