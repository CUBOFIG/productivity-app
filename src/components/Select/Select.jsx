import PropTypes from 'prop-types';

const Select = ({
  options,
  id,
  name,
  label,
  placeholder,
  required,
  onChange,
  value,
  keyProp,
  disabledDefault,
  disabled,
}) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  const findOptionValue = (key) => {
    const option = options.find((opt) => opt[keyProp] == key);
    return option ? option[keyProp] : '';
  };

  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleChange}
        value={findOptionValue(value)}
        required={required}
      >
        <option value="" disabled={disabledDefault}>
          {placeholder}
        </option>
        {options.map((item) => (
          <option key={item[keyProp]} value={item[keyProp]}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keyProp: PropTypes.string,
  disabledDefault: PropTypes.bool,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  options: [],
  required: false,
  onChange: () => {},
  placeholder: '',
  keyProp: 'id',
  disabledDefault: true,
  label: '',
  disabled: false,
};

export default Select;
