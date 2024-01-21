import { useSelector } from 'react-redux';
import { FloatingTimer, TableCountTasks, TooltipGraph } from '../../components';
import useTimeSaved from '../../hooks/useTimeSaved';

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
              <TableCountTasks data={tasks} />
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
