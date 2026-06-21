import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';

afterEach(() => {
    cleanup();
});

describe('Search', () => {
    const searchProps = {
        search: '',
        onSearchChange: vi.fn(),
        onSearch: vi.fn(),
    }

    it('renders input and search button', () => {
         render(<Search {...searchProps} />);

         expect(screen.getByPlaceholderText(/search character/i)).toBeInTheDocument();
         expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    })

    it('calls onSearchChange when user types in input', async () => {
        const onSearchChange = vi.fn();
        const user = userEvent.setup();

        render(<Search {...searchProps} onSearchChange={onSearchChange} />)
        const input = screen.getByPlaceholderText(/search character/i)

        await user.type(input, 'Luke');

        expect(onSearchChange).toHaveBeenCalledTimes(4);
        expect(onSearchChange).toHaveBeenLastCalledWith('e')
    })

    it('calls onSearch when search button is clicked', async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();

        render(<Search {...searchProps} onSearch={onSearch} />);

        const searchBtn = screen.getByRole('button', { name: /search/i });
        await user.click(searchBtn)

        expect(onSearch).toHaveBeenCalledTimes(1);
    })

    it('renders search value in input', () => {
        render(<Search {...searchProps} search='Luke' />);

        expect(screen.getByDisplayValue('Luke')).toBeInTheDocument();
    })
})