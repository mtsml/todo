import { atom, useRecoilState } from "recoil";
import { taskAPI } from "../api/";
import { Task, TaskInsertParam, TaskUpdateParam } from "../types";


const taskState = atom<Task[]>({
    key: "taskState",
    default: []
});


const useTask = () => {
    const [tasks, setTask] = useRecoilState(taskState);

    const addTask = async (param: TaskInsertParam) => {
        const data = await taskAPI.addTask(param);
        setTask([data, ...tasks]);
    }

    const updateTask = async (id: Task["id"], param: TaskUpdateParam) => {
        const data = await taskAPI.updateTask(id, param);
        setTask(tasks.map(task => task.id === data.id
            ? data
            : task
        ));
    }

    const removeTask = async (id: Task["id"]) => {
        await taskAPI.removeTask(id);
        setTask(tasks.filter(task => task.id !== id));
    }

    const toggleCompleted = (id: Task["id"]) => {
        const task = tasks.find(task => task.id === id);
        task && updateTask(id, { completed: !task.completed });
    }

    const updateTaskOrder = (listId: Task["listId"], fromTaskId: Task["listId"], toTaskId: Task["id"], isLastTask: boolean) => {
        const targetTasks = tasks.filter(task => task.listId === listId && task.id !== fromTaskId);
        const fromTask = tasks.find(task => task.id === fromTaskId);
        const index = targetTasks.findIndex(task => task.id === toTaskId);

        if (!fromTask) return;

        if (isLastTask) {
            if (index === targetTasks.length - 1) {
                targetTasks.push(fromTask);
            } else {
                // フィルターにより非表示になっているタスクがある状態で並び替えた場合
                targetTasks.splice(index + 1, 0, fromTask)
            }
        } else {
            targetTasks.splice(index, 0, fromTask);
        }

        // store更新
        setTask(tasks.filter(task => task.listId !== listId).concat(targetTasks))

        // DB更新
        // Supabaseを利用しているため一件ずつUpdateする。
        // データ量が増えるとパフォーマンスの問題があるが、FEの都合ではないのでこのままにしておく。
        targetTasks.forEach((targetTask, index) => {
            const sortNo = targetTasks.length - index;
            taskAPI.updateTask(targetTask.id, { sortNo });
        });
    }

    return {
        tasks,
        setTask,
        addTask,
        updateTask,
        removeTask,
        toggleCompleted,
        updateTaskOrder
    }
}


export default useTask;