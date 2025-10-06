import {
  Battery as BaseBattery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  type LucideProps,
} from 'lucide-react';

export type BatteryLevel = 0 | 1 | 2 | 3;

type BatteryProps = {
  level: BatteryLevel;
} & LucideProps;

export function Battery({ level, ...props }: BatteryProps) {
  if (level === 0) {
    return <BaseBattery {...props} />;
  }

  if (level === 1) {
    return <BatteryLow {...props} />;
  }

  if (level === 2) {
    return <BatteryMedium {...props} />;
  }

  return <BatteryFull {...props} />;
}
