import React from 'react'
import Card from './Card'
import AddNewCard from './AddNewCard'
import { Droppable } from 'react-beautiful-dnd';
import { MdDeleteForever } from "react-icons/md";
import { useData } from '../store/ListSlice';

const ToDoList = (props) => {
    const { column, tasks } = props;
    const list = useData().data;
    const setList = useData().setData;
    const handleRemoveList =()=>{
        const filterColumn = list.columns;
        let filterTask = list.tasks;
        delete filterColumn[column.id]
        const filterColumnOrder = list.columnOrder.filter((columnId)=>columnId !== column.id)
        for(let value of tasks){
            delete filterTask[value.id]
        }
        const newList = {
            ...list,
            tasks: filterTask,
            columns: filterColumn,
            columnOrder: filterColumnOrder,
        }
        setList(newList);
        console.log(list)
    }

    return (
        <div className='p-3 bg-gray-100 w-1/3 toDoList-all'>
            <div className='toDoList-title'>
                <h3 className='toDoList-h3'>{column.title}</h3>
                <div className='toDoList-handle'></div>
                <MdDeleteForever className='icon-ToDoList' onClick={handleRemoveList}/>
            </div>
            <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => (

                    <div
                        className='toDoList-card's
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white'
                        }} >
                        {tasks && tasks.map((task, index) =>
                            <Card
                                key={task.id}
                                task={task}
                                index={index}
                                column={column} />)}
                        {provided.placeholder}
                    </div>

                )}

            </Droppable>
            <div className='p-3'>
                <AddNewCard idColumn={column.id}/>
            </div>
        </div>
    )
}

export default ToDoList