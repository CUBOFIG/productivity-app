import PropTypes from "prop-types";

const isTimeFormatValid = (time) => /^(\d{1,2}(:\d{0,2})?)$/.test(time);

const formatTime = (time) => {
  let [hours, minutes = "00"] = time.split(":");
  hours = hours.padStart(2, "0");
  minutes = minutes.padEnd(2, "0");
  return `${hours}:${minutes}`;
};

const Input = ({
  disabled = false,
  id,
  label,
  name,
  required = false,
  type = "text",
  maxTime = "",
  placeholder,
  value,
  onChange = () => {},
}) => {
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    if (type === "time") {
      let formattedValue = newValue.replace(/(\d{2})(\d)/, "$1:$2");
      if (isTimeFormatValid(formattedValue) || formattedValue === "") {
        onChange(formattedValue);
      }
    } else {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (type !== "time") return;

    let formattedValue = formatTime(value);
    const [maxHours, maxMinutes = "00"] = maxTime.split(":");
    const maxTimeInMinutes =
      parseInt(maxHours, 10) * 60 + parseInt(maxMinutes, 10);
    const [inputHours, inputMinutes = "00"] = formattedValue.split(":");
    const inputTimeInMinutes =
      parseInt(inputHours, 10) * 60 + parseInt(inputMinutes, 10);

    if (inputTimeInMinutes > maxTimeInMinutes) formattedValue = maxTime;

    if (inputHours === "00" && inputMinutes === "00") return onChange("");
    onChange(formattedValue);
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="text"
        disabled={disabled}
        required={required}
        onChange={handleOnChange}
        onBlur={handleBlur}
        placeholder={type === "time" ? "00:00" : placeholder}
        value={value}
        inputMode={type === "time" ? "numeric" : undefined}
      />
    </div>
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  maxTime: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Input;
