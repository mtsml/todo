import { supabase } from './supabase';


const toStateObjcet = (obj) => {
    obj.isActive = false;
    return obj;
}


const fetchLists = async () => {
    const { data, error } = await supabase
        .from("list")
        .select("*")
        .order("created_at", { ascending: true });
    if (error) throw error;
    data.forEach(toStateObjcet);
    data[0].isActive = true;
    return data;
}


const addList = async (list) => {
    const { data, error } = await supabase
        .from("list")
        .insert(list)
        .select()
    if (error) throw error;
    return toStateObjcet(data[0]);
}


const updateList = async (id, list) => {
    const { data, error } = await supabase
        .from("task")
        .update(list)
        .eq("id", id)
        .select();
    if (error) throw error;
    return toStateObjcet(data[0]);
}


const removeList = async (id) => {
    await supabase.from("list").delete().eq("id", id);
}


const listAPI = {
    fetchLists,
    addList,
    updateList,
    removeList
}


export default listAPI;