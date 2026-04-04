import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import Topbar from "./Topbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
       <div className="hidden lg:block">
          <SideNav />
        </div>
         <div className="lg:ml-[72px] flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-4 md:p-6">
              <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">
                  <Outlet/>
              </div>

          </main>
           
         </div>
      {/* <div className="flex">
        <SideNav />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />

          <main className="flex-1 px-4 py-5 pb-24 md:px-6 md:py-6 md:pb-6">
            <Outlet />
          </main>
        </div>
      </div> */}
    </div>
  );
}
export default AppLayout;

