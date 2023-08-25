import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import Task from './Task';
import { taskState } from '../atoms/taskState';
import { taskSelector } from '../atoms/taskSelector';


const Top = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [_, setTodoList] = useRecoilState(taskState);
  const todoList = useRecoilValue(taskSelector);

  const handleCheck = (id, checked) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, done: checked} : todo));    
  }

  return (
    <>
      <Header/>
      {todoList?.map(todo => <Task key={todo.id} task={todo} handleCheck={handleCheck}/>)}
      <Footer
        setModalIsOpen={setModalIsOpen}
      />
      <Modal
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setTodoList={setTodoList}
        todoList={todoList}
      />
    </>
  );
}

export default Top;
