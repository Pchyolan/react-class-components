import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
});

const renderApp = () => {
    return render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )
}

describe('App', () => {

    it('renders characters from fetch', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    name: 'Luke',
                    gender: 'male',
                    birth_year: '19BBY',
                    height: '172',
                },
            ]
        })
        renderApp()
        expect(await screen.findByText('Luke')).toBeInTheDocument();
        expect(await screen.findByText('Gender: male, Birth Year: 19BBY, Height: 172')).toBeInTheDocument();
    });

    it('renders error message when fetch fails', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
        });

        renderApp()
        expect(await screen.findByText('Failed to load characters')).toBeInTheDocument();
    });

    it('renders message no results message when characters arrays is empty', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [],
        })

        renderApp()
        expect(await screen.findByText('No results found in this galaxy..')).toBeInTheDocument();
    });

    it('removes character when Delete button is clicked', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    name: 'Luke',
                    gender: 'male',
                    birth_year: '19BBY',
                    height: '172',
                },
                {
                    id: 2,
                    name: 'Vader',
                    gender: 'male',
                    birth_year: '18ABY',
                    height: '178',
                },
            ]
        });

        renderApp()

        expect(await screen.findByText('Luke')).toBeInTheDocument();
        expect(await screen.findByText('Vader')).toBeInTheDocument();

        const user = userEvent.setup();
        const deleteBtns = screen.getAllByRole('button', { name: /delete/i });

        await user.click(deleteBtns[0]);

        expect(screen.queryByText('Luke')).not.toBeInTheDocument();
        expect(screen.getByText('Vader')).toBeInTheDocument();
    })

    it('fetches character by search value when Search button is clicked', async () => {
        globalThis.fetch = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [{
                    id: 1,
                    name: 'Luke',
                    gender: 'male',
                    birth_year: '19BBY',
                    height: '172',
                },
                ]
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        id: 2,
                        name: 'Vader',
                        gender: 'male',
                        birth_year: '18ABY',
                        height: '178',
                    },
                ]
            })

        renderApp()

        expect(await screen.findByText('Luke')).toBeInTheDocument();

        const searchBtn = screen.getByRole('button', { name: /search/i });
        const searchInput = screen.getByPlaceholderText('Search character...')
        const user = userEvent.setup();

        await user.type(searchInput, 'Vader')
        await user.click(searchBtn);

        expect(await screen.findByText('Vader')).toBeInTheDocument();

        expect(globalThis.fetch).toHaveBeenCalledTimes(2);
        expect(globalThis.fetch).toHaveBeenLastCalledWith('https://swapi.online/api/people?search=Vader')
    });

    it('saves search value to localStorage and renders search results', async () => {
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
        globalThis.fetch = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        id: 1,
                        name: 'Luke',
                        gender: 'male',
                        birth_year: '19BBY',
                        height: '172',
                    },
                ]
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        id: 2,
                        name: 'Vader',
                        gender: 'male',
                        birth_year: '18ABY',
                        height: '178',
                    },
                ]
            })

        renderApp()

        const user = userEvent.setup();
        const searchBtn = screen.getByRole('button', { name: /search/i });
        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(await screen.findByText('Luke')).toBeInTheDocument();

        await user.type(searchInput, 'Vader');
        await user.click(searchBtn);

        expect(setItemSpy).toHaveBeenCalledTimes(1);
        expect(setItemSpy).toHaveBeenCalledWith('search', 'Vader');
        expect(await screen.findByText('Vader')).toBeInTheDocument();
    });

    it('uses search value from localStorage on inital load', async () => {
        localStorage.setItem('search', 'Vader');

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 2,
                    name: 'Vader',
                    gender: 'male',
                    birth_year: '18ABY',
                    height: '178',
                }
            ]
        })

        renderApp()

        expect(screen.getByDisplayValue('Vader')).toBeInTheDocument();
        expect(globalThis.fetch).toHaveBeenCalledWith('https://swapi.online/api/people?search=Vader')
        expect(await screen.findByText('Vader')).toBeInTheDocument();

    });

    it('does not call fetch again when search value has not changed', async () => {
        localStorage.setItem('search', 'Luke');

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    name: 'Luke',
                    gender: 'male',
                    birth_year: '19BBY',
                    height: '172',
                }
            ]
        })

        renderApp()
        expect(await screen.findByText('Luke')).toBeInTheDocument();

        const user = userEvent.setup();
        const searchBtn = screen.getByRole('button', { name: /search/i });
        await user.click(searchBtn);

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    })

});