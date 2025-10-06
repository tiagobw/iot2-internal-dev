import NavLink, { NAV_LINK_PADDING } from '~/components/nav-link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '~/components/ui/navigation-menu';

export { NAV_LINK_PADDING };

export type NavigationLinkItem = {
  to: string;
  content: React.ReactNode;
  tooltipText?: string;
  isDisabled?: boolean;
};

type NavMenuProps = {
  navigationLinks: NavigationLinkItem[];
};

export default function NavMenu({ navigationLinks }: NavMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className='flex-wrap'>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.to}>
            <NavLink
              to={link.to}
              tooltipText={link.tooltipText}
              isDisabled={link.isDisabled}
            >
              {link.content}
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
