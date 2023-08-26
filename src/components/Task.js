import React from 'react';
import { MDBCheckbox } from 'mdb-react-ui-kit';


const Task = ({ task, handleCheck, selectTask }) => {

    return (
        <div
            className="d-flex m-1 p-2"
        >
            <MDBCheckbox
                inline
                checked={task.done}
                onChange={e => handleCheck(task.id, e.target.checked)}
            />
            <div
                className="w-100 border-bottom border-secondary"
                style={task.done ? { textDecoration: "line-through" } : {}}
                onClick={() => selectTask(task.id)}
            >
                {task.value}
            </div>
        </div>
    )
}


export default Task;