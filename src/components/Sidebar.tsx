import { FC, useState } from "react";
import { useList } from "../store";
import { List } from "../types";


type Props = {
    isOpen: boolean,
    close: () => void,
    openListDrawer: (list: List | null) => void
}

/**
 * サイドバー。
 * Drragableが意図した通りに動かないためリストの並び替えは未実装。（#27）　
 */
const Sidebar: FC<Props> = ({ isOpen, close, openListDrawer }) => {
    const [startX, setStartX] = useState(0);
    const [moveX, setMoveX] = useState(0);

    const { lists } = useList();

    return (
        <div
            className={`pt-5 sidebar${isOpen ? " slideIn" : ""}`}
            style={{
                // 右方向にのみスワイプ可能
                left: Math.max(0, moveX),
                // スワイプ中は滑らかにスクロールするためにtransitionを付与しない
                transition: startX === 0 ? "all 0.4s ease" : ""
            }}
            onTouchStart={e => setStartX(e.touches[0].pageX)}
            onTouchMove={e => setMoveX(e.changedTouches[0].pageX - startX)}
            onTouchEnd={(e: any) => {
                setStartX(0);
                if (e.target.clientWidth * 0.3 < moveX) {
                    close();
                }
                setMoveX(0);
            }}
        >
            {lists.map(list => (
                <div
                    key={list.id}
                    className="d-flex align-items-top m-1 p-2"
                    onClick={() => openListDrawer(list)}
                >
                    <div
                        className="w-100 ms-3 border-bottom border-secondary"
                    >
                        {list.title}
                    </div>
                </div>
            ))}
            <div
                className="d-flex align-items-center m-1 p-2 text-primary"
                onClick={() => openListDrawer(null)}
            >
                <i className="ps-3 pe-2 fas fa-plus fa-lg"></i>
                <span>新しいリスト</span>
            </div>
        </div>
    );
}


export default Sidebar;