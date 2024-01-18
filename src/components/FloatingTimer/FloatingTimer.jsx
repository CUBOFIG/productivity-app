import { useDispatch, useSelector } from 'react-redux';
import useTimer from '../../hooks/useTimer';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { formatTime } from '../../utils/mixin';
import { FaInfoCircle } from 'react-icons/fa';

const FloatingTimer = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.global.currentTask);
  const { time, setTime, setTimerOn } = useTimer();
  const currentTaskRef = useRef(currentTask);
  const timeRef = useRef(time);
  const local = useRef(false);

  useEffect(() => {
    if (!currentTask?.id) return;
    setTime(currentTask.duration);
    setTimerOn(true);
    currentTaskRef.current = currentTask;
  }, [currentTask, setTime, setTimerOn]);

  useEffect(() => {
    timeRef.current = time;
  }, [currentTask, time]);

  const formattedTime = useMemo(() => formatTime(time), [time]);

  const cleanup = useCallback(() => {
    if (currentTaskRef.current.id && timeRef.current) {
      dispatch({
        type: 'global/updateCurrentTask',
        payload: {
          ...currentTaskRef.current,
          duration: timeRef.current,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  //Esta seccion de codigo es para guardar la info del currentTask trabajado en el localstorage, para que no se pierda si se recarga la pagina.
  const saveData = () => {
    const dataToSave = {
      ...currentTaskRef.current,
      duration: timeRef.current,
      isInProgress: false,
    };

    if (!dataToSave?.id) return;

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

  //Si no esta en progreso el currentTask, no se muestra el floating timer.
  if (!currentTask?.isInProgress) return null;

  return (
    <div className="floating-timer">
      <div>
        <p>{formattedTime}</p>
        <FaInfoCircle />
      </div>
    </div>
  );
};

export default FloatingTimer;
