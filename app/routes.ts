import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  ...prefix('', [
    layout('./routes/devices/layout.tsx', [
      index('./routes/devices/home.tsx'),
      route('/add-gateway', './routes/devices/add-gateway.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
