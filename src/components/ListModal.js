import React, { useState, useRef } from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import Modal from './util/Modal';
import { useList } from '../store/listState';


const ListModal = ({ isOpen, closeModal, selectedList }) => {
    const [listName, setListName] = useState("");

    const listNameRef = useRef("");

    const { addList, updateList, removeList } = useList();

    const initModal = () => {
        if (selectedList) {
            setListName(selectedList.title);
        } else {
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
                    onClick={resetModal}
                >
                    閉じる
                </MDBBtn>
                {selectedList && (
                    <MDBBtn
                        color='danger'
                        onClick={() => {
                            removeList(selectedList.id);
                            resetModal();
                        }}
                    >
                        削除
                    </MDBBtn>
                )}
                <MDBBtn
                    onClick={() => {
                        selectedList
                            ? updateList(selectedList.id, listName)
                            : addList(listName)
                        resetModal();
                    }}
                >
                    {selectedList ? "更新" : "追加"}
                </MDBBtn>
            </div>
        </Modal>
    )
}


export default ListModal;