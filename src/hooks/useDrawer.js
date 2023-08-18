import { useState } from "react";


/**
 * Drawerを配置するコンポーネントで利用するカスタムフック
 */
const useDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const open = (item = null) => {
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