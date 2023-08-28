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
        const list = await listAPI.addList({title})
        setList([...lists, list]);
    }

    const updateList = (id, title) => {
        console.log(id, title)
        setList(lists.map(l => l.id === id
            ? {...l, title}
            : l
        ));
    }
    
    const removeList = (id) => {
        setList(lists.filter(l => l.id !== id));
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