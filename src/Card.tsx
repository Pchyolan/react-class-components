import { Component } from 'react'
import './Card.css'

type CardProps = {
    id: number
    name: string
    description: string
    onDelete: (id: number) => void
}

class Card extends Component<CardProps> {
    render() {
        return (
            <article className="character-card">
                <h2>{this.props.name}</h2>
                <p>{this.props.description}</p>

                <button
                    className="secondary-button"
                    onClick={() => this.props.onDelete(this.props.id)}>
                    Delete
                </button>
            </article>
        )
    }
}

export default Card