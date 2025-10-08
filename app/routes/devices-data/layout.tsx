import { ArrowLeft } from 'lucide-react';
import { Link, Outlet, useParams, useSearchParams } from 'react-router';

import NavMenuTitle from '~/components/layout/nav-menu-title';
import NavMenu, { NAV_LINK_PADDING } from '~/components/nav-menu';

export default function DevicesDataLayout() {
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const navigationLinks = [
    {
      to: `/devices-data/${id}/read-data?name=${name}`,
      content: 'Ler Dados',
    },
    {
      to: `/devices-data/${id}/program?name=${name}`,
      content: 'Programar',
    },
  ];

  return (
    <>
      <div className='flex justify-between items-center bg-gray-100 pb-2 px-4 lg:px-16'>
        <Link to='/' prefetch='intent'>
          <div
            className={`flex flex-col lg:flex-row items-center gap-2 font-semibold ${NAV_LINK_PADDING}`}
          >
            <span className='flex items-center gap-1'>
              <ArrowLeft /> Voltar
            </span>{' '}
            <span>[{name}]</span>
          </div>
        </Link>
        <NavMenu navigationLinks={navigationLinks} />
      </div>
      <Outlet />
    </>
  );
}
