import { useSelector } from 'react-redux';
import { FloatingTimer, TooltipGraph } from '../../components';
import { useState, useEffect } from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import { processData } from '../../utils/mixin';
import useTimeSaved from '../../hooks/useTimeSaved';

const Tabla = ({ data }) => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const processedData = processData(data);
    setTaskData(processedData);
  }, [data]);

  return (
    <div className="chart">
      <VictoryChart
        height={400}
        width={400}
        domainPadding={{ x: 50, y: [0, 20] }}
        containerComponent={<VictoryVoronoiContainer />}
        style={{
          parent: {
            background: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          },
        }}
      >
        <VictoryAxis
          fixLabelOverlap={true}
          tickValues={taskData.map((d) => d.x)}
          style={{
            tickLabels: { angle: -45, fontSize: 10, textAnchor: 'end' },
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          horizontal={true}
          style={{ data: { fill: 'tomato' } }}
          data={taskData}
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => `Tareas completadas: ${datum.y}`}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: () => ({ active: true }),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: () => ({ active: false }),
                    },
                  ];
                },
              },
            },
          ]}
        />
      </VictoryChart>
    </div>
  );
};

const Dashboard = () => {
  const tasks = useSelector((state) => state.global.endTasks);
  const minutos = useTimeSaved(tasks);

  return (
    <div className="dashboard">
      <FloatingTimer />
      <h2 className="mb-2 mt-4">Dashboard</h2>
      {tasks.length > 0 ? (
        <>
          <div className="dashboard__container">
            <div>
              <h3>{minutos}</h3>
              <h3>{`Total tasks: ${tasks?.length}`}</h3>
            </div>
            <div>
              <Tabla data={tasks} />
              <TooltipGraph data={tasks} />
            </div>
          </div>
        </>
      ) : (
        <p>No tasks completed</p>
      )}
    </div>
  );
};

export default Dashboard;
