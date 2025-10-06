import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('components/auth/require-auth.tsx', [
    ...prefix('', [
      layout('./routes/devices/layout.tsx', [
        index('./routes/devices/home.tsx'),
        route('/add-gateway', './routes/devices/add-gateway.tsx'),
      ]),
    ]),
  ]),
  layout('components/auth/require-not-auth.tsx', [
    layout('./routes/login/login-layout.tsx', [
      route('login', './routes/login/login.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
