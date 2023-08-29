import React, { useState, useRef } from 'react';
import Modal from './util/Modal';
import { useList } from '../store/listState';


const ListModal = ({ isOpen, closeModal, selectedList }) => {
    const [listName, setListName] = useState("");

    const listNameRef = useRef("");

    const { addList, updateList, removeList } = useList();

    const initModal = () => {
        if (selectedList) {
            // 更新
            setListName(selectedList.title);
        } else {
            // 新規
            listNameRef.current?.focus();
        }
    }

    const resetModal = () => {
        closeModal(false);
        setListName("");
    }

    return (
        <Modal
            isOpen={isOpen}
            initModal={initModal}
            closeModal={resetModal}
            isEditMode={!!selectedList}
            add={() => addList(listName)}
            update={() => updateList(selectedList.id, listName)}
            remove={() => removeList(selectedList.id)}
        >
            <input
                ref={listNameRef}
                className="w-100 border-0 border-bottom"
                value={listName}
                type="text"
                onChange={e => setListName(e.target.value)}
            />
        </Modal>
    )
}


export default ListModal;