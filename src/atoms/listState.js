import { atom, useRecoilState } from 'recoil';


export const listState = atom({
    key: "listState",
    default: [
        { id: 1, name: "やること", isActive: true },
        { id: 2, name: "しごとかんけい", isActive: false },
        { id: 3, name: "てんしょく", isActive: false },
        { id: 4, name: "その他", isActive: false }
    ]
});


export const useList = () => {
    const [lists, setList] = useRecoilState(listState);

    const addList = (name) => {
        const maxListId = lists.reduce((prev, cur) => prev.id > cur.id ? prev.id : cur.id)
        setList([...lists, { id: maxListId + 1, name, isActive: false }]);
    }

    const updateList = (id, name) => {
        setList(lists.map(l => l.id === id
            ? {...l, name}
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
        removeList
    }
}