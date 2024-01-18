import { VictoryLabel, VictoryTooltip, VictoryPie } from 'victory';
import { processDataTooltipGraph } from '../../utils/mixin';

const CustomLabel = (props) => (
  <g>
    <VictoryLabel {...props} />
    <VictoryTooltip
      {...props}
      x={200}
      y={250}
      orientation="top"
      pointerLength={0}
      cornerRadius={50}
      flyoutWidth={100}
      flyoutHeight={100}
      flyoutStyle={{ fill: '#646cff' }}
      text={({ datum }) => `amount: ${datum.x}`}
    />
  </g>
);

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const TooltipGraph = ({ data }) => {
  const objTask = processDataTooltipGraph(data);

  console.log(objTask);

  return (
    <div className="chart">
      <VictoryPie
        style={{ labels: { fill: 'white' } }}
        innerRadius={100}
        labelRadius={120}
        labels={({ datum }) => `${datum.y}`}
        labelComponent={<CustomLabel />}
        data={objTask.data}
      />
    </div>
  );
};

export default TooltipGraph;
