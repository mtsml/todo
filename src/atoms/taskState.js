import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { listState } from './listState';
import { filterState } from './filterState';


export const taskState = atom({
    key: "taskState",
    default: [
        { id: 1, title: "task1", detail: "task1の説明文です", done: false, listId: 1 },
        { id: 2, title: "task2", detail: "task2の説明文です", done: false, listId: 1 },
        { id: 3, title: "task3", detail: "task3の説明文です", done: true, listId: 1 },
        { id: 4, title: "task4", detail: "task4の説明文です", done: false, listId: 1 },
        { id: 5, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 6, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 7, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 8, title: "task8", detail: "task8の説明文です", done: false, listId: 3 },
        { id: 9, title: "task9", detail: "task9の説明文です", done: true, listId: 3 },
        { id: 10, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 11, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 12, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 13, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 14, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 15, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 16, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 17, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 18, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 19, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 20, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 21, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 22, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 23, title: "task6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 24, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
        { id: 25, title: "task5", detail: "task5の説明文です", done: false, listId: 2 },
        { id: 26, title: "tassk6", detail: "task6の説明文です", done: true, listId: 2 },
        { id: 27, title: "task7", detail: "task7の説明文です", done: false, listId: 2 },
      ]
});


export const activeLisTaskSelector = selector({
    key: 'activeLisTaskSelector',
    get: ({get}) => {
      const list = get(listState);
      const task = get(taskState);
      const filter = get(filterState);

      const activeListId = list.find(l => l.isActive).id;
      const activeFilterKey = filter.activeKey;
      return task
        ?.filter(t => t.listId === activeListId)
        ?.filter(t => activeFilterKey === "all"
                  || (activeFilterKey === "active" && !t.done)
                  || (activeFilterKey === "done" && t.done)
                );
    },
});


export const useTask = () => {
    const [tasks, setTodoList] = useRecoilState(taskState);
    const activeListTasks = useRecoilValue(activeLisTaskSelector);

    const addTask = (title, detail, listId) => {
        const id = crypto.randomUUID();
        setTodoList([...tasks, { id, title: title, detail, done: false, listId }]);
    }

    const updateTask = (id, title, detail, listId) => {
        setTodoList(tasks.map(task => task.id === id
            ? {...task, title: title, detail, listId}
            : task
        ))
    }

    const checkTask = (id, checked) => {
        setTodoList(activeListTasks.map(todo => todo.id === id ? {...todo, done: checked} : todo));    
    }

    const removeTask = (id) => {
        setTodoList(tasks.filter(task => task.id !== id));
    }

    return {
        tasks,
        addTask,
        updateTask,
        removeTask,
        checkTask,
        activeListTasks
    }
}
