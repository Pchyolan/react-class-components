import { useEffect, useState } from 'react'
import { Link, Route, Routes, useSearchParams } from 'react-router-dom'

import Search from './Search'
import Results from './Results'
import ErrorBoundary from './ErrorBoundary'
import Pagination from './Pagination'

import { useLocalStorage } from './hooks/useLocalStorage'

import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import DetailsPage from './pages/DetailsPage'

import './App.css'

type Person = {
  id: number
  name: string
  gender: string
  birth_year: string
  height: string
}

const fetchCharacters = async (searchValue: string, page: number): Promise<Person[]> => {
  const trimmedSearch = searchValue.trim()
  const url = trimmedSearch
    ? `https://swapi.online/api/people?search=${trimmedSearch}&page=${page}`
    : `https://swapi.online/api/characters?page=${page}`;

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to load characters')
  }

  return response.json()
}

function App() {

  const { getValue, setValue } = useLocalStorage('search');
  const [initialSearch] = useState(() => getValue() ?? '');
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = searchParams.get('page');
  const currentPage = Number(pageFromUrl ?? 1);

  const [characters, setCharacters] = useState<Person[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [lastSearch, setLastSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCharacters(lastSearch, currentPage)
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
  }, [lastSearch, currentPage])


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

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', String(nextPage))

    setLoading(true);
    setError(null)

    setSearchParams(newSearchParams)
  }

  const handlePreviousPage = () => {
    const previousPage = (currentPage - 1) <= 0
      ? 1
      : currentPage - 1;

    setLoading(true);
    setError(null)

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(previousPage));
    setSearchParams(newSearchParams);
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
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
        </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <>
            <section>
              <Pagination
                currentPage={currentPage}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage} 
                />
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
        </>
          }
        />
        <Route path='/details/:id' element={<DetailsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>


    </main>
  )
}

export default App