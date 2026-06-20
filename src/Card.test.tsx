import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Card from './Card';

afterEach(() => {
  cleanup();
});

describe ('Card', () => {

    const cardProps = {
        id: 1,
        name: 'Luke Skywalker',
        description: 'Jedi from Tatooine',
        onDelete: vi.fn(),
    }

    it('renders character and description', () => {
        render(<Card {...cardProps}/>);
        expect(screen.getByText(cardProps.name)).toBeInTheDocument();
        expect(screen.getByText(cardProps.description)).toBeInTheDocument();
    })

    it('calls onDelete when delete button is clicked', async() => {
        const user = userEvent.setup();
        const onDelete = vi.fn();

        render(<Card {...cardProps} onDelete={onDelete}/>);

        await user.click(screen.getByRole('button', {name: /delete/i}));

        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(cardProps.id);
    });
});