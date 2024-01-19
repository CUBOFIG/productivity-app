import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import {
  DragList,
  MainWork,
  ModalFormTask,
  Button,
  Select,
} from '../../components';
import { useSelector } from 'react-redux';

const selectOptions = [
  { id: 'id-short', name: 'Short duration' },
  { id: 'id-medium', name: 'Medium duration' },
  { id: 'id-long', name: 'Long duration' },
];

const Home = () => {
  const tasks = useSelector((state) => state.global.tasks);
  const [isOpen, setIsOpen] = useState(false);
  const [task, selectTask] = useState({});
  const [durationType, setDurationType] = useState(null);

  const onToggle = () => setIsOpen((prev) => !prev);

  const ToggleCustomFunction = (otherFunction) => {
    otherFunction();
    onToggle();
  };

  const onEditTask = (task) => {
    ToggleCustomFunction(() => selectTask(task));
  };

  const onToggleModal = () => {
    ToggleCustomFunction(selectTask);
  };

  return (
    <div className="home">
      <MainWork onEditTask={onEditTask} />
      <div className="d-flex container-buttons">
        <Button
          className="mb-2 mr-2"
          icon={IoMdAdd}
          onClick={onToggle}
          text="ADD"
        />
        <Select
          disabled={tasks?.length <= 2}
          disabledDefault={false}
          id="duration-choice"
          name="durationChoice"
          onChange={(type) => setDurationType(type)}
          options={selectOptions}
          placeholder="Sort by duration"
          required
          value={durationType}
        />
      </div>
      <DragList
        onEditTask={onEditTask}
        setTypeSort={setDurationType}
        tasks={tasks}
        typeSort={durationType}
      />
      <ModalFormTask data={task} isOpen={isOpen} onToggle={onToggleModal} />
    </div>
  );
};

export default Home;
