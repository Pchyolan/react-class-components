import { useSelectedItemsStore } from "./store/selectedItemStore";
import './SelectedItemsFlyout.css'

function SelectedItemFlyout() {
    const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
    const clearItems = useSelectedItemsStore((state) => state.clearItems)

    if (selectedItems.length === 0) {
        return null;
    }

    return (
        <div className="selected-items-flyout">
            <p> Selected items: {selectedItems.length}</p>
            <button type="button" onClick={clearItems}> Unselect All </button>
        </div>
    )
}

export default SelectedItemFlyout;