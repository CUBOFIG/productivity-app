import React, { useEffect } from 'react';
import HeaderItem from '../../shared/HeaderItem/HeaderItem';
import classNames from 'classnames';
import { GoGraph, GoHomeFill, GoChecklist } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';

const Sidebar = ({ onToggle, isOpen }) => {
  const linkClasses = classNames('sidebar__format', {
    'sidebar__is-open': isOpen,
  });

  const overlayClass = classNames('sidebar__overlay', {
    'sidebar__is-open-overlay': isOpen,
  });

  const handleResize = () => {
    if (window.innerWidth <= 500) {
      document.body.style.overflowY = isOpen ? 'hidden' : 'scroll';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  };

  useEffect(() => {
    // Aplica el efecto al montar y al cambiar isOpen
    handleResize();

    // Añade el listener de redimensionamiento
    window.addEventListener('resize', handleResize);

    // Limpieza: remueve el listener de redimensionamiento
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      <div className="sidebar">
        <div>
          <div
            className="sidebar_toggle"
            onClick={() => {
              onToggle();
            }}
          >
            <GiHamburgerMenu />
          </div>
        </div>
        <div className={linkClasses}>
          <div className="sidebar-container">
            <ul>
              <li>
                <HeaderItem
                  icon={<GoHomeFill />}
                  goTo="/"
                  text="Home"
                  isOpen={onToggle}
                />
              </li>
              <li>
                <HeaderItem
                  icon={<GoGraph />}
                  goTo="dashboard"
                  text="Dashboard"
                  isOpen={onToggle}
                />
              </li>
              <li>
                <HeaderItem
                  icon={<GoChecklist />}
                  goTo="history"
                  text="History"
                  isOpen={onToggle}
                />
              </li>
            </ul>
          </div>
        </div>
        {isOpen ? (
          <div
            className={overlayClass}
            onClick={() => (isOpen ? onToggle() : null)}
          />
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;
