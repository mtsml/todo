import React from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Footer from "./components/Footer";
import { taskState } from "./atoms/taskState";


const Detail = () => {
    const { id } = useLocation().state;
    const [tasks, setTasks] = useRecoilState(taskState);
    const task = tasks.find(task => task.id === id);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/");
        setTasks(tasks.filter(todo => todo.id !== id));
    }

    return (
        <>
            <h1 className="m-2">{task.value}</h1>
            <Button
                onClick={() => handleClick(id)}
                label="del"
            />
            <hr></hr>
            <p>
                {task.detail}
            </p>
            <Footer />
        </>
    )
}


export default Detail;