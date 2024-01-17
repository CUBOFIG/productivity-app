export const convertTimeToSeconds = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours * 60 + minutes) * 60;
};

export const convertSecondsToTimeFormat = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return [hours, minutes, seconds].map((val) => `0${val}`.slice(-2)).join(":");
};

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const generateFakeTasks = () => {
  const data = [];
  const maxDuration = 7200;
  const totalTasks = 50;
  const today = new Date();
  const codeSection = generateRandomCode();

  for (let i = 0; i < totalTasks; i++) {
    const duration = Math.floor(Math.random() * maxDuration);
    const remainingTime = Math.floor(Math.random() * duration * 0.2);

    const daysToSubtract = Math.floor(Math.random() * 7);
    const taskDate = new Date();
    taskDate.setDate(today.getDate() - daysToSubtract - 1);

    data.push({
      id: crypto.randomUUID(),
      description: `Task-${codeSection}-${i}`,
      duration: duration,
      durationReset: 0,
      remainingTime: remainingTime,
      completedAt: taskDate.toISOString(),
    });
  }

  return data;
};
