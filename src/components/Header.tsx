import { FC, useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";
import ListDrawer from "./ListDrawer";
import Sidebar from "./Sidebar";
import { useDrawer } from "../hooks";
import { useList } from "../store";
import { List } from "../types";


export const Header: FC = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

    const {
        isOpen: listDrawerIsOpen,
        open: openListDrawer,
        close: closeListDrawer,
        selectedItem: selectedList
    } = useDrawer();

    const { lists } = useList();

    const moveTo = (id: List["id"]) => {
        // ここでは対象のリストへのスクロール処理のみをおこなう
        // activeListIdの更新はMainコンポーネントで実施する
        const target = document.getElementById(`task-wrapper-${id}`);
        target?.scrollIntoView();
    }

    return (
        <header className="w-100 d-flex justify-content-between border-bottom border-secondary">
            <div className="overflow-x-scroll scrollbar">
                <MDBTabs className="mb-0 w-max-content text-nowrap flex-nowrap">
                    {lists?.map(list => (
                        <MDBTabsItem
                            id={`header-list-${list.id}`}
                            key={list.id}
                        >
                            <MDBTabsLink
                                className="py-3 px-3 fs-6 mb-0"
                                onClick={() => !list.isActive && moveTo(list.id)}
                                active={list.isActive}
                            >
                                {list.title}
                            </MDBTabsLink>
                        </MDBTabsItem>
                    ))}
                </MDBTabs>
            </div>
            {/* スタッキングコンテキストを考慮し、サイドバーの開閉ボタンとリストDrawerは同一のレベルで配置する。
                サイドバー内にリストDrawerを配置すると、Drawerのoverlayより前面に開閉ボタンが表示されてしまう。 */}
            <i
                className={`fas fa-2x px-2 pt-2 ${sidebarIsOpen ? "fa-times" : "fa-bars"}`}
                // サイドバーより前面、かつ、リストモーダルの後面に配置するためzIndexを付与する
                style={{ zIndex: 1 }}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            />
            <Sidebar
                isOpen={sidebarIsOpen}
                close={() => setSidebarIsOpen(false)}
                openListDrawer={openListDrawer}
            />
            <ListDrawer
                isOpen={listDrawerIsOpen}
                close={closeListDrawer}
                selectedList={selectedList as List}
            />
        </header>
    );
}


export default Header;