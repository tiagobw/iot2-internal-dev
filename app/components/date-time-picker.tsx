import { CalendarIcon } from 'lucide-react';
import { format, add } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { TimePicker } from '~/components/time-picker/time-picker';

type DateTimePickerProps = {
  id?: string;
  name?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  disabledDates?: (date: Date) => boolean;
  withTime?: boolean;
};

export const DateTimePicker = ({
  id,
  name,
  value,
  onChange,
  placeholder = 'Selecione uma data',
  isDisabled = false,
  isLoading = false,
  className,
  disabledDates,
  withTime = false,
}: DateTimePickerProps) => {
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;

    if (!value) {
      onChange(newDay);
      return;
    }

    const diff = newDay.getTime() - value.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDate = add(value, { days: Math.ceil(diffInDays) });
    onChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant='outline'
          disabled={isDisabled || isLoading}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {isLoading
            ? 'Carregando...'
            : value
            ? format(value, withTime ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy')
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={handleSelect}
          initialFocus
          disabled={disabledDates}
          locale={ptBR}
        />
        {withTime && (
          <div className='p-3 border-t border-border'>
            <TimePicker date={value} setDate={onChange} />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
