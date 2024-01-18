import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { PiDotsNine } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { FaCircleCheck } from 'react-icons/fa6';
import { convertSecondsToTimeFormat, sortByType } from '../../utils/mixin';

//Componente DragList que recibe como props un onEditTask, un typeSort y un setTypeSort, principalmente.
// El uso del onEditTask es para editar una tarea, el typeSort es para ordenar las tareas por tipo y el setTypeSort es para establecer el tipo de ordenamiento.
//Se pasaron por aqui para simplificar el componente MainWork.jsx

const DragList = ({ onEditTask, typeSort, setTypeSort }) => {
  const dispatch = useDispatch();
  const stateListElements = useSelector((state) => state.global.tasks);
  const [rows, setRows] = useState([]);
  const currentTask = useSelector((state) => state.global.currentTask);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const deleteId = useRef(null);
  const useDragRef = useRef(false);

  //Funcion handleDragEnd que recibe como parametro un drag y que se encarga de ordenar las tareas.
  const handleDragEnd = (drag) => {
    if (!drag.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(drag.source.index, 1);
    tempData.splice(drag.destination.index, 0, source_data);

    //Con la siguiente condicional verificamos si el indice de la tarea es 0 y si el indice de destino es 0, si se movio en el mismo lugar no se hace nada.
    if (drag.source.index === 0 && drag.destination.index === 0) return;

    //Con la condicional siguiente verificamos si el indice de destino es 0 o si el indice de origen es 0, si se movio al inicio de la lista o si se movio desde el inicio de la lista, significa que se movio el currentTask.
    const isInitialTask =
      drag.destination.index === 0 || drag.source.index === 0;

    //Dependiende de si se movio el currentTask o no, se hace un dispatch diferente, el primero es para mover el currentTask y guardar los cambios del timer y el segundo es para mover una tarea cualquiera.
    if (isInitialTask && currentTask?.id) {
      dispatch({ type: 'global/changeTask', payload: tempData });
    } else {
      dispatch({ type: 'global/updateTasks', payload: tempData });
    }
    useDragRef.current = true;
    setTypeSort(null);
  };

  //metodos para eliminar, completar, seleccionar y editar una tarea.

  const deleteElement = (id) => () => {
    deleteId.current = id;
    setIsOpenDelete(true);
  };

  const completeElement = (task) => {
    return () => {
      dispatch({ type: 'global/completeListTask', payload: task });
    };
  };

  const selectTask = (id) => () => {
    const data = rows.find((e) => e.id === id);
    const newData = rows.filter((e) => e.id !== id);
    const a = [data, ...newData];

    dispatch({ type: 'global/changeTask', payload: a });
  };

  const editTask = (task) => () => {
    onEditTask(task);
  };

  //-------------------------------------------------------------------

  //useEffect que se encarga de ordenar las tareas por tipo y recibirlas.
  useEffect(() => {
    let data = stateListElements;

    if (typeSort && stateListElements.length > 1) {
      const current = stateListElements.find((e) => e.id === currentTask?.id);
      const restTasks = stateListElements.filter(
        (e) => e.id !== currentTask?.id,
      );

      data = sortByType(restTasks, typeSort);
      data = [current, ...data];
    }

    setRows(data);

    if (stateListElements.length >= 1 && !currentTask?.id) {
      dispatch({ type: 'global/selectTask' });
    }
  }, [stateListElements, typeSort, currentTask]);

  return (
    <>
      <div className="list">
        <DragDropContext onDragEnd={handleDragEnd}>
          <>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <div ref={provider.innerRef} {...provider.droppableProps}>
                  {rows.length >= 1 ? (
                    rows.map((row, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={row.id}
                        index={index}
                      >
                        {(provider) => (
                          <div
                            className="card"
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                            {...provider.dragHandleProps}
                          >
                            <div className="container-description">
                              <label htmlFor="description">DESCRIPTION</label>
                              <div className="d-flex flex-center">
                                <PiDotsNine className="mr-1" />
                                <p>{row.description}</p>
                              </div>
                            </div>
                            <div className="container-info">
                              <div>
                                <label htmlFor="Type">TYPE</label>
                                {`${row?.type?.slice(3)?.toUpperCase()} TASK`}
                              </div>
                              <div>
                                <label htmlFor="Duration">DURATION</label>
                                {convertSecondsToTimeFormat(row?.duration) ||
                                  ''}
                              </div>
                              <div>
                                <div className="actions">
                                  <label htmlFor="Actions">ACTIONS</label>
                                  <div>
                                    <FaPlay onClick={selectTask(row.id)} />
                                    <div>
                                      <MdEdit
                                        onClick={editTask(row)}
                                        className="mr-1"
                                      />
                                      <MdDelete
                                        onClick={deleteElement(row.id)}
                                      />
                                      <FaCircleCheck
                                        onClick={completeElement(row)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
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
              )}
            </Droppable>
          </>
        </DragDropContext>
      </div>

      <Modal
        onToggle={() => setIsOpenDelete((prev) => !prev)}
        isOpen={isOpenDelete}
        isSimpleModal
        discard={() => (deleteId.current = null)}
        done={() => {
          dispatch({ type: 'global/deleteTask', payload: deleteId.current });
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
