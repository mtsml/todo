import { atom } from 'recoil';


export const taskState = atom({
    key: "taskState",
    default: [
        { id: 1, value: "task1", detail: "task1の説明文です", done: false },
        { id: 2, value: "task2", detail: "task2の説明文です", done: false },
        { id: 3, value: "task3", detail: "task3の説明文です", done: true },
      ]
})