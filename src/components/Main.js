import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Header from './Header';
import Footer from './Footer';
import TaskModal from './TaskModal';
import Task from './Task';
import { taskState } from '../atoms/taskState';
import { taskSelector } from '../atoms/taskSelector';
import { listState } from '../atoms/listState';


const Main = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [_, setTodoList] = useRecoilState(taskState);
  const todoList = useRecoilValue(taskSelector);
  const list = useRecoilValue(listState)
  const activeListId = list.find(l => l.isActive).id;

  const checkTask = (id, checked) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, done: checked} : todo));    
  }

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
      {todoList?.map(todo => (
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
        selectedTask={todoList.find(task => task.id === selectedTaskId)}
        activeListId={activeListId}
      />
    </>
  );
}

export default Main;
