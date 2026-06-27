import './Pagination.css'

type PaginationProps = {
    currentPage: number
    onNextPage: () => void
    onPreviousPage: () => void
}

function Pagination({currentPage, onNextPage, onPreviousPage}: PaginationProps) {
    return(
        <div className="pagination-block">
        <button type="button" onClick={onPreviousPage}>
            ←
        </button>
        <p>Page: {currentPage}</p>
        <button type="button" onClick={onNextPage}>
            →
        </button>
        </div>
    )
}

export default Pagination