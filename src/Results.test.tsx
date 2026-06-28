import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';

afterEach(() => {
    cleanup();
});

describe('Results', () => {
    const resultsProps = {
        characters: [{
            id: 1,
            name: 'Luke',
            gender: 'male',
            birth_year: '003B31',
            height: '172',
        }, {
            id: 2,
            name: 'Vader',
            gender: 'male',
            birth_year: '003A19',
            height: '178',
        }],
        loading: false,
        error: null,
        onDelete: vi.fn(),
    }

    it('render loading message', () => {
        render(
        <MemoryRouter>
            <Results {...resultsProps} loading={true} />
        </MemoryRouter>
    );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('render error message', () => {
        render(
            <MemoryRouter>
                <Results {...resultsProps} error='Something is wrong' />
        </MemoryRouter>
    );
        expect(screen.getByText('Something is wrong')).toBeInTheDocument();
    });

    it('render no resuts', () => {
        render(<MemoryRouter>
            <Results {...resultsProps} characters={[]} />
        </MemoryRouter>
    );
        expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });

    it('render characters cards', () => {
        render(<MemoryRouter>
            <Results {...resultsProps} />
        </MemoryRouter>
    );
        expect(screen.getByText('Luke')).toBeInTheDocument();
        expect(screen.getByText('Vader')).toBeInTheDocument();

        expect(screen.getByText('Gender: male, Birth Year: 003B31, Height: 172')).toBeInTheDocument();
        expect(screen.getByText('Gender: male, Birth Year: 003A19, Height: 178')).toBeInTheDocument();
    });

    it('calls onDelete with characters id when delete button is clicked', async() => {
        const user = userEvent.setup();
        const onDelete = vi.fn();

        render(<MemoryRouter>
            <Results {...resultsProps} onDelete={onDelete} />
        </MemoryRouter>
    );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })

        await user.click(deleteButtons[0]);
        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it('render error button', () => {
        render(
        <MemoryRouter>
            <Results {...resultsProps} />
        </MemoryRouter>
    );
        expect(screen.getByRole('button', {name: /throw error/i})).toBeInTheDocument();
    });
});