import React, { useRef, useState } from "react";
import Drawer from "./util/Drawer";
import Input from "./util/Input";
import useList from "../store/listState";
import useTask from "../store/taskState";
import { isEmpty } from "../util/utility";


const TaskDrawer = ({ isOpen, close, selectedTask }) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [listId, setListId] = useState("");
    const [inValid, setInValid] = useState(false);

    const titleRef = useRef(null)

    const { addTask, updateTask, removeTask } = useTask();
    const { activeListId } = useList();

    const init = () => {
        setListId(activeListId);
        if (isEmpty(selectedTask)) {
            // 新規
            titleRef.current?.focus();
        } else {
            // 更新
            setTitle(selectedTask.title);
            setDetail(selectedTask.detail);
        }
    }

    const reset = () => {
        close();
        setTitle("");
        setDetail("");
        setListId("");
        setInValid(false);
    }

    return (
        <Drawer
            isOpen={isOpen}
            init={init}
            close={reset}
            isEditMode={!isEmpty(selectedTask)}
            add={isEmpty(title)
                ? () => { setInValid(true) }
                : () => { addTask({title, detail, listId}); reset(); }
            }
            update={isEmpty(title)
                ? () => { setInValid(true); }
                : () => { updateTask(selectedTask.id, {title, detail, listId}); reset(); }
            }
            remove={() => { removeTask(selectedTask.id); reset(); }}
        >
            {inValid && <span className="text-danger">タイトルを入力してください</span>}
            <Input
                ref={titleRef}
                value={title}
                setValue={setTitle}
            />
            <Input
                label="メモ"
                value={detail}
                setValue={setDetail}
                rows={3}
            />
        </Drawer>
    );
}


export default TaskDrawer;