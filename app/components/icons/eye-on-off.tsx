import { Eye, EyeOff, type LucideProps } from 'lucide-react';

type EyeOnOffProps = {
  isOn: boolean;
} & LucideProps;

export function EyeOnOff({ isOn, size, ...props }: EyeOnOffProps) {
  {
    return isOn ? (
      <EyeOff size={size} {...props} />
    ) : (
      <Eye size={size} {...props} />
    );
  }
}
