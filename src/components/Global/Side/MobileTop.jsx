import { useMemo } from "react";
import { Menu } from "lucide-react";

export default function MobileTopbar({ onOpen }) {
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("truemind_user") || "null");
    } catch {
      return null;
    }
  }, []);

  const currentUser = storedUser || {};

  const fullName = currentUser?.name
  const nameParts = fullName.trim().split(" ");
  const firstNameInitial = nameParts[0]?.[0] || "";
  const lastNameInitial = nameParts[1]?.[0] || "";

  const notifications = currentUser?.notifications || 0;
  return (
    <div className="lg:hidden">
      <div className="bg-gradient-to-b from-[#8B3DFF] to-[#9333EA] px-4 ">
        <div className="flex items-center justify-between">
          {/* MENU */}
          <button onClick={onOpen} className="text-white">
            <Menu size={30} />
          </button>

          {/* LOGO */}
          <img src="/images/logo.png" alt="logo" className="w-20 h-20 object-cover"/>
          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION */}
            <div className="relative">
              <img src="/images/nt.png" alt="nt" className="h-6 w-6" />

              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications}
                </span>
              )}
            </div>

            {/* PROFILE (same style as desktop) */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-sm font-semibold text-white">
              {firstNameInitial}
              {lastNameInitial}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}