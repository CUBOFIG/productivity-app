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
  const [isOpen, setIsOpen] = useState(false);
  const [task, selectTask] = useState({});
  const [durationType, setDurationType] = useState(null);
  const tasks = useSelector((state) => state.global.tasks);

  const onToggle = () => setIsOpen((prev) => !prev);

  const onEditTask = (task) => {
    selectTask(task);
    onToggle();
  };

  const onToggleModal = () => {
    onToggle();
    selectTask({});
  };

  return (
    <div className="home">
      <MainWork onEditTask={onEditTask} />
      <div className="d-flex container-buttons">
        <Button
          text="ADD"
          icon={IoMdAdd}
          onClick={onToggle}
          className="mb-2 mr-2"
        />
        <Select
          disabledDefault={false}
          id="duration-choice"
          value={durationType}
          name="durationChoice"
          placeholder="Sort by duration"
          onChange={(type) => setDurationType(type)}
          options={selectOptions}
          required
          disabled={tasks?.length <= 2}
        />
      </div>
      <DragList
        onEditTask={onEditTask}
        typeSort={durationType}
        setTypeSort={setDurationType}
      />
      <ModalFormTask data={task} isOpen={isOpen} onToggle={onToggleModal} />
    </div>
  );
};

export default Home;
