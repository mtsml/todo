import React, { useRef, useState } from "react";
import Drawer from "./util/Drawer";
import Input from "./util/Input";
import useList from "../store/listState";
import { isEmpty } from "../util/utility";


const ListDrawer = ({ isOpen, close, selectedList }) => {
    const [name, setName] = useState("");
    const [inValid, setInValid] = useState(false);
    const [unremovable, setUnremovable] = useState(false);

    const listNameRef = useRef("");

    const { lists, addList, updateList, removeList } = useList();

    const init = () => {
        if (isEmpty(selectedList)) {
            // 新規
            listNameRef.current?.focus();
        } else {
            // 更新
            setName(selectedList.title);
        }
    }

    const reset = () => {
        close(false);
        setName("");
        setInValid(false);
        setUnremovable(false);
    }

    return (
        <Drawer
            isOpen={isOpen}
            init={init}
            close={reset}
            isEditMode={!isEmpty(selectedList)}
            add={isEmpty(name)
                ? () => { setInValid(true); }
                : () => { addList(name); reset(); }
            }
            update={isEmpty(name)
                ? () => { setInValid(true); }
                : () => { updateList(selectedList.id, name); reset(); }
            }
            // TODO: 削除ボタン押下前に削除可否は判定できるため、Drawer表示時点でメッセージを表示できることが望ましい
            remove={lists.length === 1
                ? () => { setUnremovable(true) }
                : () => { removeList(selectedList.id); reset(); }}
        >
            {unremovable && <span className="text-danger">リストが0個になるため削除できません</span>}
            {inValid && <span className="text-danger">リスト名を入力してください</span>}
            <Input
                ref={listNameRef}
                className={`${inValid ? "border-danger" : ""}`}
                value={name}
                setValue={setName}
            />
        </Drawer>
    );
}


export default ListDrawer;