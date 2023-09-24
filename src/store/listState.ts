import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { listAPI } from "../api";
import { List } from "../types";


const listState = atom<List[]>({
    key: "listState",
    default: []
});


const activeListIdSelector = selector<number | undefined>({
    key: "activeListIdSelector",
    get: ({get}) => {
        const lists = get(listState);
        return lists.find(list => list.isActive)?.id;
    }
});


const useList = () => {
    const [lists, setList] = useRecoilState(listState);
    const activeListId = useRecoilValue(activeListIdSelector);

    const addList = async (title: List["title"]) => {
        const data = await listAPI.addList({title});
        setList([...lists, data]);
    }

    const updateList = async (id: List["id"], title: List["title"]) => {
        const data = await listAPI.updateList(id, {title});
        setList(lists.map(list => list.id === data.id
            ? data
            : list
        ));
    }
    
    const removeList = async (id: List["id"]) => {
        await listAPI.removeList(id);
        setList(lists.filter(list => list.id !== id));
    }

    const toActive = (id: List["id"]) => {
        setList(lists.map(list => ({...list, isActive: list.id === id})));
    }

    return {
        lists,
        setList,
        addList,
        updateList,
        removeList,
        toActive,
        activeListId
    }
}


export default useList;