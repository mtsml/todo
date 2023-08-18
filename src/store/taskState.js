import { atom, useRecoilState } from "recoil";
import taskAPI from "../api/taskAPI";


const taskState = atom({
    key: "taskState",
    default: []
});


const useTask = () => {
    const [tasks, setTask] = useRecoilState(taskState);

    const addTask = async (param) => {
        const data = await taskAPI.addTask(param);
        setTask([data, ...tasks]);
    }

    const updateTask = async (id, param) => {
        const data = await taskAPI.updateTask(id, param);
        setTask(tasks.map(task => task.id === data.id
            ? data
            : task
        ));
    }

    const removeTask = async (id) => {
        await taskAPI.removeTask(id);
        setTask(tasks.filter(task => task.id !== id));
    }

    const toggleCompleted = (id) => {
        const task = tasks.find(task => task.id === id);
        updateTask(id, { completed: !task.completed });
    }

    const updateTaskOrder = (listId, fromTaskId, toTaskId, isLastTask) => {
        const targetTasks = tasks.filter(task => task.listId === listId && task.id !== fromTaskId);
        const fromTask = tasks.find(task => task.id === fromTaskId);
        const index = targetTasks.findIndex(task => task.id === toTaskId);

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