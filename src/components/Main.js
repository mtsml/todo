import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import TaskModal from './TaskModal';
import Task from './Task';
import taskAPI from '../api/taskAPI';
import { useTask } from '../store/taskState';
import { useList } from '../store/listState';


const Main = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("active");
    const [selectedTask, setSelectedTask] = useState(null);

    const { tasks, setTask, updateTask } = useTask();
    const { activeListId } = useList();

    useEffect(() => {
        (async () => {
            const data = await taskAPI.fetchTasks();
            setTask(data);
        })();
    }, []);

    const activeListTasks = tasks
        .filter(task => task.listId === activeListId)
        .filter(task => activeFilter === "all"
            || (activeFilter === "active" && !task.completed)
            || (activeFilter === "completed" && task.completed)
        );

    const checkTask = (id, completed) => {
        updateTask(id, { completed })
    }

    const selectTask = (task) => {
        setSelectedTask(task);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTask(null);
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
                        checkTask={checkTask}
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