import type { VariantProps } from 'class-variance-authority';

import { Button as BaseButton, buttonVariants } from './ui/button';
import { LoaderCircle } from '~/components/loader-circle';
import { cn } from '~/lib/utils';

function Button({
  className,
  size,
  isLoading = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  return (
    <BaseButton
      className={cn('cursor-pointer', className)}
      size={size}
      {...props}
    >
      {isLoading ? <ButtonLoading size={size} /> : props.children}
    </BaseButton>
  );
}

function ButtonLoading({
  size,
}: {
  size: VariantProps<typeof buttonVariants>['size'];
}) {
  let loaderSize: number;

  if (size === 'sm') loaderSize = 10;
  else if (size === 'lg') loaderSize = 30;
  else loaderSize = 20;

  return <LoaderCircle size={loaderSize} />;
}

export { Button };
