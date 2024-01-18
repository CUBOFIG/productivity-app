import { useMemo } from 'react';

const useTimeSaved = (data) => {
  const timeSaved = useMemo(() => {
    if (!data || data.length === 0) {
      return 'You saved 0 minutes';
    }

    const totalSeconds = data.reduce(
      (acc, item) => acc + (item.remainingTime || 0),
      0,
    );

    const minutes = totalSeconds / 60;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    let timeString = 'You saved ';
    if (hours > 0) {
      timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (hours > 0 && remainingMinutes > 0) {
      timeString += '  and ';
    }
    if (remainingMinutes > 0 || hours === 0) {
      timeString += `${remainingMinutes} ${
        remainingMinutes === 1 ? 'minute' : 'minutes'
      }`;
    }

    return timeString;
  }, [data]);

  return timeSaved;
};

export default useTimeSaved;
