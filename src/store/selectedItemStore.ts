import { create } from 'zustand'
import type { Person } from '../types'

type SelectedItemsState = {
    selectedItems: Person[]
    toggleItem: (item: Person) => void
    clearItems: () => void
    isSelected: (id: number) => boolean
}

export const useSelectedItemsStore = create<SelectedItemsState>((set, get) => ({
    selectedItems: [],

    toggleItem: (item) => {
        const selectedItems = get().selectedItems;
        const isAlreadySelected = selectedItems.some(
            (selectedItem) => selectedItem.id === item.id
        )

        if (isAlreadySelected) {
            set({
                selectedItems: selectedItems.filter(
                    (selectedItem) => selectedItem.id !== item.id
                )
            })

            return
        }

        set({
            selectedItems: [...selectedItems, item],
        })
    },

    clearItems: () => {
        set({
            selectedItems: [],
        })
    },

    isSelected: (id) => {
        return get().selectedItems.some((item) => item.id === id)
    },
}))