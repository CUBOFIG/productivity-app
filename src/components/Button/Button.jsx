import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  ariaLabel,
  className,
  formAction,
  icon,
  onClick,
  text,
  type,
  isDisabled,
}) => {
  const buttonClasses = classNames("button", className, type);

  return (
    <button
      formAction={formAction}
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel || text}
      disabled={isDisabled}
    >
      {text && <p className={`button__text ${icon ? "mr-1" : ""}`}>{text}</p>}
      {icon}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  formAction: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  isDisabled: false,
};

export default Button;
