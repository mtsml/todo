import { useState } from "react";
import { Item } from "../types";


/**
 * Drawerを配置するコンポーネントで利用するカスタムフック
 */
const useDrawer = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    
    const open = (item: Item | null) => {
        setSelectedItem(item);
        setIsOpen(true);
    }
    
    const close = () => {
        setSelectedItem(null);
        setIsOpen(false);
    }

    return {
        isOpen,
        open,
        close,
        selectedItem
    }
}


export default useDrawer;