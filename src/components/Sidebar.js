import React, { useState, useRef } from 'react';
import {
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit'
import Modal from './Modal';
import { useList } from '../atoms/listState';


const Sidebar = ({ isOpen }) => {
  const [listName, setListName] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const { lists, addList, updateList, removeList } = useList();

  const listNameRef = useRef("");

  const selectList = (list) => {
    setSelectedList(list);
    setEditModalIsOpen(true);
  }

  const callback = () => {
    if (selectedList) {
        setListName(selectedList.name);
    } else {
        listNameRef.current?.focus();
    }
  }

  const closeModal = () => {
    setListName("");
    setSelectedList(null);
    setEditModalIsOpen(false);
  }

  return (
    <div className={isOpen ? "pt-5 sidebar slideIn" : "pt-5 sidebar"}>
        {lists.map(l => (
            <div
                key={l.id}
                className="d-flex align-items-top m-1 p-2"
                onClick={() => selectList(l)}
            >
                <div
                    className="w-100 ms-3 border-bottom border-secondary"
                >
                    {l.name}
                </div>
            </div>
        ))}
        <div
            className="d-flex align-items-center m-1 p-2"
            onClick={() => setEditModalIsOpen(true)}
        >
            <i className="ps-3 pe-2 fas fa-plus fa-lg text-secondary"></i>
            <span>新しいリスト</span>
        </div>
        <Modal
            isOpen={editModalIsOpen}
            closeModal={closeModal}
            callback={callback}
        >
            <MDBInput
                ref={listNameRef}
                className="mt-4"
                name="title"
                label="リスト名"
                type="text"
                value={listName}
                onChange={e => setListName(e.target.value)}
            />
            <div className="mt-3 d-flex justify-content-between">
                <MDBBtn
                    color='secondary'
                    onClick={closeModal}
                >
                    閉じる
                </MDBBtn>
                {selectedList && (
                    <MDBBtn
                        color='danger'
                        onClick={() => {removeList(selectedList.id); closeModal()}}
                    >
                        削除
                    </MDBBtn>
                )}
                <MDBBtn
                    onClick={() => {
                        selectedList
                            ? updateList(selectedList.id, listName)
                            : addList(listName)
                        closeModal();
                    }}
                >
                    {selectedList ? "更新" : "追加"}
                </MDBBtn>
            </div>
        </Modal>
    </div>
  );
}


export default Sidebar;