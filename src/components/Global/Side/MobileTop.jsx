import { Menu } from "lucide-react";

export default function MobileTopbar({ onOpen }) {
  return (
    <div className="fixed top-0 left-0 z-30 flex h-14 w-full items-center bg-white px-4 shadow-sm lg:hidden">
      <button onClick={onOpen}>
        <Menu size={22} />
      </button>

      <span className="ml-4 font-semibold">Dashboard</span>
    </div>
  );
}