import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./util/Loading";
import Main from "./Main";
import TaskDrawer from "./TaskDrawer";
import listAPI from "../api/listAPI";
import taskAPI from "../api/taskAPI";
import useDrawer from "../hooks/useDrawer";
import useList from "../store/listState";
import useTask from "../store/taskState";
import { DEFAULT_FILTER } from "../util/constant";


const App = () => {
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState(DEFAULT_FILTER);

    const {
        isOpen: taskDrawerIsOpen,
        open: openTaskDrawer,
        close: closeTaskDrawer,
        selectedItem: selectedTask
    } = useDrawer();

    const { setTask } = useTask();
    const { setList } = useList();

    // マウント時にAPIをコールし全てのデータを一括で取得する
    useEffect(() => {
        (async () => {
            const taskData = await taskAPI.fetchTasks();
            setTask(taskData);
            const listData = await listAPI.fetchLists();
            setList(listData);
        })();
        // 描画を待つために少しだけラグを持たせる
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Loading
            loading={loading}
        >
            <Header />
            <Main
                activeFilter={activeFilter}
                openTaskDrawer={openTaskDrawer}
            />
            <Footer
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                openTaskDrawer={openTaskDrawer}
            />
            <TaskDrawer
                isOpen={taskDrawerIsOpen}
                close={closeTaskDrawer}
                selectedTask={selectedTask}
            />
        </Loading>
    );
}


export default App;