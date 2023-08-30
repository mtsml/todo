import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";


const Task = ({ task, selectTask, toggleCompleted }) => {

    return (
        <div
            className="d-flex align-items-center m-1 p-2"
        >
            <MDBIcon
                far={!task.completed}
                icon={task.completed ? "check" : "circle"}
                color={task.completed ? "primary" : "secondary"}
                size="lg"
                onClick={() => toggleCompleted(task.id)}
            />
            <div
                className={`w-100 ms-3 border-bottom border-secondary ${task.completed ? "fw-light text-decoration-line-through text-secondary" : "fw-bold"}`}
                onClick={() => selectTask(task)}
            >
                {task.title}
            </div>
        </div>
    )
}


export default Task;