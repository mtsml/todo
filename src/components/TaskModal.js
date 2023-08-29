import React, { useState, useRef } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
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
            <div className="mb-2 d-flex">
                <i
                    className="fas fa-2x fa-times ps-1 text-secondary"
                    onClick={closeModal}
                />
                {/* 削除ボタンの表示状態に関わらずまとめて右寄せにするためにdivで囲う */}
                <div
                    className="ms-auto"
                >
                    {selectedTask && (
                        <MDBBtn
                            outline
                            rounded
                            className="me-2 px-3 py-1 fs-6"
                            color="danger"
                            onClick={() => {
                                removeTask(selectedTask.id);
                                resetModal();
                            }}
                        >
                            削除
                        </MDBBtn>
                    )}
                    <MDBBtn
                        outline
                        rounded
                        className="px-3 py-1 fs-6"
                        onClick={() => {
                            selectedTask
                                ? updateTask(selectedTask.id, {title, detail, listId})
                                : addTask({title, detail, listId})
                            resetModal();
                        }}
                    >
                        {selectedTask ? "更新" : "追加"}
                    </MDBBtn>
                </div>
            </div>
            <input
                ref={titleRef}
                className="w-100 border-0 border-bottom"
                value={title}
                type="text"
                onChange={e => setTitle(e.target.value)}
            />
            <label className="mt-2" style={{ fontSize: "12px" }}>リスト</label>
            <select
                className="w-100 border-0 border-bottom"
                value={listId}
                onChange={e => setListId(Number(e.target.value))}
            >
                {lists.map(list => (
                    <option key={list.id} value={list.id}>{list.title}</option>
                ))}
            </select>
            <label className="mt-2" style={{ fontSize: "12px" }}>メモ</label>
            <textarea
                readOnly
                className="w-100 fs-6 border-0 border-bottom"
                type="textarea"
                value={detail}
                onChange={e => setDetail(e.target.value)}
            />
        </Modal>
    )
}


export default TaskModal;