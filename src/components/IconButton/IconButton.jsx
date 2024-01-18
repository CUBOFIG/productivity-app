import PropTypes from 'prop-types';

//Componente IconButton que recibe como props un icon, un isDisabled, un onClick y un className, principalmente.
const IconButton = ({ icon: Icon, isDisabled, onClick, className }) => {
  const handleClick = () => {
    if (!isDisabled) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`icon-button ${isDisabled ? 'disabled' : ''} ${className}`}
    >
      <Icon />
    </div>
  );
};

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  isDisabled: false,
  onClick: () => {},
  className: '',
};

export default IconButton;
