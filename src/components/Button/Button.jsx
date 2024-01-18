import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({
  ariaLabel,
  className,
  formAction,
  icon: Icon,
  onClick,
  text,
  type,
  isDisabled,
}) => {
  const buttonClasses = classNames('button', className, type);

  return (
    <button
      formAction={formAction}
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel || text}
      disabled={isDisabled}
    >
      {text && <p className={`button__text ${Icon ? 'mr-1' : ''}`}>{text}</p>}
      {Icon && <Icon />}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.elementType,
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
  icon: null,
};

export default Button;

//Este es un componente button que recibe como props un texto, un icono, una clase, un onClick, un ariaLabel, un formAction, un type y un isDisabled, principalmente.
