import React, { useState, useRef } from 'react';
import Modal from './util/Modal';
import { useTask } from '../store/taskState';
import { useList } from '../store/listState';
import { isEmpty } from '../util/utility';


const TaskModal = ({ isOpen, closeModal, selectedTask }) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [listId, setListId] = useState("");
    const [inValid, setInValid] = useState(false);

    const titleRef = useRef("");

    const { addTask, updateTask, removeTask } = useTask();
    const { lists, activeListId } = useList();

    const initModal = () => {
        if (isEmpty(selectedTask)) {
            // 新規
            setListId(activeListId);
            titleRef.current?.focus();
        } else {
            // 更新
            setTitle(selectedTask.title);
            setDetail(selectedTask.detail);
            setListId(selectedTask.listId);
        }
    }

    const resetModal = () => {
        closeModal();
        setTitle("");
        setDetail("");
        setListId("");
        setInValid(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            initModal={initModal}
            closeModal={resetModal}
            isEditMode={!!selectedTask}
            add={isEmpty(title)
                ? () => { setInValid(true) }
                : () => { addTask({title, detail, listId}); resetModal(); }
            }
            update={isEmpty(title)
                ? () => { setInValid(true); }
                : () => { updateTask(selectedTask.id, {title, detail, listId}); resetModal(); }
            }
            remove={() => { removeTask(selectedTask.id); resetModal(); }}
        >
            {inValid && <span className="text-danger">タイトルを入力してください</span>}
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