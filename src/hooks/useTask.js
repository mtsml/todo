import { useEffect } from 'react';
import { useTask } from '../store/taskState';
import taskAPI from '../api/taskAPI';


export const useTaskHook = () => {
    const { activeListTasks, setTask, updateTask } = useTask();

    useEffect(() => {
        (async () => {
            const data = await taskAPI.fetchTasks();
            setTask(data);
        })();
    }, [])

    const checkTask = (id, completed) => {
        updateTask(id, { completed })
    }

    return {
        activeListTasks,
        checkTask
    };
}    
