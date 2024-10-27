import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TbXboxX } from "react-icons/tb";
import { useData } from '../store/ListSlice';


const Card = (props) => {
    const { task, column, index } = props
    const list = useData().data
    const setList = useData().setData

    const handleDeleteTask = () => {
        const filterTasks = list.tasks;
        delete filterTasks[task.id];
        const filterTaskColumn = column.taskIds.filter((taskId) => taskId !== task.id)
        const newColumn = {
            ...column,
            taskIds: filterTaskColumn
        }
        console.log(filterTasks, filterTaskColumn)

        const newList = {
            ...list,
            tasks: {
                ...filterTasks,
            },
            columns: {
                ...list.columns,
                [column.id]: newColumn,
            }
        }
        setList(newList);

    }
    return (
        <Draggable draggableId={task.id} index={index} key={task.id}>
            {(provided, snapshot) => {
                const style = {
                    ...provided.draggableProps.style,
                    backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
                };
                return (
                    <div className='card-task shadow-md '
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} style={style}>
                        <div className='card-handle'></div>
                        <div className='card-content'>
                            {task.content}
                        </div>
                        <TbXboxX className='icon-card' onClick={handleDeleteTask} />
                    </div>
                )
            }}
        </Draggable>

    )
}

export default Card