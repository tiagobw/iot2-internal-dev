import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';

type TooltipProps = {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  text: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Tooltip = ({
  className,
  asChild = false,
  children,
  text,
  open,
  onOpenChange,
}: TooltipProps) => {
  return (
    <BaseTooltip open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger
        asChild={asChild}
        className={cn('cursor-pointer', className)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent onClick={(e) => e.stopPropagation()}>
        <p>{text}</p>
      </TooltipContent>
    </BaseTooltip>
  );
};

export { Tooltip };
