import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { PiDotsNine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { Tooltip } from "..";
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";

const DragList = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const stateListElements = useSelector((state) => state.global.tasks);
  const currentTask = useSelector((state) => state.global.currentTask);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);

    if (e.source.index === 0 && e.destination.index === 0) return;

    const conditionalInitial =
      e.destination.index === 0 || e.source.index === 0;

    dispatch({ type: "global/updateTasks", payload: tempData });
    if (conditionalInitial) dispatch({ type: "global/changeTask" });
  };

  const deleteElement = (id) => () => {
    dispatch({ type: "global/deleteTask", payload: id });
  };

  const selectTask = (id) => () => {
    dispatch({ type: "global/selectTask", payload: id });
  };

  const editTask = (task) => () => {
    onEditTask(task);
  };

  useEffect(() => {
    setRows(stateListElements);
  }, [stateListElements]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <table className="drag-list">
        <thead>
          <tr>
            <th colSpan={2}>Description</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <Droppable droppableId="droppable-1">
          {(provider) => (
            <tbody ref={provider.innerRef} {...provider.droppableProps}>
              {rows.length >= 1 ? (
                rows.map((row, index) => (
                  <Draggable
                    key={row.description}
                    draggableId={row.description}
                    index={index}
                  >
                    {(provider) => (
                      <tr
                        key={row.description}
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                      >
                        <td {...provider.dragHandleProps} colSpan={2}>
                          <div className="d-flex flex-center">
                            <PiDotsNine className="mr-1" />
                            <p>{row.description}</p>
                          </div>
                        </td>
                        <td>
                          {row?.durationChoice?.duration || row.customDuration}
                        </td>
                        <td>
                          <div className="action-column">
                            <Tooltip text="Start">
                              <FaPlay
                                onClick={selectTask(row.id)}
                                className={
                                  currentTask?.id === row.id ? "active" : ""
                                }
                              />
                            </Tooltip>
                            <div>
                              <MdEdit onClick={editTask(row)} />
                              <MdDelete onClick={deleteElement(row.id)} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="no-tasks">
                    <div>
                      <FaInfoCircle />
                      <p>No tasks</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

DragList.propTypes = {
  onEditTask: PropTypes.func.isRequired,
};

export default DragList;
