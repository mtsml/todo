import React, { useState, useRef } from 'react';
import {
    MDBBtn,
    MDBInput,
    MDBTextArea
} from 'mdb-react-ui-kit'
import Modal from './Modal';
import { useTask } from '../atoms/taskState';
import { useList } from '../atoms/listState';


const TaskModal = ({isOpen, closeModal, selectedTask, activeListId}) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [listId, setListId] = useState("");

    const { tasks, addTask, updateTask, removeTask } = useTask();
    const { lists } = useList();
    const titleRef = useRef("");

    const callback = () => {
        if (selectedTask) {
            setTitle(selectedTask.value);
            setDetail(selectedTask.detail);
            setListId(selectedTask.listId)
        } else {
            setListId(activeListId);
            titleRef.current?.focus();
        }
    }

    const cleanUp = () => {
        closeModal();
        setTitle("");
        setDetail("");
        setListId("");
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
                ref={titleRef}
                className="mt-3"
                name="title"
                label="タイトル"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <MDBTextArea
                className="mt-3"
                name="detail"
                label="説明"
                type="textarea"
                value={detail}
                rows={4}
                onChange={e => setDetail(e.target.value)}
            />
            <div className="mt-3 d-flex justify-content-between">
                <MDBBtn
                    color='secondary'
                    onClick={cleanUp}
                >
                    閉じる
                </MDBBtn>
                {selectedTask && (
                    <MDBBtn
                        color='danger'
                        onClick={() => {removeTask(selectedTask.id); closeModal();}}
                    >
                        削除
                    </MDBBtn>
                )}
                <MDBBtn
                    onClick={() => {
                        selectedTask
                            ? updateTask(selectedTask.id, title, detail, listId)
                            : addTask(title, detail, listId)
                        closeModal();
                    }}
                >
                    {selectedTask ? "保存" : "追加"}
                </MDBBtn>
            </div>
        </Modal>
    )
}


export default TaskModal;