import { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useTimer from '../../hooks/useTimer';
import { IconButton, Button, Modal } from '..';
import { GrPowerReset } from 'react-icons/gr';

const MainWork = ({ onEditTask }) => {
  const dispatch = useDispatch();

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const currentTask = useSelector((state) => state.global.currentTask);
  const switchChange = useSelector((state) => state.global.actions.changeTask);
  const { time, setTime, timerOn, setTimerOn, isComplete } = useTimer();

  const currentTaskRef = useRef(currentTask);
  const timeRef = useRef(null);
  const isPlayRef = useRef(false);

  const startTimer = () => setTimerOn(true);
  const pauseTimer = () => setTimerOn(false);
  const resetTimer = () => {
    setTime(currentTask?.initialDuration || 0);
    setTimerOn(false);
  };

  const onCompleteTask = () => {
    dispatch({
      type: 'global/completeCurrentTask',
      payload: {
        ...currentTask,
        remainingTime: time,
      },
    });

    setTime(0);
    setTimerOn(false);
  };

  const onDeleteTask = () => {
    setIsOpenDelete(true);
  };

  const onEdit = () => {
    onEditTask(currentTask);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((val) => `0${val}`.slice(-2))
      .join(':');
  };

  const saveTask = () => {
    if (!currentTask.id) return;

    const data = {
      ...currentTask,
      duration: timeRef.current,
      isInProgress: false,
    };

    dispatch({
      type: 'global/updateTasksWithId',
      payload: {
        data,
        tasks: switchChange?.data,
      },
    });
    setTime(0);
    setTimerOn(false);
  };

  useEffect(() => {
    if (!currentTask?.id) return;

    const data = {
      id: currentTask.id,
      description: currentTask.description,
      duration: currentTask?.duration,
    };

    setTime(data.duration);
    if (currentTask.isInProgress) setTimerOn(true);
  }, [currentTask]);

  useEffect(() => {
    if (isComplete) onCompleteTask();
  }, [isComplete]);

  useEffect(() => {
    currentTaskRef.current = currentTask;
    timeRef.current = time;
    isPlayRef.current = timerOn;
  }, [currentTask, time, timerOn]);

  const cleanup = useCallback(() => {
    if (currentTaskRef.current.id && timeRef.current && isPlayRef.current) {
      dispatch({
        type: 'global/updateCurrentTask',
        payload: {
          ...currentTaskRef.current,
          duration: timeRef.current,
          isInProgress: isPlayRef.current,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  //Este useEffect es para cuando se cambia de elemento en el listado, si cambia el currentTask por otro, se guarda el tiempo trabajado.
  useEffect(() => {
    if (switchChange?.switch) saveTask();
  }, [switchChange]);

  //Esta seccion de codigo es para guardar la info del currentTask trabajado en el localstorage, para que no se pierda si se recarga la pagina.
  const local = useRef(false);

  const saveData = () => {
    const dataToSave = {
      ...currentTaskRef.current,
      duration: timeRef.current,
      isInProgress: isPlayRef.current,
    };

    local.current = true;
    localStorage.setItem('master', JSON.stringify(dataToSave));
  };

  useEffect(() => {
    if (local.current) return;
    const handleBeforeUnload = () => saveData();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <section className="main-work">
        <header>
          <h1>{currentTask?.description || ''}</h1>
          <p>{formatTime()}</p>
        </header>
        <div className="main-work__section-control">
          <div className="main-actions">
            <IconButton
              icon={FaPlay}
              onClick={startTimer}
              isDisabled={!currentTask?.id}
              className={timerOn ? 'active' : ''}
            />
            <IconButton
              icon={FaPause}
              onClick={pauseTimer}
              isDisabled={!currentTask?.id}
              className={!timerOn ? 'active' : ''}
            />
            <IconButton
              icon={GrPowerReset}
              onClick={resetTimer}
              isDisabled={!currentTask?.id}
            />
          </div>

          <div className="main-actions-data">
            <Button
              text="Complete"
              icon={FaCircleCheck}
              className="mr-1"
              onClick={onCompleteTask}
              type="done"
              isDisabled={!currentTask?.id}
            />

            <Button
              className="mr-1"
              icon={MdDelete}
              onClick={onDeleteTask}
              ariaLabel="delete"
              type="delete"
              isDisabled={!currentTask?.id}
            />
            <Button
              icon={MdEdit}
              onClick={onEdit}
              ariaLabel="edit"
              type="edit"
              isDisabled={!currentTask?.id}
            />
          </div>
        </div>
      </section>

      <Modal
        onToggle={() => setIsOpenDelete((prev) => !prev)}
        isOpen={isOpenDelete}
        isSimpleModal
        done={() => {
          setTime(0);
          setTimerOn(false);
          dispatch({ type: 'global/deleteTask', payload: currentTask.id });
          dispatch({ type: 'global/deselectTask' });
        }}
        buttonTextConfirm="Delete"
        buttonTextCancel="Cancel"
        messageModal="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default MainWork;
