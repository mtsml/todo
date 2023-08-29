import React, { useState, useRef } from 'react';
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
            isEditMode={!!selectedTask}
            add={() => addTask({title, detail, listId})}
            update={() => updateTask(selectedTask.id, {title, detail, listId})}
            remove={() => removeTask(selectedTask.id)}
        >
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
                className="w-100 fs-6 border-0 border-bottom"
                type="textarea"
                value={detail}
                onChange={e => setDetail(e.target.value)}
            />
        </Modal>
    )
}


export default TaskModal;