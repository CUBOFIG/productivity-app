import React, { useEffect } from 'react';
import classNames from 'classnames';

const Modal = ({ onToggle, isOpen, children }) => {
  const linkClasses = classNames('modal', {
    'modal__is-open': isOpen,
  });

  const overlayClass = classNames('modal__overlay', {
    'sidebar__is-open-overlay': isOpen,
  });

  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'scroll';
  }, [isOpen]);

  return (
    <>
      <div className={linkClasses}>
        <div className="modal__content">{children}</div>

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

export default Modal;
