import { IoMdAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import {
  DragList,
  MainWork,
  ModalFormTask,
  Button,
  Select,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { sortByType } from '../../utils/mixin';

const selectOptions = [
  { id: 'id-short', name: 'Short duration' },
  { id: 'id-medium', name: 'Medium duration' },
  { id: 'id-long', name: 'Long duration' },
];

const Home = () => {
  const dispatch = useDispatch();

  //Se traen las tareas del estado global al igual que la tarea actual.
  const tasks = useSelector((state) => state.global.tasks);
  const currentTask = useSelector((state) => state.global.currentTask);
  //Se crean los estados para el modal y la tarea seleccionada.
  const [isOpen, setIsOpen] = useState(false);
  const [task, selectTask] = useState({});
  //Se crea el estado para el tipo de duracion.
  const [durationType, setDurationType] = useState(null);
  //Se crea la funcion para abrir y cerrar el modal.
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

  //Se crea la funcion para ordenar las tareas por tipo de duracion, se usa el mixin para eso, elegi esta opcion enves de crear un estado nuevo para almacenar las tareas ordenadas.

  const sortData = (tasksList) => {
    let data = tasksList;

    if (durationType && tasksList.length > 2) {
      const current = tasksList.find((e) => e.id === currentTask?.id);
      const restTasks = tasksList.filter((e) => e.id !== currentTask?.id);

      data = sortByType(restTasks, durationType);
      data = [current, ...data];
    }

    return data || [];
  };

  useEffect(() => {
    if (tasks.length >= 1 && !currentTask?.id)
      dispatch({ type: 'global/selectTask' });
  }, [tasks]);

  return (
    <div className="home">
      <MainWork onEditTask={onEditTask} currentTask={currentTask} />
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
        tasks={sortData(tasks)}
        typeSort={durationType}
        currentTask={currentTask}
      />
      <ModalFormTask data={task} isOpen={isOpen} onToggle={onToggleModal} />
    </div>
  );
};

export default Home;
