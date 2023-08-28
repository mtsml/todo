import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';


const Task = ({ task, selectTask, checkTask }) => {

    return (
        <div
            className="d-flex align-items-top m-1 p-2"
        >
            <MDBIcon
                far={!task.completed}
                className="pt-3"
                icon={task.completed ? "check" : "circle"}
                color={task.completed ? "primary" : "secondary"}
                size="lg"
                onClick={() => checkTask(task.id, !task.completed)}
            />
            <div
                className={`w-100 ms-3 border-bottom border-secondary fw-bold${task.completed ? " fw-light text-decoration-line-through" : ""}`}
                style={task.completed ? { textDecoration: "line-through", color: "rgb(159, 166, 178)" } : {}}
                onClick={() => selectTask(task)}
            >
                {task.title}
            </div>
        </div>
    )
}


export default Task;