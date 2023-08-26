import { atom } from 'recoil';


export const listState = atom({
    key: "listState",
    default: [
        { id: 1, name: "やること", isActive: true },
        { id: 2, name: "しごとかんけい", isActive: false },
        { id: 3, name: "てんしょく", isActive: false },
        { id: 4, name: "その他", isActive: false }
      ]
})