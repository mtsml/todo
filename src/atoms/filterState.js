import { atom } from 'recoil';


export const filterState = atom({
    key: "filterState",
    default: {
        listId: 1,
        showDoneTask: false
    }
})