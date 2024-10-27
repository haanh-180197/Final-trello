import React from 'react'
import Filter from './Filter'
import ToDoList from './ToDoList'
import { useData } from '../store/ListSlice'
import { DragDropContext } from 'react-beautiful-dnd'
import AddNewCard from './AddNewCard'

const Body = () => {
    const list = useData().data
    const setList = useData().setData

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const columnStart = list.columns[source.droppableId]
        const columnFinish = list.columns[destination.droppableId]

        if (columnStart === columnFinish) {
            const newTaskIds = columnStart.taskIds;
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...columnStart,
                taskIds: newTaskIds
            };

            const newList = {
                ...list,
                columns: {
                    ...list.columns,
                    [newColumn.id]: newColumn,
                }
            }

            setList(newList)
            return;
        }

        const startTaskIds = columnStart.taskIds
        startTaskIds.splice(source.index, 1);
        const newColumnStart = {
            ...columnStart,
            taskIds: startTaskIds,
        }

        const finishTaskIds = columnFinish.taskIds
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newColumnFinish = {
            ...columnFinish,
            taskIds: finishTaskIds,
        }

        const newList = {
            ...list,
            columns: {
                ...list.columns,
                [newColumnStart.id]: newColumnStart,
                [newColumnFinish.id]: newColumnFinish,
            }
        }
        setList(newList);
    }


    return (
        <div className='body-style  p-3'>
            <Filter />
            <div className='flex gap-3 wrap'>
                <DragDropContext
                    onDragEnd={onDragEnd}>
                    {list && list.columnOrder.map(columnId => {
                        const column = list.columns[columnId]
                        const tasks = column.taskIds.map(taskId => list.tasks[taskId])
                        return <ToDoList
                            key={column.id}
                            column={column}
                            tasks={tasks} />
                    })}

                </DragDropContext>
                <div className=' w-1/3'>
                    <div className='p-3 bg-gray-200'>
                        <AddNewCard />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Body