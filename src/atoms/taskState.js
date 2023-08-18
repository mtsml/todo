import { atom } from 'recoil';


export const taskState = atom({
    key: "taskState",
    default: [
        { id: 1, value: "task1", done: false },
        { id: 2, value: "task2", done: false },
        { id: 3, value: "task3", done: true },
      ]
})