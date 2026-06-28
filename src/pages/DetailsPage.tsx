import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Person } from '../types'

function DetailsPage() {
    const { id } = useParams();

    const [character, setCharacter] = useState<Person | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const url = `https://swapi.online/api/characters/${id}`
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error('Failed to load character')
                }

                const data = await response.json()
                setCharacter(data)
            } catch {
                setError('Failed to load character')
            } finally {
                setLoading(false)
            }
        }

        loadCharacter()
    }, [id])

    if (loading) {
        return <p>Loading details...</p>
    }

    if (error) {
        return <p>Something went wrong..</p>
    }

    if (!character) {
        return <p> This character not found at galaxy...</p>
    }

    return (
        <article className="details-card">
            <Link to="/" className="details-close-link">
                Close
            </Link>

            <p className="details-kicker">Galactic archive entry</p>
            <h2>{character.name}</h2>

            <dl className="details-list">
                <div>
                    <dt>Character id</dt>
                    <dd>{id}</dd>
                </div>

                <div>
                    <dt>Gender</dt>
                    <dd>{character.gender}</dd>
                </div>

                <div>
                    <dt>Birth year</dt>
                    <dd>{character.birth_year}</dd>
                </div>

                <div>
                    <dt>Height</dt>
                    <dd>{character.height}</dd>
                </div>
            </dl>
        </article>
    )
}

export default DetailsPage