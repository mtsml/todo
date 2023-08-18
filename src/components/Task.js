import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCheckbox } from 'mdb-react-ui-kit';


const Task = ({ task, handleCheck }) => {
    return (
        <div className="d-flex p-2 border-top border-bottom border-secondary">
            <MDBCheckbox
                inline
                checked={task.done}
                onChange={e => handleCheck(task.id, e.target.checked)}
            />
            <Link
                style={task.done ? { textDecoration: "line-through" } : {}}
                to="/detail"
                state={task}
            >
                {task.value}
            </Link>
        </div>
    )
}


export default Task;