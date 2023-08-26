import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    MDBBtn,
    MDBInput,
    MDBTextArea
} from 'mdb-react-ui-kit'
import Modal from './Modal';
import { taskState } from '../atoms/taskState';
import { listState } from '../atoms/listState';


const TaskModal = ({isOpen, closeModal, selectedTask, activeListId}) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [listId, setListId] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [todoList, setTodoList] = useRecoilState(taskState);
    const lists = useRecoilValue(listState);

    const callback = () => {
        if (selectedTask) {
            setTitle(selectedTask.value);
            setDetail(selectedTask.detail);
            setListId(selectedTask.listId)
            setIsEditMode(true);
        } else {
            setListId(activeListId);
        }
    }

    const addTask = () => {
        const id = crypto.randomUUID();
        const newTodoList = [...todoList, { id, value: title, detail, done: false, listId }]
        setTodoList(newTodoList);
        cleanUp();
    }

    const updateTask = () => {
        setTodoList(todoList.map(todo => todo.id === selectedTask.id
            ? {...todo, value: title, detail, listId}
            : todo
        ))
        cleanUp();
    }

    const removeTask = () => {
        setTodoList(todoList.filter(todo => todo.id !== selectedTask.id));
        cleanUp();
    }

    const cleanUp = () => {
        closeModal();
        setTitle("");
        setDetail("");
        setListId("");
        setIsEditMode(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            closeModal={cleanUp}
            callback={callback}
        >
            <div className="form-group">
                <label>リスト</label>
                <select
                    className="form-select"
                    value={listId}
                    onChange={e => setListId(parseInt(e.target.value))}
                >
                    {lists.map(list => (
                        <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                </select>
            </div>
            <MDBInput
                className="mb-2 mt-4"
                name="title"
                label="タイトル"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <MDBTextArea
                name="detail"
                label="説明"
                type="textarea"
                value={detail}
                onChange={e => setDetail(e.target.value)}
            />
            <div className="mt-2 d-flex justify-content-between">
                <MDBBtn
                    color='secondary'
                    onClick={cleanUp}
                >
                    閉じる
                </MDBBtn>
                {isEditMode && (
                    <MDBBtn
                        color='danger'
                        onClick={removeTask}
                    >
                        削除
                    </MDBBtn>
                )}
                <MDBBtn
                    onClick={isEditMode ? updateTask : addTask }
                >
                    {isEditMode
                        ? "保存"
                        : "追加"
                    }
                </MDBBtn>
            </div>
        </Modal>
    )
}

export default TaskModal;