import NavMenu, {
  type NavigationLinkItem,
  NAV_LINK_PADDING,
} from '~/components/nav-menu';

type NavMenuTitleProps = {
  title: string;
  navigationLinks: NavigationLinkItem[];
};

export default function NavMenuTitle({
  title,
  navigationLinks,
}: NavMenuTitleProps) {
  return (
    <div className='flex justify-between items-center bg-gray-100 pb-2 px-4 lg:px-16'>
      <h2 className={`text-lg font-semibold ${NAV_LINK_PADDING}`}>{title}</h2>
      <NavMenu navigationLinks={navigationLinks} />
    </div>
  );
}
