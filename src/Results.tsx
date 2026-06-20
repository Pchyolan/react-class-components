import { Component } from 'react'
import Card from './Card'
import './Results.css'

type Person = {
    id: number
    name: string
    gender: string
    birth_year: string
    height: string
}

type ResultsProps = {
    characters: Person[]
    onDelete: (id: number) => void
    loading: boolean
    error: string | null
}

type ResultsState = {
    shouldError: boolean
}

class Results extends Component<ResultsProps, ResultsState> {

    state: ResultsState = {
        shouldError: false,
    }

    throwTestError = () => {
        this.setState({
            shouldError: true,
        })
    }
    render() {
        if (this.props.loading === true) {
            return (
                <p className="status-message"> Loading...</p>
            )
        }

        if (this.state.shouldError) {
                throw new Error('Test Error')
        }

        if (this.props.error) {
            return (
                <p className="status-message error-message">{this.props.error}</p>
            )
        }

        if (this.props.characters.length === 0 && !this.state.shouldError && !this.props.error) {
            return (
                <p  className="status-message">No results found in this galaxy..</p>
            )
        }

        return (
            <section className="results-panel">

            <button 
            className="danger-button"
            onClick={this.throwTestError}>
                Throw Error
            </button>

 <div className="cards-grid">

            {this.props.characters.map((person) => {
                const description =
                `Gender: ${person.gender}, Birth Year: ${person.birth_year}, Height: ${person.height}`
                return (
                    <Card
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    description={description}
                    onDelete={this.props.onDelete}
                    />
                )
            })}
            </div>
            </section>
        )
    }

}

export default Results