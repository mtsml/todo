import React, { useState } from "react";
import { isNull } from "../../util/utility";

/**
 * ドラッグでソート可能な項目をラップするコンポーネント。
 * ソート可能項目を返す関数をchildrenとして受け取る。
 */
const Draggable = ({ id, className, items, toItemId, onDragEnd, children: toItemComponet }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [moveToIndex, setMoveToIndex] = useState(null);
    const [isLastItem, setIsLastItem] = useState(false);

    const dragStart = (e, index) => {
        e.stopPropagation();

        setActiveIndex(index);
        setMoveToIndex(index);

        // ドラッグデータと動作を設定（iOS対応）
        e.dataTransfer.setData("text/plain", index);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
    }

    const dragOver = (e, index) => {
        e.preventDefault();

        if (index === activeIndex) return;

        const element = document.getElementById(toItemId(items[index]));
        if (!element) return;

        // 要素の上辺を基準にしてカーソルが当たっている位置を0~1の範囲で算出
        const rect = element.getBoundingClientRect(`${id}-${items[index].id}`);
        const y = e.clientY - rect.top;
        const ratioY = Math.min(1, Math.max(0, y / rect.height));

        // 要素の半分より下にカーソルが当たっている場合（5 <= ratioY <= 1）は、要素の下側に挿入するためにindexを加算する。
        // ただし、最後の要素の場合はindexがオーバーしてしまうため加算せずに、isLastItemで最後の要素であることを示す。
        if (index + Math.round(ratioY) >= items.length) {
            setIsLastItem(true);
        } else {
            setIsLastItem(false);
            index += Math.round(ratioY);
        }

        setMoveToIndex(index);
    }

    const dragEnd = () => {
        if (activeIndex !== moveToIndex) {
            onDragEnd({ items, activeIndex, moveToIndex, isLastItem });
        }

        // 初期化
        setActiveIndex(null);
        setMoveToIndex(null);
        setIsLastItem(false);
    }
    
    const itemComponets = items.map((item, index) => (
        toItemComponet({
            key: item.id,
            item,
            dragging: activeIndex === index,
            dragStart: (e) => dragStart(e, index),
            dragOver: (e) => dragOver(e, index),
            dragEnd: () => dragEnd()
        })
    ));

    // 移動先を示すバーを追加する
    if (!isNull(activeIndex) && !isNull(moveToIndex)) {
        const moveToBar = <div
            key={-1}
            className="mx-1 border border-2 border-primary rounded"
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDrop={e => e.preventDefault()}
        ></div>

        if (isLastItem) {
            itemComponets.push(moveToBar);
        } else if (activeIndex === moveToIndex) {
            // 移動元の要素上をホバーしている際は常に移動元の直後にバーを表示する
            itemComponets.splice(moveToIndex + 1, 0, moveToBar);
        } else {
            itemComponets.splice(moveToIndex, 0, moveToBar);
        }
    }

    return (
        <div
            id={id}
            className={className}
        >
            {itemComponets}
        </div>
    );
}


export default Draggable;