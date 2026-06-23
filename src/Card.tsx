import './Card.css'

type CardProps = {
    id: number
    name: string
    description: string
    onDelete: (id: number) => void
}

function Card({ id, name, description, onDelete }: CardProps) {
    return (
        <article className="character-card">
            <h2>{name}</h2>
            <p>{description}</p>

            <button
                className="secondary-button"
                onClick={() => onDelete(id)}>
                Delete
            </button>
        </article>
    )
}

export default Card