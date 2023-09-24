import { FC, useRef, useState } from "react";
import { Drawer, Input } from "./util";
import { useList, useTask } from "../store";
import { Task } from "../types";


type Props = {
    isOpen: boolean,
    close: () => void,
    selectedTask: Task | null
}


const TaskDrawer: FC<Props> = ({ isOpen, close, selectedTask }) => {
    const [title, setTitle] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [listId, setListId] = useState<number | undefined>(undefined)
    const [inValid, setInValid] = useState<boolean>(false);

    const titleRef = useRef<HTMLTextAreaElement>(null)

    const { addTask, updateTask, removeTask } = useTask();
    const { activeListId } = useList();

    const init = () => {
        setListId(activeListId);
        if (selectedTask === null) {
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
        setListId(undefined)
        setInValid(false);
    }

    return (
        <Drawer
            isOpen={isOpen}
            init={init}
            close={reset}
            isEditMode={selectedTask !== null}
            add={title === null
                ? () => { setInValid(true) }
                : () => { addTask({title, detail, listId}); reset(); }
            }
            update={title === null
                ? () => { setInValid(true); }
                : () => { selectedTask && updateTask(selectedTask.id, {title, detail, listId}); reset(); }
            }
            remove={() => { selectedTask && removeTask(selectedTask.id); reset(); }}
        >
            {inValid && <span className="text-danger">タイトルを入力してください</span>}
            <Input
                ref={titleRef}
                className={`${inValid ? "border-danger" : ""}`}
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