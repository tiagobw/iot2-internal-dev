import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { cn } from '~/lib/utils';

export type SelectOption = {
  id: string | number;
  value: string;
  label: string;
};

type SelectProps = {
  className?: string;
  id: string;
  name: string;
  options: SelectOption[];
  value: SelectOption | undefined;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const Select = ({
  id,
  name,
  className = '',
  options,
  value,
  onChange,
  placeholder = 'Selecione uma opção',
  isDisabled = false,
  isLoading = false,
}: SelectProps) => {
  return (
    <BaseSelect
      value={value?.value ?? ''}
      onValueChange={(val) => {
        const selectedOption = options.find((opt) => opt.value === val);
        if (selectedOption) onChange(selectedOption);
      }}
      disabled={isDisabled || isLoading}
    >
      <SelectTrigger
        id={id}
        name={name}
        className={cn('w-full truncate', className)}
      >
        <SelectValue placeholder={isLoading ? 'Carregando...' : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 ? (
          <div className='px-4 py-2 text-sm text-muted-foreground'>
            Nenhuma opção disponível
          </div>
        ) : (
          options.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </BaseSelect>
  );
};

export default Select;
