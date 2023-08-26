import { atom } from 'recoil';


export const listState = atom({
    key: "listState",
    default: [
        { id: 1, name: "やること", isActive: true },
        { id: 2, name: "list2", isActive: false },
        { id: 3, name: "list3", isActive: false },
      ]
})