import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import {
  DragList,
  MainWork,
  ModalFormTask,
  Button,
  Select,
} from "../../components";
import { useDispatch } from "react-redux";

const selectOptions = [
  { id: "id-short", name: "Short duration" },
  { id: "id-medium", name: "Medium duration" },
  { id: "id-long", name: "Long duration" },
];

const Home = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [task, selectTask] = useState({});
  const [durationType, setDurationType] = useState(0);

  const onToggle = () => setIsOpen((prev) => !prev);

  const onEditTask = (task) => {
    selectTask(task);
    onToggle();
  };

  const onToggleModal = () => {
    onToggle();
    selectTask({});
  };

  const sortByDuration = (a) => {
    setDurationType(a);
    dispatch({ type: "global/sortByDuration", payload: a });
  };

  return (
    <div className="home">
      <MainWork />
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
          onChange={(e) => sortByDuration(e)}
          options={selectOptions}
          required
        />
      </div>
      <DragList onEditTask={onEditTask} />
      <ModalFormTask data={task} isOpen={isOpen} onToggle={onToggleModal} />
    </div>
  );
};

export default Home;
