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
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [_, setTodoList] = useRecoilState(taskState);
  const todoList = useRecoilValue(taskSelector);

  const handleCheck = (id, checked) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, done: checked} : todo));    
  }

  const selectTask = (id) => {
    setModalIsOpen(true);
    setSelectedTaskId(id);
  }

  const addTask = (title, detail) => {
    const id = crypto.randomUUID();
    setTodoList([...todoList, { id, value: title, detail, done: false, listId: 1 }]);
  }

  const updateTask = (id, title, detail) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, value: title, detail} : todo))
    setSelectedTaskId(null);
  }

  return (
    <>
      <Header/>
      {todoList?.map(todo => <Task
                                key={todo.id}
                                task={todo}
                                selectTask={selectTask}
                            />
      )}
      <Footer
        setModalIsOpen={setModalIsOpen}
      />
      <Modal
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedTask={todoList.find(task => task.id === selectedTaskId)}
        addTask={addTask}
        updateTask={updateTask}
      />
    </>
  );
}

export default Top;
