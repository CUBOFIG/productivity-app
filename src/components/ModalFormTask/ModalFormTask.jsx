import { useEffect, useState, useCallback } from "react";
import { Input, Select, Button, Modal } from "..";
import { useDispatch } from "react-redux";
import { convertTimeToSeconds } from "../../Utils/mixin";

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

      const currentData = {
        id: isEdit ? data.id : Math.random(),
        description: formValues.description,
        durationChoice: {
          id: formValues.durationChoice,
          duration: selectOptions.find(
            (e) => e.id === parseInt(formValues.durationChoice)
          ).duration,
        },
        customDuration: convertTimeToSeconds(formValues.otherDuration),
      };

      const type = isEdit ? "global/editTask" : "global/addTask";

      dispatch({ type, payload: currentData });
      setYourUniqueKey((prev) => prev + 1);
      onToggle();
    },
    [dispatch, isEdit, data, resetForm]
  );

  const handleDurationChange = (value) => {
    if (value == 4) setDisabledInput(false);
    else {
      setDisabledInput(true);
      setValues((prev) => ({ ...prev, customDuration: "" }));
    }
  };

  const closeModal = () => {
    setYourUniqueKey((prev) => prev + 1);
    onToggle();
    setValues({
      description: "",
      durationChoice: "",
      customDuration: "",
    });
    setDisabledInput(true);
  };

  useEffect(() => {
    if (data?.id) {
      setIsEdit(true);
      setValues({
        description: data.description,
        durationChoice: parseInt(data.durationChoice.id),
        customDuration: data.customDuration,
      });
    } else {
      setIsEdit(false);
      resetForm();
    }
  }, [data]);

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
            initialValue={values.durationChoice}
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
            maxTime="02:00"
            name="otherDuration"
            required={!disabledInput}
            type="time"
          />
          <Button
            text={isEdit ? "Edit task form" : "Add task form"}
            formAction="submit"
          />
        </form>
      </section>
    </Modal>
  );
};

export default ModalFormTask;
