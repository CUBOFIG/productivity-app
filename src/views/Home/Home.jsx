import { IoMdAdd } from 'react-icons/io';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import { DragList, MainWork, ModalFormTask, Button } from '../../components';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, selectTask] = useState({});

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
      <MainWork />
      <Button text="ADD" icon={<IoMdAdd />} onClick={onToggle} />
      <DragList onEditTask={onEditTask} />
      <ModalFormTask data={task} isOpen={isOpen} onToggle={onToggleModal} />
    </div>
  );
};

export default Home;
