import PropTypes from "prop-types";

//isTimeFormatValid es una funcion que valida que el formato de tiempo sea correcto, mediante una expresion regular.

const isTimeFormatValid = (time) =>
  /^(\d{1,2}(:\d{0,2})?(:\d{0,2})?)$/.test(time);

//formatTime es una funcion que formatea el tiempo ingresado, para que siempre tenga el formato de HH:MM:SS

const formatTime = (time) => {
  let [hours, minutes = "00", seconds = "00"] = time.split(":");
  hours = hours.padStart(2, "0");
  minutes = minutes.padEnd(2, "0");
  seconds = seconds.padEnd(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

//El maxTime es en segundos.

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

    //En caso de ser de tipo time, se valida que el formato sea correcto.

    if (type === "time") {
      let formattedValue = newValue.replace(/(\d{2})(\d)/, "$1:$2");
      if (isTimeFormatValid(formattedValue) || formattedValue === "") {
        onChange(formattedValue);
      }
    } else {
      onChange(newValue);
    }
  };

  //En caso de ser de tipo time, se valida que el tiempo ingresado no sea mayor al maximo permitido.

  const handleBlur = () => {
    if (type !== "time") return;

    let formattedValue = formatTime(value);
    const [inputHours, inputMinutes = "00", inputSeconds = "00"] =
      formattedValue.split(":");
    const inputTimeInSeconds =
      parseInt(inputHours, 10) * 3600 +
      parseInt(inputMinutes, 10) * 60 +
      parseInt(inputSeconds, 10);

    if (inputTimeInSeconds > maxTime)
      formattedValue = formatTime(
        new Date(maxTime * 1000).toISOString().substr(11, 8)
      );

    if (inputHours === "00" && inputMinutes === "00" && inputSeconds === "00")
      return onChange("");
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
        placeholder={type === "time" ? "00:00:00" : placeholder}
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
  maxTime: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
