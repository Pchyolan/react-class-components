import { useEffect, useState } from 'react'
import Search from './Search'
import Results from './Results'
import ErrorBoundary from './ErrorBoundary'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

type Person = {
  id: number
  name: string
  gender: string
  birth_year: string
  height: string
}

const fetchCharacters = async (searchValue: string): Promise<Person[]> => {
  const trimmedSearch = searchValue.trim()
  const url = trimmedSearch
    ? `https://swapi.online/api/people?search=${trimmedSearch}`
    : 'https://swapi.online/api/characters';

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to load characters')
  }

  return response.json()
}

function App() {

  const { getValue, setValue } = useLocalStorage('search');
  const [initialSearch] = useState(() => getValue() ?? '');

  const [characters, setCharacters] = useState<Person[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [lastSearch, setLastSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCharacters(initialSearch)
      .then((data) => {
        setCharacters(data);
        setError(null);
      })
      .catch(() => {
        setCharacters([]);
        setError('Failed to load characters')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [initialSearch])


  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleSearch = () => {
    const trimmedSearch = search.trim()

    if (lastSearch === trimmedSearch) {
      return
    }

    setValue(trimmedSearch);


    setSearch(trimmedSearch)
    setLastSearch(trimmedSearch)

    setLoading(true)
    setError(null)

    fetchCharacters(trimmedSearch)
      .then((data) => {
        setCharacters(data);
        setError(null);
      })
      .catch(() => {
        setCharacters([]);
        setError('Failed to load characters')
      })
      .finally(() => {
        setLoading(false)
      })

  }

  const deleteCharacter = (id: number) => {
    const filteredCharacters = characters.filter(
      (character) => character.id !== id
    )
    setCharacters(filteredCharacters)
  }

  return (
    <main className='app'>
      <header className="app-header">
        <p className="app-kicker">A long time ago in a galaxy far, far away...</p>
        <h1>Star Wars Characters</h1>
      </header>

      <section className='search-section'>
        <Search
          search={search}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </section>

      <section className='results-section'>
        <ErrorBoundary>
          <Results
            characters={characters}
            onDelete={deleteCharacter}
            loading={loading}
            error={error}
          />
        </ErrorBoundary>
      </section>

    </main>
  )
}

export default App