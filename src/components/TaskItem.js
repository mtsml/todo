import React, { useState } from "react";


const Task = ({ task, openTaskDrawer, toggleCompleted, dragging, dragStart, dragOver, dragEnd }) => {
    const [completed, setCompleted] = useState(task.completed);

    return (
        <div
            id={`task-${task.id}`}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDrop={e => e.preventDefault()}
            className="d-flex align-items-center m-1 p-2 task"
            style={{ opacity: dragging ? 0.3 : 1 }}
        >
            <i
                className={`text-primary fa-lg far ${completed
                    ? "fa-check-circle"
                    : "fa-circle"}`
                }
                onClick={(e) => {
                    e.target.style.animation = "zoom-in-out 0.4s";
                    // 完了状態切り替え時にアニメーションを持たせるため、
                    // stateの完了状態のみを変更し、storeの完了状態は遅延して更新する
                    setCompleted(!completed);
                    setTimeout(() => {
                        toggleCompleted(task.id);
                        e.target.style.animation = "";
                    }, 400);
                }}
            />
            <div
                className={`w-100 ms-3 pb-1 border-bottom border-secondary ${completed
                    ? "fw-light text-decoration-line-through text-secondary"
                    : "fw-bold"}`
                }
                onClick={() => openTaskDrawer(task)}
            >
                {task.title}
            </div>
        </div>
    );
}


export default Task;