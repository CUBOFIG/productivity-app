import { useEffect, useState } from 'react';

const Select = ({
  options = [],
  id,
  name,
  label,
  placeholder,
  required = false,
  onChange = () => {},
  initialValue = null,
  key = 'id',
}) => {
  const [option, setOptions] = useState(options);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setOptions(options);
  }, [options]);

  useEffect(() => {
    console.log('initialValue', initialValue, key, options);
    if (!initialValue || options.length === 0) return;

    const selectedOption = options.find((item) => item[key] === initialValue);
    console.log('selectedOption', selectedOption);
    setValue(selectedOption ? selectedOption.id : '');
  }, [options, initialValue, key]);

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        onChange={handleChange}
        value={value}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {option.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
