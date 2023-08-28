import { atom } from 'recoil';


export const filterState = atom({
    key: "filterState",
    default: {
        activeKey: 'active',
        options: [
            { key: "all", value: "すべて" },
            { key: "active", value: "未完了" },
            { key: "completed", value: "完了" }
        ]
    }
})