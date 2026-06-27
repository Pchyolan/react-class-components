import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

afterEach(() => {
  cleanup();
});

describe ('Pagination', () => {
    const paginationProps = {
        currentPage: 1,
        onNextPage: vi.fn(),
        onPreviousPage: vi.fn(),
    }

    it('render current page', () => {
        render(<Pagination {...paginationProps} />);
        expect(screen.getByText('Page: 1')).toBeInTheDocument();
    })

    it('calls toNextPage when buttton Next is clicked', async() => {
        const onNextPage = vi.fn();
        render (<Pagination {...paginationProps} onNextPage={onNextPage} />)
        
        const user = userEvent.setup();
        const nextBtn = screen.getByRole('button', {name: '→' });

        await user.click(nextBtn);
        expect(onNextPage).toHaveBeenCalledTimes(1);
    })

    it('calls toPreviousPage when buttton Previous is clicked', async() => {
        const onPreviousPage = vi.fn();
        render (<Pagination {...paginationProps} onPreviousPage={onPreviousPage} />)
        
        const user = userEvent.setup();
        const nextBtn = screen.getByRole('button', {name: '←' });

        await user.click(nextBtn);
        expect(onPreviousPage).toHaveBeenCalledTimes(1);
    })
})