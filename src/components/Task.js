import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';


const Task = ({ task, selectTask, checkTask }) => {

    return (
        <div
            className="d-flex align-items-center m-1 p-2"
        >
            <MDBIcon
                icon={task.done ? "check" : "circle-notch"}
                color={task.done ? "success" : "secondary"}
                size="lg"
                onClick={() => checkTask(task.id, !task.done)}
            />
            <div
                className="w-100 ms-3 border-bottom border-secondary"
                style={task.done ? { textDecoration: "line-through", color: "rgb(159, 166, 178)" } : {}}
                onClick={() => selectTask(task.id)}
            >
                {task.value}
            </div>
        </div>
    )
}


export default Task;