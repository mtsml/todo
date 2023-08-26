import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import TaskModal from './TaskModal';
import Task from './Task';
import { useTask } from '../atoms/taskState';
import { useList } from '../atoms/listState';


const Main = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { activeListTasks, checkTask } = useTask();
  const { activeListId } = useList();

  const selectTask = (id) => {
    setSelectedTaskId(id);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTaskId(null);
  }

  return (
    <>
      <Header/>
      <main>
        {activeListTasks?.map(todo => (
            <Task
                key={todo.id}
                task={todo}
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
        selectedTask={activeListTasks.find(task => task.id === selectedTaskId)}
        activeListId={activeListId}
      />
    </>
  );
}

export default Main;
