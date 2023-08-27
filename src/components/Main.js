import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import TaskModal from './TaskModal';
import Task from './Task';
import { useTask } from '../atoms/taskState';


const Main = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { activeListTasks, checkTask } = useTask();

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
      <Header/>
      <main>
        {activeListTasks?.map(task => (
            <Task
                key={task.id}
                task={task}
                selectTask={selectTask}
                checkTask={checkTask}
            />
        ))}
      </main>
      <Footer
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
