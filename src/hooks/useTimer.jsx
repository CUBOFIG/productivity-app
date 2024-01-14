import { useState, useEffect } from 'react';

const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [timerOn, setTimerOn] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsComplete(true);
            setTimerOn(false);
            return 0;
          } else return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    if (time === initialTime) setIsComplete(false);
  }, [time, initialTime]);

  return { time, setTime, timerOn, setTimerOn, isComplete };
};

export default useTimer;
