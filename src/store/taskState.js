import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { listState } from './listState';
import { filterState } from './filterState';
import taskAPI from '../api/taskAPI';


export const taskState = atom({
    key: "taskState",
    default: []
});


export const activeLisTaskSelector = selector({
    key: 'activeLisTaskSelector',
    get: ({ get }) => {
        const list = get(listState);
        const task = get(taskState);
        const filter = get(filterState);

        const activeListId = list.find(l => l.isActive)?.id;
        const activeFilterKey = filter.activeKey;
        return task
            ?.filter(t => t.listId === activeListId)
            ?.filter(t => activeFilterKey === "all"
                || (activeFilterKey === "active" && !t.completed)
                || (activeFilterKey === "completed" && t.completed)
            );
    },
});


export const useTask = () => {
    const [tasks, setTask] = useRecoilState(taskState);
    const activeListTasks = useRecoilValue(activeLisTaskSelector);

    const addTask = async (param) => {
        const data = await taskAPI.addTask(param);
        setTask([data, ...tasks]);
    }

    const updateTask = async (id, param) => {
        console.log(id, param)
        const data = await taskAPI.updateTask(id, param);
        setTask(tasks.map(task => task.id === data.id
            ? data
            : task
        ))
        console.log(data)
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
        removeTask,
        activeListTasks
    }
}
