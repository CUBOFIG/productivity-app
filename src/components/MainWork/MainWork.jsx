import { useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer";
import { IconButton, Button } from "..";
import { GrPowerReset } from "react-icons/gr";

const MainWork = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.global.currentTask);
  const countChange = useSelector((state) => state.global.actions.changeTask);
  const { time, setTime, setTimerOn, isComplete } = useTimer();

  const currentTaskRef = useRef(currentTask);
  const timeRef = useRef(time);

  const startTimer = () => setTimerOn(true);
  const pauseTimer = () => setTimerOn(false);
  const resetTimer = () => {
    setTime(currentTask?.duration);
    setTimerOn(false);
  };

  const onCompleteTask = () => {
    setTime(0);
    setTimerOn(false);
    dispatch({ type: "global/completeTask", payload: currentTask.id });
  };

  const onDeleteTask = () => {
    setTime(0);
    setTimerOn(false);
    dispatch({ type: "global/deleteTask", payload: currentTask.id });
    dispatch({ type: "global/deselectTask" });
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
    const data = {
      id: currentTask.id,
      description: currentTask.description,
      duration: currentTask?.duration,
    };

    dispatch({ type: "global/updateTask", payload: data });
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
    if (isComplete)
      dispatch({ type: "global/completeTask", payload: currentTask.id });
  }, [isComplete]);

  useEffect(() => {
    saveTask();
  }, [countChange]);

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
        console.log("entra");

        dispatch({
          type: "global/updateCurrentTask",
          payload: {
            id: currentTaskRef.current.id,
            description: currentTaskRef.current.description,
            duration: timeRef.current,
          },
        });
      }
    };
  }, [dispatch]);

  return (
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
          icon={<FaCircleCheck />}
          className="mr-1"
          onClick={onCompleteTask}
          type="done"
          isDisabled={!currentTask?.id}
        />
        <Button
          icon={<MdDelete />}
          onClick={onDeleteTask}
          ariaLabel="delete"
          type="delete"
          isDisabled={!currentTask?.id}
        />
      </div>
    </section>
  );
};

export default MainWork;
