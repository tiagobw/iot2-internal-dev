import {
  Signal as BaseSignal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  type LucideProps,
} from 'lucide-react';

export type SignalLevel = 0 | 1 | 2 | 3 | 4;

type SignalProps = {
  level: SignalLevel;
} & LucideProps;

export function Signal({ level, ...props }: SignalProps) {
  if (level === 0) {
    return <SignalZero {...props} />;
  }

  if (level === 1) {
    return <SignalLow {...props} />;
  }

  if (level === 2) {
    return <SignalMedium {...props} />;
  }

  if (level === 3) {
    return <SignalHigh {...props} />;
  }

  return <BaseSignal {...props} />;
}
