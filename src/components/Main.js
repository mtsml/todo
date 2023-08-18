import React from "react";
import TaskWrapper from "./TaskWrapper";
import useList from "../store/listState";
import { throttle } from "../util/utility";


const Main = ({ activeFilter, openTaskDrawer }) => {
    const { lists, toActive, activeListId } = useList();

    /**
     * main内に表示するリストはscroll-snapによるスワイプでの切り替えが可能であるため、
     * 切り替え時にヘッダーに表示しているリストと同期をとる必要がある。
     * IntersectionObseverでは期待する結果が得られなかったためscrollイベントを利用する。(#21)
     * その際に負荷を抑えるためthrottleでscrollイベントを間引く。
     */
    const onScroll = (e) => {
        const width = e.target.clientWidth;
        const scrollLeft = e.target.scrollLeft;

        // 滑らからにスクロールするためにMath.roundを利用する
        // Math.floorでは画面内に完全に表示されるまでリストが切り替わらないためもっさりとした印象になってしまう
        const listIndex = Math.round(scrollLeft / width);
        const listId = lists[listIndex]?.id;

        if (listId && listId !== activeListId) {
            toActive(listId);
            // ヘッダーのリストが画面内に表示されるようにスクロールする
            const headerList = document.getElementById(`header-list-${listId}`);
            headerList?.scrollIntoView();
        }
    }
    
    return (
        <main
            className="d-flex overflow-x-scroll scrollbar"
            onScroll={throttle(onScroll, 100)}
        >
            {lists.map(list => (
                <TaskWrapper
                    key={list.id}
                    listId={list.id}
                    activeFilter={activeFilter}
                    openTaskDrawer={openTaskDrawer}
                />
            ))}
        </main>
    );
}


export default Main;