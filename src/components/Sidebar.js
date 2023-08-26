import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit'
import { listState } from '../atoms/listState';


const Sidebar = ({ isOpen }) => {
  const [listName, setListName] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [list, setList] = useRecoilState(listState);

  const addList = () => {
    console.log(list)
    const maxListId = list.reduce((prev, cur) => prev.id > cur.id ? prev.id : cur.id)
    setList([...list, { id: maxListId + 1, name: listName, isActive: false }]);
    closeModal();
  }

  const closeModal = () => {
    setListName("");
    setEditModalIsOpen(false);
  }

  return (
    <div className={isOpen ? "pt-5 sidebar slideIn" : "pt-5 sidebar"}>
        {list.map(l => (
            <div
                key={l.id}
                className="d-flex align-items-top m-1 p-2"
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
        <div
            className={`modal-overlay${editModalIsOpen ? " slideUp" : ""}`}
            onClick={closeModal}
        >
            <div
                className={`tmodal px-2 border${editModalIsOpen ? " slideUp" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                <MDBInput
                    className="mb-2 mt-4"
                    name="title"
                    label="リスト名"
                    type="text"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                />
                <div className="mt-2 d-flex justify-content-between">
                    <MDBBtn
                        color='secondary'
                        onClick={closeModal}
                    >
                        閉じる
                    </MDBBtn>
                    <MDBBtn
                        onClick={addList}
                    >
                        追加
                    </MDBBtn>
                </div>
            </div>
        </div>
    </div>
  );
}


export default Sidebar;