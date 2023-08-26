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
        { id: 10, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 11, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 12, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 13, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 14, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 15, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 16, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 17, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 18, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 19, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 20, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 21, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 22, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 23, value: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 24, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 25, value: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 26, value: "tassk6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 27, value: "task7", detail: "task7の説明文です", done: false, listId: 2 },
      ]
})