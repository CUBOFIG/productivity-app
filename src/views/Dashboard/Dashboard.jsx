import { useSelector } from "react-redux";
import { FloatingTimer } from "../../components";
import { useState, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, Bar } from "victory";

const processData = (data) => {
  const counts = data.reduce((acc, task) => {
    if (!task.completedAt) return acc; // Ignora las tareas sin fecha de completado
    const date = new Date(task.completedAt);
    const dayOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ][date.getDay()];
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([dayOfWeek, count]) => ({
    x: dayOfWeek,
    y: count,
  }));
};

const Tabla = ({ data = [] }) => {
  const [clicked, setClicked] = useState(false);
  const [style, setStyle] = useState({ data: { fill: "tomato" } });
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    if (!data || data?.length === 0) {
      return;
    }

    const processedData = processData(data);
    setTaskData(processedData);
  }, [data]);

  const handleMouseOver = () => {
    const fillColor = clicked ? "blue" : "tomato";
    setClicked(!clicked);
    setStyle({ data: { fill: fillColor } });
  };

  return (
    <div>
      <VictoryChart
        height={400}
        width={400}
        domainPadding={{ x: 50, y: [0, 20] }}
      >
        <VictoryAxis
          fixLabelOverlap={true}
          tickValues={taskData.map((d) => d.x)}
          style={{
            tickLabels: { angle: -45, fontSize: 10, textAnchor: "end" },
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          horizontal={true}
          style={style}
          data={taskData}
          events={[
            {
              target: "data",
              eventHandlers: { onMouseOver: handleMouseOver },
            },
          ]}
        />
      </VictoryChart>
    </div>
  );
};

const Dashboard = () => {
  const tasks = useSelector((state) => state.global.endTasks);

  // function calculatePerformance(tasks) {
  //   let totalEfficiency = 0;
  //   tasks.forEach((task) => {
  //     const duration = task.duration;
  //     const remainingTime = task.remainingTime;
  //     const efficiency = (1 - remainingTime / duration) * 100;
  //     totalEfficiency += efficiency;
  //   });

  //   const averageEfficiency = totalEfficiency / tasks.length;
  //   return averageEfficiency;
  // }

  return (
    <div className="h-100 d-flex flex-column">
      <FloatingTimer />
      <Tabla data={tasks} />
      <h2 className="mb-2 mt-4">Dashboard</h2>
    </div>
  );
};

export default Dashboard;
