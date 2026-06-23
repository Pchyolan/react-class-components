import { type ChangeEvent } from 'react'
import './Search.css'

type SearchProps = {
    search: string
    onSearchChange: (value: string) => void
    onSearch: () => void
}

function Search({ search, onSearchChange, onSearch }: SearchProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value)
    }

    return (
        <section className="search-panel">
            <input
                className="search-input"
                value={search}
                onChange={handleChange}
                placeholder="Search character..."
            />

            <button
                className="primary-button"
                onClick={onSearch}>
                Search
            </button>
        </section>
    )
}

export default Search