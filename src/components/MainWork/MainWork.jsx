import { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import useTimer from '../../hooks/useTimer';

const MainWork = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.global.currentTask);
  const { time, setTime, timerOn, setTimerOn, isComplete } = useTimer();

  const startTimer = () => setTimerOn(true);
  const pauseTimer = () => setTimerOn(false);
  const resetTimer = (logMessage) => {};

  const onCompleteTask = () => {
    setTime(0);
    setTimerOn(false);
    dispatch({ type: 'global/completeTask', payload: currentTask.id });
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((val) => `0${val}`.slice(-2))
      .join(':');
  };

  useEffect(() => {
    console.log('currentTask', currentTask);
    if (!currentTask?.id) return;

    const data = {
      id: currentTask.id,
      description: currentTask.description,
      duration:
        currentTask?.durationChoice?.duration || currentTask.customDuration,
    };

    setTime(data.duration);
  }, [currentTask]);

  useEffect(() => {
    if (isComplete)
      dispatch({ type: 'global/completeTask', payload: currentTask.id });
  }, [isComplete]);

  return (
    <section className="main-work">
      <header>
        <h1>{currentTask?.description || ''}</h1>
        <p>{formatTime()}</p>
      </header>
      <div>
        <div>
          <FaPlay onClick={startTimer} />
          <FaPause onClick={pauseTimer} />
        </div>

        <Button
          text="COMPLETE"
          icon={<FaCircleCheck />}
          className="mr-1"
          onClick={onCompleteTask}
        />
        <Button
          icon={<MdDelete />}
          onClick={() => resetTimer('Eliminado')}
          ariaLabel="delete"
        />
      </div>
    </section>
  );
};

export default MainWork;
