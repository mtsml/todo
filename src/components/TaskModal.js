import React, { useState, useRef } from 'react';
import { MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import Modal from './util/Modal';
import { useTask } from '../store/taskState';
import { useList } from '../store/listState';


const TaskModal = ({ isOpen, closeModal, selectedTask }) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [listId, setListId] = useState("");

    const titleRef = useRef("");

    const { addTask, updateTask, removeTask } = useTask();
    const { lists, activeListId } = useList();

    const initModal = () => {
        if (selectedTask) {
            // 更新
            setTitle(selectedTask.title);
            setDetail(selectedTask.detail);
            setListId(selectedTask.listId);
        } else {
            // 新規
            setListId(activeListId);
            titleRef.current?.focus();
        }
    }

    const resetModal = () => {
        closeModal();
        setTitle("");
        setDetail("");
        setListId("");
    }

    return (
        <Modal
            isOpen={isOpen}
            initModal={initModal}
            closeModal={resetModal}
        >
            <div className="form-group">
                <label>リスト</label>
                <select
                    className="form-select"
                    value={listId}
                    onChange={e => setListId(Number(e.target.value))}
                >
                    {lists.map(list => (
                        <option key={list.id} value={list.id}>{list.title}</option>
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
                    onClick={resetModal}
                >
                    閉じる
                </MDBBtn>
                {selectedTask && (
                    <MDBBtn
                        color='danger'
                        onClick={() => {
                            removeTask(selectedTask.id);
                            resetModal();
                        }}
                    >
                        削除
                    </MDBBtn>
                )}
                <MDBBtn
                    onClick={() => {
                        selectedTask
                            ? updateTask(selectedTask.id, {title, detail, listId})
                            : addTask({title, detail, listId})
                        resetModal();
                    }}
                >
                    {selectedTask ? "保存" : "追加"}
                </MDBBtn>
            </div>
        </Modal>
    )
}


export default TaskModal;