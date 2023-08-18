import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCheckbox } from 'mdb-react-ui-kit';


const Task = ({ task, handleCheck }) => {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex p-2 border-top border-bottom border-secondary"
            onClick={() => navigate("/detail", { state: task })}
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