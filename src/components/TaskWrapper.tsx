import { FC } from "react";
import { Draggable } from "./util";
import TaskItem from "./TaskItem";
import { useTask } from "../store";
import { Task } from "../types";


type Props = {
    listId: number,
    activeFilter: string,
    openTaskDrawer: (task: Task) => void
}


const TaskWrapper: FC<Props> = ({ listId, activeFilter, openTaskDrawer }) => {
    const { tasks, toggleCompleted, updateTaskOrder } = useTask();

    /**
     * フィルターとリストの選択状態から対象のタスクを表示するかを判定する
     */
    const isDisplay = (task: Task, listId: number, activeFilter: string): boolean => {
        return (
            task.listId === listId
            && (activeFilter === "all"
                || (activeFilter === "active" && !task.completed)
                || (activeFilter === "completed" && task.completed)
            )
        );
    }
    const displayTasks = tasks.filter(task => isDisplay(task, listId, activeFilter));

    const onDragEnd = ({ items, activeIndex, moveToIndex, isLastItem }: any) => {
        const activeTaskId = items[activeIndex].id;
        const moveToTaskId = items[moveToIndex].id;
        updateTaskOrder(listId, activeTaskId, moveToTaskId, isLastItem);
    }
    
    return (
        <Draggable
            id={`task-wrapper-${listId}`}
            className="task-wrapper"
            items={displayTasks}
            toItemId={item => `task-${item.id}`}
            onDragEnd={onDragEnd}
        >
            {/* callbackを渡してDraggable内で個要素をレンダリングする */}
            {({ item: task, dragging, dragStart, dragOver, dragEnd }) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    dragging={dragging}
                    dragStart={dragStart}
                    dragOver={dragOver}
                    dragEnd={dragEnd}
                    openTaskDrawer={openTaskDrawer}
                    toggleCompleted={toggleCompleted}    
                />
            )}
        </Draggable>
    );
}


export default TaskWrapper;