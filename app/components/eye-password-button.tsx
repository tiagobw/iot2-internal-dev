import { EyeOnOff } from '~/components/icons/eye-on-off';

type EyePasswordButtonProps = {
  isPasswordVisible: boolean;
  onClick: () => void;
};

export function EyePasswordButton({
  isPasswordVisible,
  onClick,
}: EyePasswordButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer'
    >
      {<EyeOnOff isOn={isPasswordVisible} size={18} />}
    </button>
  );
}
