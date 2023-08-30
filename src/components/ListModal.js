import React, { useState, useRef } from 'react';
import Modal from './util/Modal';
import { useList } from '../store/listState';
import { isEmpty } from '../util/utility';


const ListModal = ({ isOpen, closeModal, selectedList }) => {
    const [name, setName] = useState("");
    const [inValid, setInValid] = useState(false);

    const listNameRef = useRef("");

    const { addList, updateList, removeList } = useList();

    const initModal = () => {
        if (isEmpty(selectedList)) {
            // 新規
            listNameRef.current?.focus();
        } else {
            // 更新
            setName(selectedList.title);
        }
    }

    const resetModal = () => {
        closeModal(false);
        setName("");
        setInValid(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            initModal={initModal}
            closeModal={resetModal}
            isEditMode={!!selectedList}
            add={isEmpty(name)
                ? () => { setInValid(true); }
                : () => { addList(name); resetModal(); }
            }
            update={isEmpty(name)
                ? () => { setInValid(true); }
                : () => { updateList(selectedList.id, name); resetModal(); }
            }
            remove={() => { removeList(selectedList.id); closeModal(); }}
        >
            {inValid && <span className="text-danger">リスト名を入力してください</span>}
            <input
                ref={listNameRef}
                className={`w-100 border-0 border-bottom${inValid ? " border-danger" : ""}`}
                value={name}
                type="text"
                onChange={e => setName(e.target.value)}
            />
        </Modal>
    )
}


export default ListModal;