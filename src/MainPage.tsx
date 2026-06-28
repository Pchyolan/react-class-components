import type { Person } from "./types";

import Pagination from "./Pagination";
import Search from "./Search";
import Results from "./Results";
import ErrorBoundary from "./ErrorBoundary";

import { useOutlet } from "react-router-dom";

import './MainPage.css'

type MainPageProps = {
    currentPage: number,
    onNextPage: () => void,
    onPreviousPage: () => void,
    search: string,
    onSearch: () => void,
    onSearchChange: (value: string) => void,
    characters: Person[],
    onDelete: (id: number) => void,
    loading: boolean,
    error: string | null,
}

function MainPage({ currentPage, onNextPage, onPreviousPage, search, onSearch, onSearchChange, characters, onDelete, loading, error }: MainPageProps) {
    const outlet = useOutlet()

    return (
        <>
            <section>
                <Pagination
                    currentPage={currentPage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                />

                <Search
                    search={search}
                    onSearchChange={onSearchChange}
                    onSearch={onSearch}
                />
            </section>

            <div className="main-layout">
                <section className='results-section'>
                    <ErrorBoundary>
                        <Results
                            characters={characters}
                            onDelete={onDelete}
                            loading={loading}
                            error={error}
                        />
                    </ErrorBoundary>
                </section>

                {outlet && (
                    <section className="details-overlay">
                        {outlet}
                    </section>
                )}
            </div>
        </>
    )
}

export default MainPage