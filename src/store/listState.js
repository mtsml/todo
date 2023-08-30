import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import  listAPI from '../api/listAPI';


export const listState = atom({
    key: "listState",
    default: []
});


export const activeListIdSelector = selector({
    key: 'activeListIdSelector',
    get: ({get}) => {
        const lists = get(listState);
        return lists.find(list => list.isActive)?.id
    }
});


export const useList = () => {
    const [lists, setList] = useRecoilState(listState);
    const activeListId = useRecoilValue(activeListIdSelector);

    const addList = async (title) => {
        const data = await listAPI.addList({title})
        setList([...lists, data]);
    }

    const updateList = async (id, title) => {
        const data = await listAPI.updateList(id, {title})
        setList(lists.map(list => list.id === data.id
            ? data
            : list
        ));
    }
    
    const removeList = async (id) => {
        await listAPI.removeList(id)
        setList(lists.filter(list => list.id !== id));
    }
    
    return {
        lists,
        setList,
        addList,
        updateList,
        removeList,
        activeListId
    }
}