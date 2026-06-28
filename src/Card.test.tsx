import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Card from './Card';

afterEach(() => {
    cleanup();
});

describe('Card', () => {

    const cardProps = {
        id: 1,
        name: 'Luke Skywalker',
        description: 'Jedi from Tatooine',
        onDelete: vi.fn(),
    }

    it('renders character and description', () => {
        render(<MemoryRouter>
            <Card {...cardProps} />
        </MemoryRouter>
        );
        expect(screen.getByText(cardProps.name)).toBeInTheDocument();
        expect(screen.getByText(cardProps.description)).toBeInTheDocument();
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn();

        render(<MemoryRouter>
            <Card {...cardProps} onDelete={onDelete} />
        </MemoryRouter>);

        await user.click(screen.getByRole('button', { name: /delete/i }));

        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(cardProps.id);
    });

    it('render details link', () => {
        render(<MemoryRouter>
            <Card {...cardProps} />
        </MemoryRouter>
        );

        expect(screen.getByRole('link', {name: /details/i})).toHaveAttribute('href', '/details/1')
    })
});