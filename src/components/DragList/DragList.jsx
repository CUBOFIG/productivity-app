import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { PiDotsNine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../Modal/Modal";
import classNames from "classnames";
import { convertSecondsToTimeFormat } from "../../Utils/mixin";

const DragList = ({ onEditTask }) => {
  const dispatch = useDispatch();

  const stateListElements = useSelector((state) => state.global.tasks);
  const currentTask = useSelector((state) => state.global.currentTask);

  const [rows, setRows] = useState([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const deleteId = useRef(null);

  const tableClass = classNames({
    "bg-dark": rows?.length === 0,
  });

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);

    if (e.source.index === 0 && e.destination.index === 0) return;

    const isInitialTask = e.destination.index === 0 || e.source.index === 0;

    isInitialTask && currentTask?.id
      ? dispatch({ type: "global/changeTask", payload: e.destination.index })
      : dispatch({ type: "global/updateTasks", payload: tempData });
  };

  const deleteElement = (id) => () => {
    deleteId.current = id;
    setIsOpenDelete(true);
  };

  const selectTask = (id) => () => {
    const data = stateListElements.find((e) => e.id === id);
    const newData = stateListElements.filter((e) => e.id !== id);
    const a = [data, ...newData];

    dispatch({ type: "global/updateTasks", payload: a });
    dispatch({ type: "global/selectTask", payload: id });
  };

  const editTask = (task) => () => {
    onEditTask(task);
  };

  useEffect(() => {
    setRows(stateListElements || []);
  }, [stateListElements]);

  return (
    <>
      <div className="drag-list">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className={tableClass}>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <tbody ref={provider.innerRef} {...provider.droppableProps}>
                  {rows.length >= 1 ? (
                    rows.map((row, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={row.id}
                        index={index}
                      >
                        {(provider) => (
                          <tr
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                            {...provider.dragHandleProps}
                          >
                            <td data-label="Description">
                              <div className="d-flex flex-center">
                                <PiDotsNine className="mr-1" />
                                <p>{row.description}</p>
                              </div>
                            </td>
                            <td data-label="Duration">
                              {convertSecondsToTimeFormat(row?.duration) || ""}
                            </td>
                            <td data-label="Actions">
                              <div className="actions">
                                <FaPlay
                                  onClick={selectTask(row.id)}
                                  className={
                                    currentTask?.id === row.id ? "active" : ""
                                  }
                                />

                                <div>
                                  <MdEdit
                                    onClick={editTask(row)}
                                    className="mr-1"
                                  />
                                  <MdDelete onClick={deleteElement(row.id)} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <tr className="no-tasks">
                      <td colSpan="3">
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
      </div>

      <Modal
        onToggle={() => setIsOpenDelete((prev) => !prev)}
        isOpen={isOpenDelete}
        isSimpleModal
        discard={() => (deleteId.current = null)}
        done={() => {
          dispatch({ type: "global/deleteTask", payload: deleteId.current });
        }}
        buttonTextConfirm="Delete"
        buttonTextCancel="Cancel"
        messageModal="Are you sure you want to delete this task?"
      />
    </>
  );
};

DragList.propTypes = {
  onEditTask: PropTypes.func.isRequired,
};

export default DragList;
