"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileTopbar from "./MobileTop";
import MobileSidebar from "./MobileSideBar";
import DesktopSidebar from "./Desktop";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <MobileTopbar onOpen={() => setOpen(true)} />

      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
        pathname={location.pathname}
        onNavigate={navigate}
      />

      <DesktopSidebar
        pathname={location.pathname}
        onNavigate={navigate}
      />
    </>
  );
}