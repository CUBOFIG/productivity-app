import { useEffect, useState } from "react";
import { processData } from "../../utils/mixin";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import PropTypes from "prop-types";

const TableCountTasks = ({ data }) => {
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
            background: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "5px",
          },
        }}
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
          style={{ data: { fill: "tomato" } }}
          data={taskData}
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => `Tareas completadas: ${datum.y}`}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => ({ active: true }),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "labels",
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

TableCountTasks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.any,
      y: PropTypes.any,
    })
  ).isRequired,
};

export default TableCountTasks;
