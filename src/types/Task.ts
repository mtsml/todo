import { Item } from "./Item";


export interface Task extends Item {
    title: string,
    detail: string,
    completed: boolean,
    listId: number,
    sortNo: number
}


export type TaskInsertParam = Pick<Task, "title" | "detail"> & {
    listId?: number
};


export type TaskUpdateParam = {
    title?: string,
    detail?: string,
    completed?: boolean,
    sortNo?: number,
    listId?: number
};
