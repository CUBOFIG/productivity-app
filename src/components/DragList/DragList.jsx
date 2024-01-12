import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { PiDotsNine } from 'react-icons/pi';

export default function BasicTable() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const [rows, setRows] = useState([
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbrea2d', 356, 16.0, 49, 3.9),
    createData('Gingerbr23ead', 356, 16.0, 49, 3.9),
    createData('Gingerbr34ead', 356, 16.0, 49, 3.9),
    createData('Gingerb12read', 356, 16.0, 49, 3.9),
  ]);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };

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
              {rows.map((row, index) => (
                <Draggable key={row.name} draggableId={row.name} index={index}>
                  {(provider) => (
                    <tr
                      key={row.name}
                      {...provider.draggableProps}
                      ref={provider.innerRef}
                    >
                      <td {...provider.dragHandleProps} colSpan={2}>
                        <div className="d-flex flex-center">
                          <PiDotsNine className="mr-1" />
                          {row.name}
                        </div>
                      </td>
                      <td>{row.fat}</td>
                      <td>{row.carbs}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
}
