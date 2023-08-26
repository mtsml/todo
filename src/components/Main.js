import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import Task from './Task';
import { taskState } from '../atoms/taskState';
import { taskSelector } from '../atoms/taskSelector';


const Main = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [_, setTodoList] = useRecoilState(taskState);
  const todoList = useRecoilValue(taskSelector);

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
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        selectedTask={todoList.find(task => task.id === selectedTaskId)}
      />
    </>
  );
}

export default Main;
