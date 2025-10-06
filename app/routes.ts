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
    ...prefix('devices-data/:id', [
        layout('routes/devices-data/layout.tsx', [
          index('routes/devices-data/home.tsx'),
          ...prefix('read-data', [
            index(
              'routes/devices-data/read-data/home.tsx',
            ),
          ]),
      ]),
    ]),
  ]),
  layout('components/auth/require-not-auth.tsx', [
    layout('./routes/login/login-layout.tsx', [
      route('login', './routes/login/login.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
