import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import useToggleSidebar from '../hooks/useToggleSidebar';

const Layout = () => {
  const [toggle, setToggle] = useToggleSidebar();

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
