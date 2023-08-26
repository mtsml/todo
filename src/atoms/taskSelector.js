import { selector } from 'recoil';
import { taskState } from './taskState';
import { listState } from './listState';
import { filterState } from './filterState';


export const taskSelector = selector({
    key: 'taskSelector',
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