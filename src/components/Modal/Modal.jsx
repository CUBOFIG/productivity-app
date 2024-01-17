import { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const Modal = ({
  onToggle,
  isOpen,
  isSimpleModal = false,
  discard,
  done,
  buttonTextConfirm,
  buttonTextCancel,
  messageModal,
  children,
}) => {
  const linkClasses = classNames("modal", {
    "modal__is-open": isOpen,
  });

  const containerClass = classNames("modal__content", {
    modal__simplemodal: isSimpleModal,
  });

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "scroll";
  }, [isOpen]);

  const onDone = () => {
    done();
    onToggle();
  };

  const onDiscard = () => {
    discard();
    onToggle();
  };

  return (
    <>
      <div className={linkClasses}>
        <div className={containerClass}>
          {isSimpleModal ? (
            <div className="simple-modal">
              <p>{messageModal}</p>
              <div className="modal-buttons">
                <Button
                  className="mr-2"
                  onClick={onDiscard}
                  ariaLabel="delete"
                  text={buttonTextCancel}
                />

                <Button
                  onClick={onDone}
                  ariaLabel="delete"
                  type="delete"
                  text={buttonTextConfirm}
                />
              </div>
            </div>
          ) : (
            children
          )}
        </div>

        {isOpen ? (
          <div
            className="modal__overlay"
            onClick={() => (isOpen ? onToggle() : null)}
          />
        ) : null}
      </div>
    </>
  );
};

Modal.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  isSimpleModal: PropTypes.bool,
  discard: PropTypes.func,
  done: PropTypes.func,
  buttonTextConfirm: PropTypes.string,
  buttonTextCancel: PropTypes.string,
  messageModal: PropTypes.string,
};

Modal.defaultProps = {
  done: () => {},
  discard: () => {},
};

export default Modal;
