import { Item } from "./Item";


export interface List extends Item {
    title: string,
    isActive: boolean
}


export type ListInsertParam = Pick<List, "title">;


export type ListUpdateParam = Pick<List, "title">;
