import { atom } from 'recoil';


export const taskState = atom({
    key: "taskState",
    default: [
        { id: 1, value: "task1", detail: "task1の説明文です", done: false, listId: 1 },
        { id: 2, value: "task2", detail: "task2の説明文です", done: false, listId: 1 },
        { id: 3, value: "task3", detail: "task3の説明文です", done: true, listId: 1 },
        { id: 4, value: "task4", detail: "task4の説明文です", done: false, listId: 1 },
        { id: 5, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 6, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 7, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 8, value: "task8", detail: "task8の説明文です", done: false, listId: 3 },
        { id: 9, value: "task9", detail: "task9の説明文です", done: true, listId: 3 },
      ]
})