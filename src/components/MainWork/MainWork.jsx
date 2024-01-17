import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer";
import { IconButton, Button, Modal } from "..";
import { GrPowerReset } from "react-icons/gr";

const MainWork = () => {
  const dispatch = useDispatch();

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const currentTask = useSelector((state) => state.global.currentTask);
  const switchChange = useSelector((state) => state.global.actions.changeTask);
  const { time, setTime, setTimerOn, isComplete } = useTimer();

  const currentTaskRef = useRef(currentTask);
  const timeRef = useRef(null);

  const startTimer = () => setTimerOn(true);
  const pauseTimer = () => setTimerOn(false);
  const resetTimer = () => {
    setTime(currentTask?.initialDuration || 0);
    setTimerOn(false);
  };

  const onCompleteTask = () => {
    setTime(0);
    setTimerOn(false);
    dispatch({ type: "global/completeTask", payload: currentTask.id });
  };

  const onDeleteTask = () => {
    setIsOpenDelete(true);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((val) => `0${val}`.slice(-2))
      .join(":");
  };

  const saveTask = () => {
    if (!currentTask.id) return;

    const data = {
      ...currentTask,
      duration: timeRef.current,
    };

    dispatch({
      type: "global/updateTasksWithId",
      payload: {
        data,
        index: switchChange?.index,
      },
    });
    dispatch({ type: "global/deselectTask" });
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
    setTimerOn(true);
  }, [currentTask]);

  useEffect(() => {
    if (isComplete) onCompleteTask();
  }, [isComplete]);

  useEffect(() => {
    currentTaskRef.current = currentTask;
    timeRef.current = time;
  }, [currentTask, time]);

  useEffect(() => {
    return () => {
      if (
        currentTaskRef.current &&
        currentTaskRef.current.id &&
        timeRef.current
      ) {
        dispatch({
          type: "global/updateCurrentTask",
          payload: {
            ...currentTaskRef.current,
            id: currentTaskRef.current.id,
            description: currentTaskRef.current.description,
            duration: timeRef.current,
          },
        });
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (switchChange?.switch) saveTask();
  }, [switchChange]);

  const local = useRef(false);

  const saveData = () => {
    const dataToSave = {
      ...currentTaskRef.current,
      duration: timeRef.current,
    };

    local.current = true;
    localStorage.setItem("master", JSON.stringify(dataToSave));
  };

  useEffect(() => {
    if (local.current) return;

    const handleBeforeUnload = () => saveData();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <section className="main-work">
        <header>
          <h1>{currentTask?.description || ""}</h1>
          <p>{formatTime()}</p>
        </header>
        <div className="main-work__section-control">
          <div className="d-flex">
            <IconButton
              icon={FaPlay}
              onClick={startTimer}
              isDisabled={!currentTask?.id}
            />
            <IconButton
              icon={FaPause}
              onClick={pauseTimer}
              isDisabled={!currentTask?.id}
            />
            <IconButton
              icon={GrPowerReset}
              onClick={resetTimer}
              isDisabled={!currentTask?.id}
            />
          </div>

          <Button
            text="Complete"
            icon={FaCircleCheck}
            className="mr-1"
            onClick={onCompleteTask}
            type="done"
            isDisabled={!currentTask?.id}
          />

          <Button
            icon={MdDelete}
            onClick={onDeleteTask}
            ariaLabel="delete"
            type="delete"
            isDisabled={!currentTask?.id}
          />
        </div>
      </section>

      <Modal
        onToggle={() => setIsOpenDelete((prev) => !prev)}
        isOpen={isOpenDelete}
        isSimpleModal
        done={() => {
          setTime(0);
          setTimerOn(false);
          dispatch({ type: "global/deleteTask", payload: currentTask.id });
          dispatch({ type: "global/deselectTask" });
        }}
        buttonTextConfirm="Delete"
        buttonTextCancel="Cancel"
        messageModal="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default MainWork;
