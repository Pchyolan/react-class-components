import { useSelectedItemsStore } from "./store/selectedItemStore";
import './SelectedItemsFlyout.css'

function SelectedItemFlyout() {
    const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
    const clearItems = useSelectedItemsStore((state) => state.clearItems)

    const escapeCsvValue = (value: string) => {
        return `"${value.replaceAll('"', '""')}"`
    }

    const handleDownload = () => {
        const headers = ["name", "description", "link_url"];

        const rows = selectedItems.map((item) => {
            const description = `Gender: ${item.gender}, Birth Year: ${item.birth_year}, Height: ${item.height}`;
            return (
                [
                    item.name,
                    description,
                    `${window.location.origin}/details/${item.id}`
                ]
            )
        });

        const csvContent = [
            headers.join(','),
            ...rows.map((row) =>
                row.map(escapeCsvValue).join(',')
            )
        ].join('\r\n')

        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8'
        })

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedItems.length}_items.csv`
        link.click()

        URL.revokeObjectURL(url)
    }


    if (selectedItems.length === 0) {
        return null;
    }

    return (
        <div className="selected-items-flyout">
            <p> Selected items: {selectedItems.length}</p>
            <div className="selected-items-flyout__actions">
                <button type="button" onClick={clearItems}> Unselect All </button>
                <button type="button" onClick={handleDownload}> Download </button>
            </div>
        </div>
    )
}

export default SelectedItemFlyout;