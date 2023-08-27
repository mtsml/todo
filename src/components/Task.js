import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';


const Task = ({ task, selectTask, checkTask }) => {

    return (
        <div
            className="d-flex align-items-top m-1 p-2"
        >
            <MDBIcon
                far={!task.done}
                className="pt-3"
                icon={task.done ? "check" : "circle"}
                color={task.done ? "primary" : "secondary"}
                size="lg"
                onClick={() => checkTask(task.id, !task.done)}
            />
            <div
                className={`w-100 ms-3 border-bottom border-secondary fw-bold${task.done ? " fw-light text-decoration-line-through" : ""}`}
                style={task.done ? { textDecoration: "line-through", color: "rgb(159, 166, 178)" } : {}}
                onClick={() => selectTask(task)}
            >
                {task.value}
            </div>
        </div>
    )
}


export default Task;