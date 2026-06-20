import { Component } from 'react'
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

type AppState = {
  characters: Person[]
  search: string
  lastSearch: string
  loading: boolean
  error: string | null
}

class App extends Component<object, AppState> {

  state: AppState = {
    characters: [],
    search: '',
    lastSearch: '',
    loading: false,
    error: null,
  }

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('search')

    if (savedSearch) {
      this.setState({
        search: savedSearch,
        lastSearch: savedSearch,
      },
        () => {
          this.loadCharacters()
        })
    } else {
      this.loadCharacters()
    }
  }

  loadCharacters = async () => {
    try {

      this.setState({
        loading: true,
        error: null,
      })

      const search = this.state.search.trim()

      const url = search
        ? `https://swapi.online/api/people?search=${search}` : 'https://swapi.online/api/characters'
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to load characters')
      }

      const data: Person[] = await response.json()

      this.setState({
        characters: data,
        loading: false,
        error: null,
      })
    } catch {
      this.setState({
        characters: [],
        loading: false,
        error: 'Failed to load characters',
      })
    }
  }

  handleSearchChange = (value: string) => {
    this.setState({
      search: value,
    })
  }

  handleSearch = () => {
    const trimmedSearch = this.state.search.trim()

    if (this.state.lastSearch === trimmedSearch) {
      return
    }

    localStorage.setItem('search', trimmedSearch)

    this.setState({
      search: trimmedSearch,
      lastSearch: trimmedSearch,
    }, () => {
      this.loadCharacters()
    }
    )
  }

  deleteCharacter = (id: number) => {
    const fileredCharacters = this.state.characters.filter(
      (character) => character.id !== id
    )

    this.setState({
      characters: fileredCharacters
    })
  }


  render() {
    return (
      <main className='app'>
        <header className="app-header">
          <p className="app-kicker">A long time ago in a galaxy far, far away...</p>
          <h1>Star Wars Characters</h1>
        </header>

        <section className='search-section'>
          <Search
            search={this.state.search}
            onSearchChange={this.handleSearchChange}
            onSearch={this.handleSearch}
          />
        </section>

        <section className='results-section'>
          <ErrorBoundary>
            <Results
              characters={this.state.characters}
              onDelete={this.deleteCharacter}
              loading={this.state.loading}
              error={this.state.error}
            />
          </ErrorBoundary>
        </section>

      </main>
    )
  }
}

export default App