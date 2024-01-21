import { useMemo } from 'react';

const useTimeSaved = (data) => {
  const timeSaved = useMemo(() => {
    if (!data || data.length === 0) {
      return 'You saved 0 minutes and 0 seconds';
    }

    const totalSeconds = data.reduce(
      (acc, item) => acc + (item.remainingTime || 0),
      0,
    );

    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const remainingSeconds = totalSeconds % 60;

    let timeString = 'You saved ';
    if (hours > 0) {
      timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'} `;
    }
    if (remainingMinutes > 0) {
      timeString += `${remainingMinutes} ${
        remainingMinutes === 1 ? 'minute' : 'minutes'
      } `;
    }
    if (remainingSeconds > 0 || (hours === 0 && remainingMinutes === 0)) {
      timeString += `${remainingSeconds} ${
        remainingSeconds === 1 ? 'second' : 'seconds'
      }`;
    }

    return timeString.trim();
  }, [data]);

  return timeSaved;
};

export default useTimeSaved;
