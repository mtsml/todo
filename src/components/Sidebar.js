import React, { useState, useRef } from 'react';
import ListModal from './ListModal';
import { useList } from '../store/listState';


const Sidebar = ({ isOpen }) => {
    const [listModalIsOpen, setListModalIsOpen] = useState(false);
    const [selectedList, setSelectedList] = useState(null);

    const { lists } = useList();

    const selectList = (list) => {
        setSelectedList(list);
        setListModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedList(null);
        setListModalIsOpen(false);
    }

    return (
        <div className={isOpen ? "pt-5 sidebar slideIn" : "pt-5 sidebar"}>
            {lists.map(list => (
                <div
                    key={list.id}
                    className="d-flex align-items-top m-1 p-2"
                    onClick={() => selectList(list)}
                >
                    <div
                        className="w-100 ms-3 border-bottom border-secondary"
                    >
                        {list.title}
                    </div>
                </div>
            ))}
            <div
                className="d-flex align-items-center m-1 p-2 text-primary"
                onClick={() => setListModalIsOpen(true)}
            >
                <i className="ps-3 pe-2 fas fa-plus fa-lg"></i>
                <span>新しいリスト</span>
            </div>
            <ListModal
                isOpen={listModalIsOpen}
                closeModal={closeModal}
                selectedList={selectedList}
            />
        </div>
    );
}


export default Sidebar;