import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Task from "./Task";
import TaskModal from "./TaskModal";
import listAPI from "../api/listAPI";
import taskAPI from "../api/taskAPI";
import { useList } from "../store/listState";
import { useTask } from "../store/taskState";
import { DEFAULT_FILTER } from "../util/constant";


const Main = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(DEFAULT_FILTER);
    const [selectedTask, setSelectedTask] = useState(null);

    const { tasks, setTask, toggleCompleted } = useTask();
    const { activeListId, setList } = useList();

    // マウント時にAPIをコールしすべてのデータを一括で取得する
    useEffect(() => {
        (async () => {
            const taskData = await taskAPI.fetchTasks();
            setTask(taskData);
            const listData = await listAPI.fetchLists();
            setList(listData);
        })();
    }, []);

    const activeListTasks = tasks
        .filter(task => task.listId === activeListId)
        .filter(task => activeFilter === "all"
            || (activeFilter === "active" && !task.completed)
            || (activeFilter === "completed" && task.completed)
        );

    const selectTask = (task) => {
        setSelectedTask(task);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedTask(null);
        setModalIsOpen(false);
    }

    return (
        <>
            <Header />
            <main>
                {activeListTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        selectTask={selectTask}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </main>
            <Footer
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                setModalIsOpen={setModalIsOpen}
            />
            <TaskModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                selectedTask={selectedTask}
            />
        </>
    );
}


export default Main;