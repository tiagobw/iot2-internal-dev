import {
  LoaderCircle as BaseLoaderCircle,
  type LucideProps,
} from 'lucide-react';

import { cn } from '~/lib/utils';

export function LoaderCircle({ className, ...props }: LucideProps) {
  return (
    <BaseLoaderCircle
      className={cn(`animate-spin [animation-duration:3s]`, className)}
      {...props}
    />
  );
}
