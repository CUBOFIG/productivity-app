import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="layout">
      <>
        <Sidebar onToggle={() => setToggle((prev) => !prev)} isOpen={toggle} />
        <main>
          <Outlet />
        </main>
      </>
    </div>
  );
};

export default Layout;
