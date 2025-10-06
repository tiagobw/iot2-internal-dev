import { Outlet, useParams } from 'react-router';

import NavMenuTitle from '~/components/layout/nav-menu-title';

export default function DevicesDataLayout() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <NavMenuTitle
        title={''}
        navigationLinks={[
          {
            to: `/devices-data/${id}/read-data`,
            content: 'Ler Dados',
          },
          {
            to: `/devices-data/${id}/program`,
            content: 'Programar',
          },
        ]}
      />
      <Outlet />
    </>
  );
}
