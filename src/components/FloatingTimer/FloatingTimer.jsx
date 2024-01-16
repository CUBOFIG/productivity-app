import { FaPause, FaPlay } from "react-icons/fa";
import IconButton from "../IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { formatTime } from "../../Utils/mixin";

const FloatingTimer = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.global.currentTask);
  const { time, setTime, setTimerOn } = useTimer();

  const currentTaskRef = useRef(currentTask);
  const timeRef = useRef(time);

  useEffect(() => {
    if (!currentTask?.id) return;
    setTime(currentTask.duration);
    setTimerOn(true);
  }, [currentTask, setTime, setTimerOn]); //changeTask

  useEffect(() => {
    currentTaskRef.current = currentTask;
    timeRef.current = time;
  }, [currentTask, time]);

  const formattedTime = useMemo(() => formatTime(time), [time]);

  const cleanup = useCallback(() => {
    if (
      currentTaskRef.current &&
      currentTaskRef.current.id &&
      timeRef.current
    ) {
      dispatch({
        type: "global/updateCurrentTask",
        payload: {
          id: currentTaskRef.current.id,
          description: currentTaskRef.current.description,
          duration: timeRef.current,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div className="floating-timer">
      <div>
        <p>{formattedTime}</p>
      </div>
      <div>
        <IconButton icon={FaPlay} />
        <IconButton icon={FaPause} />
      </div>
    </div>
  );
};

export default FloatingTimer;
