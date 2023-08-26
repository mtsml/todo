import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    MDBBtn,
    MDBInput,
    MDBTextArea
} from 'mdb-react-ui-kit'
import { taskState } from '../atoms/taskState';


const Modal = ({isOpen, closeModal, selectedTask}) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [todoList, setTodoList] = useRecoilState(taskState);

    useEffect(() => {
        if (isOpen && selectedTask) {
            setTitle(selectedTask.value);
            setDetail(selectedTask.detail);
            setIsEditMode(true);
        }
    }, [isOpen, selectedTask])

 
    const addTask = () => {
        const id = crypto.randomUUID();
        setTodoList([...todoList, { id, value: title, detail, done: false, listId: 1 }]);
        cleanUp();
    }

    const updateTask = () => {
        setTodoList(todoList.map(todo => todo.id === selectedTask.id ? {...todo, value: title, detail} : todo))
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
        setIsEditMode(false);
    }

    return (
        <div
            className={`modal-overlay${isOpen ? " slideUp" : ""}`}
            onClick={cleanUp}
        >
            <div
                className={`tmodal px-2 border${isOpen ? " slideUp" : ""}`}
                onClick={e => e.stopPropagation()}
            >
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
            </div>
        </div>
    )
}

export default Modal;