import React from 'react';
import { MDBCheckbox } from 'mdb-react-ui-kit';


const Task = ({ task, handleCheck, selectTask }) => {

    return (
        <div
            className="d-flex m-1 p-2 border border-secondary rounded"
            onClick={() => selectTask(task.id)}
        >
            <MDBCheckbox
                inline
                checked={task.done}
                onChange={e => handleCheck(task.id, e.target.checked)}
            />
            <span
                style={task.done ? { textDecoration: "line-through" } : {}}
            >
                {task.value}
            </span>
        </div>
    )
}


export default Task;