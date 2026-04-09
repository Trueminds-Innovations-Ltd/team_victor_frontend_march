import SidebarContent from "./SidebarContent";

export default function DesktopSidebar({ pathname, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 hidden h-full w-[72px] flex-col items-center bg-white shadow-sm lg:flex">
      <SidebarContent pathname={pathname} onNavigate={onNavigate} />
    </aside>
  );
}