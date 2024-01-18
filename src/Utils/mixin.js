// La funcion convertTimeToSeconds convierte un string de tiempo en segundos.

export const convertTimeToSeconds = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours * 60 + minutes) * 60;
};

// La funcion convertSecondsToTimeFormat convierte segundos en un string de tiempo.

export const convertSecondsToTimeFormat = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

// La funcion formatTime convierte segundos en un string de tiempo.

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return [hours, minutes, seconds].map((val) => `0${val}`.slice(-2)).join(':');
};

// la funcion generateRandomCode genera un codigo aleatorio de 3 letras, esta no se exporta porque solo se usa en la funcion generateFakeTasks.

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// La funcion generateFakeTasks genera un array de tareas falsas.

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

// La funcion sortByType ordena las tareas por tipo.

export const sortByType = (tasks, type) => {
  const order = {
    'id-short': ['id-short', 'id-medium', 'id-long'],
    'id-medium': ['id-medium', 'id-long', 'id-short'],
    'id-long': ['id-long', 'id-medium', 'id-short'],
  };

  const sortPriority = order?.[type] || null;

  if (sortPriority) {
    const typePriority = sortPriority.reduce((acc, type, index) => {
      acc[type] = index;
      return acc;
    }, {});

    const sortedArray = [...tasks].sort(
      (a, b) => typePriority[a.type] - typePriority[b.type],
    );

    return sortedArray;
  } else {
    const sortedArray = [...tasks].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });

    return sortedArray;
  }
};

// La funcion getInitialState obtiene el estado inicial de la aplicacion.

export const getInitialState = (defaultState) => {
  try {
    const persistedState = localStorage.getItem('state');
    const persistedMainState = localStorage.getItem('master');

    const newState = { ...defaultState };

    if (persistedState) {
      const data = JSON.parse(persistedState);
      newState.endTasks = data?.endTasks || [];
      newState.tasks = data?.tasks || [];
      newState.sortByType = data?.sortByType || '';
    }

    if (persistedMainState && newState.tasks?.length >= 1) {
      const mainData = JSON.parse(persistedMainState);
      newState.currentTask = mainData;
    }

    return newState;
  } catch (e) {
    return defaultState;
  }
};

// La funcion processData procesa los datos para el grafico de barras.

export const processData = (data) => {
  const counts = data.reduce((acc, task) => {
    if (!task.completedAt) return acc;
    const date = new Date(task.completedAt);
    const dayOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ][date.getDay()];
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  const today = new Date().getDay();
  const daysOrder = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const getDistanceToToday = (day) => {
    const index = daysOrder.indexOf(day);
    return (today - index + 7) % 7;
  };

  return Object.entries(counts)
    .map(([dayOfWeek, count]) => ({
      x: dayOfWeek,
      y: count,
    }))
    .sort((a, b) => getDistanceToToday(a.x) - getDistanceToToday(b.x));
};

// La funcion formatDate crea la fecha.

export const formatDate = (date) => {
  const originalDate = new Date(date);
  const day = originalDate.getDate().toString().padStart(2, '0');
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const year = originalDate.getFullYear().toString();

  return `${month}/${day}/${year}`;
};
