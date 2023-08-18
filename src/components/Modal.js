import React, { useState } from 'react';
import {
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit'


const Modal = ({ isOpen, setModalIsOpen, setTodoList, todoList }) => {
    const [newTask, setNewTask] = useState("");

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleSubmit = () => {
        const id = crypto.randomUUID();
        setTodoList([...todoList, { id, value: newTask, done: false }]);
        setNewTask("");
        setModalIsOpen(false);
    }

    const toggleShow = () => setModalIsOpen(!isOpen);

    return (
        <MDBModal show={isOpen} setShow={setModalIsOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>タスクを追加する</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            type="text"
                            name="task"
                            value={newTask}
                            onChange={handleChange}
                        />
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleShow}>
                            Close
                        </MDBBtn>
                        <MDBBtn onClick={handleSubmit}>
                            追加
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}


export default Modal;