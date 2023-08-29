import { atom, useRecoilState } from 'recoil';
import taskAPI from '../api/taskAPI';


export const taskState = atom({
    key: "taskState",
    default: []
});


export const useTask = () => {
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
        ))
    }

    const removeTask = async (id) => {
        await taskAPI.removeTask(id);
        setTask(tasks.filter(task => task.id !== id));
    }

    return {
        tasks,
        setTask,
        addTask,
        updateTask,
        removeTask
    }
}
