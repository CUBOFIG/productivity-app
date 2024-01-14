import { useEffect, useState } from 'react';
import { Input, Select, Button, Modal } from '..';
import { addTask } from '../../redux/slices/globalStore';
import { useDispatch } from 'react-redux';

const selectOptions = [
  { id: 1, name: '30 minutes' },
  { id: 2, name: '45 minutes' },
  { id: 3, name: '1 hour' },
  { id: 4, name: 'Other duration' },
];

const ModalFormTask = ({ data, isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const [disabledInput, setDisabledInput] = useState(true);
  const [yourUniqueKey, setYourUniqueKey] = useState(0);
  const [values, setValues] = useState({
    description: '',
    durationChoice: '',
    customDuration: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  const onHandleSubmite = (event) => {
    event.preventDefault();
    const { elements, reset } = event.currentTarget;

    const formValues = {};

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.name && element.type !== 'submit') {
        formValues[element.name] = element.value;
      }
    }

    console.log(formValues);

    const data = {
      id: isEdit ? data.id : Math.random(),
      description: formValues.description,
      durationChoice: {
        id: formValues.durationChoice,
        name: selectOptions.find(
          (e) => e.id === parseInt(formValues.durationChoice),
        ).name,
      },
      customDuration: formValues.otherDuration,
    };

    dispatch(addTask(data));
    setYourUniqueKey((prev) => prev + 1);
    onToggle();
  };

  const handleDurationChange = (value) => {
    if (value == 4) setDisabledInput(false);
    else {
      setDisabledInput(true);
      setValues((prev) => ({ ...prev, customDuration: '' }));
    }
  };

  const closeModal = () => {
    setYourUniqueKey((prev) => prev + 1);
    onToggle();
    setValues({
      description: '',
      durationChoice: '',
      customDuration: '',
    });
  };

  useEffect(() => {
    if (data?.id) {
      console.log(data);
      setIsEdit(true);
      setValues({
        description: data.description,
        durationChoice: parseInt(data.durationChoice.id),
        customDuration: data.customDuration,
      });
    } else {
      setIsEdit(false);
      setValues({
        description: '',
        durationChoice: '',
        customDuration: '',
      });
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onToggle={closeModal}>
      <section className="form-task" key={yourUniqueKey}>
        <h2 className="mb-2">{isEdit ? 'Edit task' : 'Add task'}</h2>
        <form onSubmit={onHandleSubmite} aria-label="form">
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

          <Button text="Add task" formAction="submit" />
        </form>
      </section>
    </Modal>
  );
};

export default ModalFormTask;
