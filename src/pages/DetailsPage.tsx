import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
type Person = {
    id: number
    name: string
    gender: string
    birth_year: string
    height: string
}


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
        <section>
            <h2>Character details</h2>
            <p>Character id: {id}</p>
            <p>Name: {character.name}</p>
            <p>Gender: {character.gender}</p>
            <p>Birth Year: {character.birth_year}</p>
            <p>Height: {character.height}</p>
        </section>
    )
}

export default DetailsPage