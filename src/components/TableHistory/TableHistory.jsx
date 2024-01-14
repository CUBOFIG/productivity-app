import React from 'react';
import { useSelector } from 'react-redux';

const TableHistory = () => {
  const endTasks = useSelector((state) => state.global.endTasks);

  const formatDate = (date) => {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear().toString();

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="table-history">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Description</th>
            <th>Duration</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
          {endTasks.length >= 1 ? (
            endTasks.map((task) => (
              <tr key={task.description}>
                <td colSpan={2}>
                  <div className="d-flex flex-center">
                    <p>{task.description}</p>
                  </div>
                </td>
                <td>{task?.durationChoice?.duration || task.customDuration}</td>
                <td>{formatDate(task?.completedAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No tasks</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
