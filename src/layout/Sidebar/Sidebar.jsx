import PropTypes from 'prop-types';
import { FaGithub } from 'react-icons/fa';
import { HeaderItem } from '../../components';
import classNames from 'classnames';
import { GoGraph, GoHomeFill, GoChecklist } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';
import useWindowResize from '../../hooks/useWindowResize';

const Sidebar = ({ onToggle, isOpen }) => {
  const windowWidth = useWindowResize(isOpen);

  const linkClasses = classNames('sidebar__format', {
    'sidebar__is-open': isOpen,
  });

  const overlayClass = classNames('sidebar__overlay', {
    'sidebar__is-open-overlay': isOpen && windowWidth <= 700,
  });

  return (
    <>
      <div className="sidebar">
        <div>
          <div className="sidebar_toggle" onClick={() => onToggle()}>
            <GiHamburgerMenu />
          </div>
        </div>
        <div className={linkClasses}>
          <div className="sidebar-container">
            <ul>
              <li>
                <HeaderItem
                  icon={GoHomeFill}
                  goTo="/"
                  text="Home"
                  onClick={onToggle}
                />
              </li>
              <li>
                <HeaderItem
                  icon={GoGraph}
                  goTo="dashboard"
                  text="Dashboard"
                  onClick={onToggle}
                />
              </li>
              <li>
                <HeaderItem
                  icon={GoChecklist}
                  goTo="history"
                  text="History"
                  onClick={onToggle}
                />
              </li>
            </ul>
          </div>

          <div className="sidebar__footer">
            <HeaderItem
              goTo="https://github.com/CUBOFIG/productivity-app"
              onClick={onToggle}
              icon={FaGithub}
            />
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

Sidebar.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
