import { supabase } from "./supabase";
import { Task, TaskInsertParam, TaskUpdateParam } from "../types";


/*
  supabaseのライブラリを利用することでDBからHTTPで値を取得できるため、
  APIエンドポイントを用意せずにここでデータ整形をおこなう。

  Mockとして動作させる場合は任意の値を返却するように修正する。
*/


const toStateObject = (obj: any): Task => {
    obj.listId = obj.list_id;
    delete obj.list_id;
    obj.sortNo = obj.sort_no;
    delete obj.sort_no;
    // タスク詳細画面の入力部品がnullを許容しないため空文字で置換する
    obj.detail = obj.detail || "";
    return obj;
}


const toDbObject = (obj: any) => {
    obj.list_id = obj.listId;
    delete obj.listId;
    obj.sort_no = obj.sortNo;
    delete obj.sortNo;
    return obj;
}


const fetchTasks = async () => {
    const { data, error } = await supabase
        .from("task")
        .select("*")
        .order("sort_no", { ascending: false });
    if (error) throw error;
    data.forEach(toStateObject);
    return data;
}


const addTask = async (task: TaskInsertParam) => {
    const { data, error } = await supabase
        .from("task")
        .insert(toDbObject(task))
        .select()
    if (error) throw error;
    return toStateObject(data[0]);
}


const updateTask = async (id: Task["id"], task: TaskUpdateParam) => {
    const { data, error } = await supabase
        .from("task")
        .update(toDbObject(task))
        .eq("id", id)
        .select();
    if (error) throw error;
    return toStateObject(data[0]);
}


const removeTask = async (id: Task["id"]) => {
    await supabase.from("task").delete().eq("id", id);
}


const taskAPI = {
    fetchTasks,
    addTask,
    updateTask,
    removeTask
}


export default taskAPI;