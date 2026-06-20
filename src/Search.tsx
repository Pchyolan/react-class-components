import { Component, type ChangeEvent } from 'react'
import './Search.css'

type SearchProps = {
    search: string
    onSearchChange: (value: string) => void
    onSearch: () => void
}

class Search extends Component<SearchProps> {
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onSearchChange(event.target.value)
    }

    render() {
        return (
            <section className="search-panel">
                <input
                    className="search-input"
                    value={this.props.search}
                    onChange={this.handleChange}
                    placeholder="Search character..."
                />

                <button
                    className="primary-button"
                    onClick={this.props.onSearch}>
                    Search
                </button>
            </section>
        )
    }
}

export default Search