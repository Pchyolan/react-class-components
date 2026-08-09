import './Card.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Person } from './types';
import { useSelectedItemsStore } from './store/selectedItemStore';
import { type MouseEvent } from 'react';


type CardProps = {
    person: Person
    description: string
    onDelete: (id: number) => void
}

function Card({ person, description, onDelete }: CardProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const toggleItem = useSelectedItemsStore((state) => state.toggleItem);
    const isSelected = useSelectedItemsStore((state) => state.isSelected(person.id));

    const handleCardClick = () => {
        navigate(`/details/${person.id}${location.search}`)
    }

    const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    }

    const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete(person.id)
    }

    const cardClassName = isSelected ? 'character-card selected' : 'character-card';

    return (
        <article
            className={cardClassName}
            onClick={handleCardClick}
        >
            <div className='card-title'>
                <input type='checkbox'
                    onChange={() => toggleItem(person)}
                    checked={isSelected}
                    onClick={handleCheckboxClick}
                />
                <h2>{person.name}</h2>
            </div>
            <p>{description}</p>
            <button
                type='button'
                className="secondary-button"
                onClick={handleDeleteClick}>
                Delete
            </button>
        </article>
    )
}

export default Card