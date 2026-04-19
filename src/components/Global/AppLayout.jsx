import { Outlet } from "react-router-dom";
import SideNav from "./Side/SideNav";
import Topbar from "./Topbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <SideNav />

      <div className="flex min-h-screen flex-col lg:ml-[72px]">
        <div className="block">
          <Topbar />
        </div>

        <main className="flex-1 p-4 pt-10 md:p-6 lg:pt-6">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-6 lg:flex-row">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppLayout;