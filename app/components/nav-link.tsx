import { NavLink as _NavLink } from 'react-router';

import { Tooltip } from '~/components/tooltip';

export const NAV_LINK_PADDING = 'px-2 py-2';

type NavLinkProps = {
  to: string;
  isDisabled?: boolean;
  tooltipText?: string;
  children: React.ReactNode;
};

const NavLink = ({
  to,
  isDisabled = false,
  tooltipText,
  children,
}: NavLinkProps) => {
  const getClassName = (isDisabled: boolean, isActive: boolean = false) =>
    `flex justify-center items-center gap-3 text-sm lg:text-base ${
      isActive ? 'border-black border-b-2' : ''
    } ${NAV_LINK_PADDING} ${
      isDisabled
        ? 'cursor-not-allowed text-black/50'
        : 'cursor-pointer text-black'
    }`;

  if (isDisabled) {
    return <div className={getClassName(isDisabled, false)}>{children}</div>;
  }

  const navLink = (
    <_NavLink
      className={({ isActive }) => getClassName(isDisabled, isActive)}
      to={to}
      prefetch='intent'
    >
      {children}
    </_NavLink>
  );

  return tooltipText ? (
    <Tooltip text={tooltipText}>{navLink}</Tooltip>
  ) : (
    navLink
  );
};

export default NavLink;
