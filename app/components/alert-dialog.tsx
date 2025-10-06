import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

type AlertDialogProps = {
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  onClick: () => void;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export function AlertDialog({
  title,
  description = 'Esta ação não pode ser desfeita.',
  trigger,
  onClick,
  onMouseDown,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent onMouseDown={onMouseDown}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className='cursor-pointer'>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
}
