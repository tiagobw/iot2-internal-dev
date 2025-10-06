import type { JSX } from 'react';
import { CloudDownload } from 'lucide-react';

import { Tooltip } from '~/components/tooltip';
import { Card } from '~/components/ui/card';
import { LoaderCircle } from '~/components/loader-circle';

type Props = {
  isLoading: boolean;
  headerData: {
    title: string;
    getDataCallback: () => void;
  };
  bodyData: {
    title: string;
    value?: string | number;
    icon?: JSX.Element;
    isSubtitle?: boolean;
  }[];
};

export function InfoCard({ headerData, bodyData, isLoading }: Props) {
  return (
    <Card className='flex flex-col items-center w-full sm:w-100 p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>{headerData.title}</h3>
        <Tooltip asChild text='Requisitar Dados'>
          <button
            type='button'
            onClick={headerData.getDataCallback}
            disabled={isLoading}
            className={`flex justify-center items-center cursor-pointer disabled:text-gray-300 disabled:pointer-events-none text-blue-600`}
          >
            {isLoading ? <LoaderCircle /> : <CloudDownload />}
          </button>
        </Tooltip>
      </div>
      <div className='flex flex-col gap-1 items-center w-full'>
        {bodyData.map((item, index) => {
          return item?.isSubtitle ? (
            <div key={index} className='flex mr-auto'>
              <span className='text-blue-600 font-bold text-lg underline'>
                {item.title}
              </span>
            </div>
          ) : (
            <div key={index} className='flex justify-between w-full'>
              <span className='w-1/2'>{item.title}</span>{' '}
              <div className='flex gap-2 w-1/2'>
                {item.value !== undefined && (
                  <span
                    className={`${
                      String(item.value).includes(' ')
                        ? 'break-words'
                        : 'break-all'
                    }`}
                  >
                    {item.value}
                  </span>
                )}
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
