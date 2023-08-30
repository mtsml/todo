import { supabase } from "./supabase";


/*
  supabaseのライブラリを利用することでDBからHTTPで値を取得できるため、
  APIエンドポイントを用意せずにここでデータ整形をおこなう。

  Mockとして動作させる場合は任意の値を返却するように修正する。
*/


const toStateObject = (obj) => {
    obj.listId = obj.list_id;
    delete obj.list_id;
    // タスク詳細画面の入力部品がnullを許容しないため空文字で置換する
    obj.detail = obj.detail || "";
    return obj;
}


const toDbObject = (obj) => {
    obj.list_id = obj.listId;
    delete obj.listId;
    return obj;
}


const fetchTasks = async () => {
    const { data, error } = await supabase
        .from("task")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) throw error;
    data.forEach(toStateObject);
    return data;
}


const addTask = async (task) => {
    const { data, error } = await supabase
        .from("task")
        .insert(toDbObject(task))
        .select()
    if (error) throw error;
    return toStateObject(data[0]);
}


const updateTask = async (id, task) => {
    const { data, error } = await supabase
        .from("task")
        .update(toDbObject(task))
        .eq("id", id)
        .select();
    if (error) throw error;
    return toStateObject(data[0]);
}


const removeTask = async (id) => {
    await supabase.from("task").delete().eq("id", id);
}


const taskAPI = {
    fetchTasks,
    addTask,
    updateTask,
    removeTask
}


export default taskAPI;