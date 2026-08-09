import { useState } from 'react'
import Card from './Card'
import './Results.css'

import type { Person } from './types'

type ResultsProps = {
    characters: Person[]
    onDelete: (id: number) => void
    loading: boolean
    error: string | null
}

function Results({ characters, onDelete, loading, error }: ResultsProps) {

    const [shouldError, setShouldError] = useState(false);

    const throwTestError = () => {
        setShouldError(true)
    }

    if (loading === true) {
        return (
            <p className="status-message"> Loading...</p>
        )
    }

    if (shouldError) {
        throw new Error('Test Error')
    }

    if (error) {
        return (
            <p className="status-message error-message">{error}</p>
        )
    }

    if (characters.length === 0 && !shouldError && !error) {
        return (
            <p className="status-message">No results found in this galaxy..</p>
        )
    }

    return (
        <section className="results-panel">

            <button
                className="danger-button"
                onClick={throwTestError}>
                Throw Error
            </button>

            <div className="cards-grid">

                {characters.map((person) => {
                    const description =
                        `Gender: ${person.gender}, Birth Year: ${person.birth_year}, Height: ${person.height}`
                    return (
                        <Card
                            key={person.id}
                            person={person}
                            description={description}
                            onDelete={onDelete}
                        />
                    )
                })}
            </div>
        </section>
    )

}

export default Results