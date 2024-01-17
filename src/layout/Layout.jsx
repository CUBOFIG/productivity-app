import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  // const local = useRef(false);

  // const handleCount = () => {
  //   const savedCount = localStorage.getItem("guardado");
  //   const count = savedCount ? parseInt(savedCount, 10) + 1 : 1;
  //   localStorage.setItem("guardado", count);
  //   local.current = true;
  //   return count;
  // };

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
