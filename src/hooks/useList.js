import { useEffect, useState } from 'react';
import listAPI from '../api/listAPI';
import { useList } from '../store/listState';


export const useListHoook = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const { lists, setList } = useList();

    const selectList = (id) => {
        setList(lists.map(list => ({...list, isActive: list.id === id})))
    };

    useEffect(() => {
        (async () => {
            const data = await listAPI.fetchLists();
            setList(data);
        })();
    }, [])

    return {
        sidebarIsOpen,
        setSidebarIsOpen,
        lists,
        selectList
    };
}    
