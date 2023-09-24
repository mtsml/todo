import { FC, useRef, useState } from "react";
import { Drawer, Input } from "./util";
import { useList } from "../store";
import { List } from "../types";


type Props = {
    isOpen: boolean,
    close: () => void,
    selectedList: List | null
}


const ListDrawer: FC<Props> = ({ isOpen, close, selectedList }) => {
    const [title, setTitle] = useState<string>("");
    const [inValid, setInValid] = useState<boolean>(false);
    const [unremovable, setUnremovable] = useState<boolean>(false);

    const listNameRef = useRef<HTMLTextAreaElement>(null);

    const { lists, addList, updateList, removeList } = useList();

    const init = () => {
        if (selectedList === null) {
            // 新規
            listNameRef.current?.focus();
        } else {
            // 更新
            setTitle(selectedList.title);
        }
    }

    const reset = () => {
        close();
        setTitle("");
        setInValid(false);
        setUnremovable(false);
    }

    return (
        <Drawer
            isOpen={isOpen}
            init={init}
            close={reset}
            isEditMode={selectedList !== null}
            add={title === null
                ? () => { setInValid(true); }
                : () => { addList(title); reset(); }
            }
            update={title === null
                ? () => { setInValid(true); }
                : () => { selectedList && updateList(selectedList.id, title); reset(); }
            }
            // TODO: 削除ボタン押下前に削除可否は判定できるため、Drawer表示時点でメッセージを表示できることが望ましい
            remove={lists.length === 1
                ? () => { setUnremovable(true) }
                : () => { selectedList && removeList(selectedList.id); reset(); }}
        >
            {unremovable && <span className="text-danger">リストが0個になるため削除できません</span>}
            {inValid && <span className="text-danger">リスト名を入力してください</span>}
            <Input
                ref={listNameRef}
                className={`${inValid ? "border-danger" : ""}`}
                value={title}
                setValue={setTitle}
            />
        </Drawer>
    );
}


export default ListDrawer;