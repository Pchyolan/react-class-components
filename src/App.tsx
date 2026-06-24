import { useEffect, useState } from 'react'
import Search from './Search'
import Results from './Results'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

type Person = {
  id: number
  name: string
  gender: string
  birth_year: string
  height: string
}

function App() {


  const [characters, setCharacters] = useState<Person[]>([]);
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedSearch = localStorage.getItem('search')

    if (savedSearch) {
      setSearch(savedSearch)
      setLastSearch(savedSearch)
      loadCharacters(savedSearch)
    } else {
      loadCharacters('')
    }
  }, [])

  const loadCharacters = async (searchValue: string) => {
    try {
      setLoading(true)
      setError(null)

      const trimmedSearch = searchValue.trim()

      const url = trimmedSearch
        ? `https://swapi.online/api/people?search=${trimmedSearch}` : 'https://swapi.online/api/characters'
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to load characters')
      }

      const data: Person[] = await response.json()

      setCharacters(data)
      setLoading(false)
      setError(null)

    } catch {
      setCharacters([])
      setLoading(false)
      setError('Failed to load characters')
    }
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleSearch = () => {
    const trimmedSearch = search.trim()

    if (lastSearch === trimmedSearch) {
      return
    }

    localStorage.setItem('search', trimmedSearch)


    setSearch(trimmedSearch)
    setLastSearch(trimmedSearch)
    loadCharacters(trimmedSearch)

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