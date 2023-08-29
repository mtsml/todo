import React, { useState, useRef } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit'
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
            <div className="mb-2 d-flex">
                <i
                    className="fas fa-2x fa-times ps-1 text-secondary"
                    onClick={closeModal}
                />
                {/* 削除ボタンの表示状態に関わらずまとめて右寄せにするためにdivで囲う */}
                <div
                    className="ms-auto"
                >
                    {selectedList && (
                        <MDBBtn
                            outline
                            rounded
                            className="me-2 px-3 py-1 fs-6"
                            color="danger"
                            onClick={() => {
                                removeList(selectedList.id);
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
                            selectedList
                                ? updateList(selectedList.id, listName)
                                : addList(listName)
                            resetModal();
                        }}
                    >
                        {selectedList ? "更新" : "追加"}
                    </MDBBtn>
                </div>
            </div>
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