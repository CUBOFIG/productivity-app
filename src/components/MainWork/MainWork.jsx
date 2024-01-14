import { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import Button from '../Button/Button';

const useTimer = (initialTime = 1000) => {
  const [time, setTime] = useState(initialTime);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    timerOn
      ? (interval = setInterval(
          () => setTime((prevTime) => prevTime - 1),
          1000,
        ))
      : clearInterval(interval);

    return () => clearInterval(interval);
  }, [timerOn]);

  return { time, setTime, timerOn, setTimerOn };
};

const MainWork = () => {
  const { time, setTime, timerOn, setTimerOn } = useTimer(1000);

  const startTimer = () => setTimerOn(true);
  const pauseTimer = () => setTimerOn(false);
  const resetTimer = (logMessage) => {
    setTime(0);
    setTimerOn(false);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((val) => `0${val}`.slice(-2))
      .join(':');
  };

  return (
    <section className="main-work">
      <header>
        <h1>Conseguir las tareas completas para analizarlassss</h1>
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
          onClick={() => resetTimer('Completado')}
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
