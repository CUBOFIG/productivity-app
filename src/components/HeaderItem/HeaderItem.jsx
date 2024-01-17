import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeaderItem = ({ goTo, text, itemClass, onClick, icon: Icon }) => {
  return (
    <Link
      className={`header-item ${itemClass || ""}`}
      to={goTo}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {text && <p>{text}</p>}
    </Link>
  );
};

HeaderItem.propTypes = {
  goTo: PropTypes.string.isRequired,
  text: PropTypes.string,
  itemClass: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
};

HeaderItem.defaultProps = {
  itemClass: "",
  onClick: () => {},
  icon: null,
};

export default HeaderItem;
