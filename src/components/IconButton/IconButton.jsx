import PropTypes from "prop-types";

const IconButton = ({ icon: Icon, isDisabled, onClick }) => {
  const handleClick = () => {
    if (!isDisabled) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`icon-button ${isDisabled ? "disabled" : ""}`}
    >
      <Icon />
    </div>
  );
};

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  isDisabled: false,
  onClick: () => {},
};

export default IconButton;
