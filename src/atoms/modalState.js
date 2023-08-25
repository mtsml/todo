import { atom } from 'recoil';


export const taskState = atom({
    key: "modalState",
    default: {
        isOpen: false,
        title: "",
        detail: ""
    }
});