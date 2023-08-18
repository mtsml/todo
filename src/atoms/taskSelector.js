import { selector } from 'recoil';
import { taskState } from './taskState';
import { listState } from './listState';


export const taskSelector = selector({
    key: 'taskSelector',
    get: ({get}) => {
      const list = get(listState);
      const task = get(taskState);

      const activeListId = list.find(l => l.isActive).id;
      return task.filter(t => t.listId === activeListId);
    },
  });