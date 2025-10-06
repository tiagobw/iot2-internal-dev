import { Outlet } from 'react-router';

// import background from '~/assets/images/background.webp';

export default function LoginLayout() {
  return (
    <div
      className='relative min-h-svh w-full bg-cover bg-center bg-no-repeat'
      // style={{ backgroundImage: `url(${background})` }}
    >
      {/* <div className='absolute inset-0 bg-gradient-to-br from-blue-600/70 via-sky-600/70 to-blue-600/70' /> */}
      <div className='absolute inset-0 bg-gray-50' />
      <div className='relative z-10 flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
