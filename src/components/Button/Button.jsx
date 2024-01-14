import classNames from 'classnames';

const Button = ({
  icon,
  text,
  onClick = () => {},
  className,
  ariaLabel,
  formAction,
}) => {
  const buttonClasses = classNames('button', className);

  return (
    <button
      formAction={formAction}
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel || text}
    >
      {text && <p className={`button__text ${icon ? 'mr-1' : ''}`}>{text}</p>}
      {icon}
    </button>
  );
};

export default Button;
