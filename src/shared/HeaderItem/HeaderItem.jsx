import React from 'react';
import { Link } from 'react-router-dom';

const HeaderItem = ({ goTo, text, itemClass, isOpen, icon }) => {
  return (
    <>
      <Link
        className={`header-item ${itemClass}`}
        to={goTo}
        onClick={() => {
          isOpen();
        }}
      >
        {icon}
        <p>{text}</p>
      </Link>
    </>
  );
};

HeaderItem.defaultProps = {
  isOpen: () => {},
};

export default HeaderItem;
