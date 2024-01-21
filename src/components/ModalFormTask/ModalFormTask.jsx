import {
  convertSecondsToTimeFormat,
  convertTimeToSeconds,
  generateIdByDuration,
} from "../../utils/mixin";
import { Input, Select, Button, Modal } from "..";
import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const selectOptions = [
  { id: 1, name: "30 minutes", duration: 1800 },
  { id: 2, name: "45 minutes", duration: 2700 },
  { id: 3, name: "1 hour", duration: 3600 },
  { id: 4, name: "Other duration" },
];

const initialValues = {
  description: "",
  durationChoice: "",
  customDuration: "",
};

//Es el fomulario que se muestra en el modal para agregar o editar una tarea

const ModalFormTask = ({ data, isOpen, onToggle }) => {
  const dispatch = useDispatch();

  const [disabledInput, setDisabledInput] = useState(true);
  const [yourUniqueKey, setYourUniqueKey] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setYourUniqueKey((prev) => prev + 1);
  }, [onToggle]);

  const onHandleSubmite = useCallback(
    (event) => {
      event.preventDefault();
      const { elements } = event.currentTarget;

      const formValues = {};

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.name && element.type !== "submit") {
          formValues[element.name] = element.value;
        }
      }

      const isUseSelect = formValues.durationChoice !== "4";

      const duration = isUseSelect
        ? selectOptions.find(
            (e) => e.id === parseInt(formValues.durationChoice)
          ).duration
        : convertTimeToSeconds(formValues.otherDuration);

      const currentData = {
        id: isEdit ? data?.id : crypto.randomUUID(),
        description: formValues.description,
        isUseSelect,
        duration,
        initialDuration: duration,
        type: generateIdByDuration(duration),
        createdAt: isEdit ? data?.createdAt : new Date().toISOString(),
      };

      //Si es editar se envia el tipo de accion global/editTask
      //Si es agregar se envia el tipo de accion global/addTask

      const type = isEdit ? "global/editTask" : "global/addTask";

      dispatch({ type, payload: currentData });
      setYourUniqueKey((prev) => prev + 1);
      closeModal();
    },
    [dispatch, isEdit, data, resetForm]
  );

  //La funcion handleDurationChange se encarga de manejar el cambio de duracion
  const handleDurationChange = (value) => {
    const isInputDisabled = value !== "4";
    setDisabledInput(isInputDisabled);
    setValues((prev) => ({
      ...prev,
      durationChoice: value,
      customDuration: "",
    }));
  };

  const closeModal = () => {
    resetForm();
    onToggle();
    setDisabledInput(true);
  };

  //Si data.id existe es porque se esta editando una tarea

  useEffect(() => {
    if (data?.id) {
      setIsEdit(true);

      const durationChoice = data.isUseSelect
        ? selectOptions.find((e) => e.duration === data.duration)?.id || 4
        : 4;

      if (!data.isUseSelect || durationChoice === 4) setDisabledInput(false);

      const customDuration =
        !data.isUseSelect || durationChoice === 4
          ? convertSecondsToTimeFormat(data.duration)
          : null;

      const values = {
        description: data.description,
        durationChoice,
        customDuration,
      };

      setValues(values);
    } else {
      setIsEdit(false);
      resetForm();
    }
  }, [data]);

  //Hacer focus en el input de descripcion cuando se abre el modal

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      const element = document.getElementById("description");
      if (element) element.focus();
    }, 200);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onToggle={closeModal}>
      <section className="form-task" key={yourUniqueKey}>
        <h2 className="mb-2">{isEdit ? "Edit task" : "Add task"}</h2>
        <form
          onSubmit={onHandleSubmite}
          aria-label={isEdit ? "Edit task form" : "Add task form"}
        >
          <Input
            id="description"
            label="Description"
            name="description"
            placeholder="Enter the description"
            required
            value={values.description}
            onChange={(e) => setValues((prev) => ({ ...prev, description: e }))}
          />
          <Select
            id="duration-choice"
            value={values.durationChoice}
            name="durationChoice"
            placeholder="Select duration"
            onChange={handleDurationChange}
            options={selectOptions}
            required
            label="Duration"
          />
          <Input
            disabled={disabledInput}
            id="other-duration"
            value={values.customDuration}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                customDuration: e,
              }))
            }
            label="Other duration"
            maxTime={7200}
            name="otherDuration"
            required={!disabledInput}
            type="time"
          />
          <Button
            isDisabled={
              !values.description ||
              (disabledInput && !values.durationChoice) ||
              (!disabledInput && !values.customDuration)
            }
            text={isEdit ? "Edit task" : "Add task"}
            formAction="submit"
          />
        </form>
      </section>
    </Modal>
  );
};

ModalFormTask.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    isUseSelect: PropTypes.bool,
    createdAt: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ModalFormTask;
