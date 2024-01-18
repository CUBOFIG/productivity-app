import { useSelector } from 'react-redux';
import { convertSecondsToTimeFormat, formatDate } from '../../utils/mixin';
import { FaInfoCircle } from 'react-icons/fa';

const TableHistory = () => {
  const endTasks = useSelector((state) => state.global.endTasks);

  const reversedEndTasks = [...endTasks].reverse();

  return (
    <div className="list">
      {reversedEndTasks.length >= 1 ? (
        reversedEndTasks.map((task) => (
          <div className="card" key={task?.id}>
            <div className="container-description">
              <label htmlFor="description">DESCRIPTION</label>
              <div className="d-flex flex-center">
                <p>{task.description}</p>
              </div>
            </div>
            <div className="container-info">
              <div>
                <label htmlFor="Duration">DURATION</label>
                {convertSecondsToTimeFormat(task?.duration)}
              </div>
              <div>
                <label htmlFor="Duration">TIME REMAINING</label>
                {convertSecondsToTimeFormat(task?.remainingTime)}
              </div>
              <div>
                <label htmlFor="End date">END DATE</label>
                {formatDate(task?.completedAt)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-tasks">
          <div>
            <FaInfoCircle />
            <p>No tasks</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHistory;
