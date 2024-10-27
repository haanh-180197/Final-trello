import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useData } from '../store/ListSlice'

const AddNewCard = (props) => {
    const list = useData().data
    const setList = useData().setData
    const { idColumn } = props
    const [inputVal, setInputVal] = useState({
        content: ''
    })
    const [isFormVisible, setIsFormVisible] = useState(false)

    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setInputVal({ ...inputVal, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputVal.content) return

        if (!idColumn) {
            const newColumn = {
                id: uuidv4(),
                title: inputVal.content,
                taskIds: []
            }
            const updateList = {
                ...list,
                columns: {
                    ...list.columns,
                    [newColumn.id]: newColumn,
                },
                columnOrder: [...list.columnOrder, newColumn.id]
            }
            setList(updateList);
            setIsFormVisible(false);
            setInputVal({
                content: ''
            })
            return
        }

        const columnTasks = list.columns[idColumn]
        const newTask = {
            ...inputVal,
            id: uuidv4(),
        }
        const newColumn = {
            ...columnTasks,
            taskIds: [...columnTasks.taskIds, newTask.id]
        }
        const updateList = {
            ...list,
            tasks: {
                ...list.tasks,
                [newTask.id]: newTask
            },
            columns: {
                ...list.columns,
                [idColumn]: newColumn,
            }
        }
        setList(updateList)

        setIsFormVisible(false);
        setInputVal({
            content: ''
        })
    }

    const changeForm = () => {
        setIsFormVisible(!isFormVisible)
    }

    const { content } = inputVal

    return (
        <div>
            <button onClick={changeForm}>+ Add New</button>
            {isFormVisible && <form onSubmit={handleSubmit} className='mt-3'>
                <input type="text"
                    placeholder='Text Here'
                    value={content}
                    name='content'
                    onChange={handleChangeInput} />
                <button className='mt-3 p-5 py-1 bg-blue-500'>Save</button>
            </form>}
        </div>
    )
}

export default AddNewCard