import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

afterEach(() => {
  cleanup();
});

describe('ErrorBoundary', () => {
    it('render children when there is no error', () => {
        render(<ErrorBoundary>
            <p>Hello, Luke!</p>
        </ErrorBoundary>);

        expect(screen.getByText('Hello, Luke!')).toBeInTheDocument();
    });
    it('renders fallback when child throws an error', () => {
        const FakeComponent = () => {
            throw new Error('test error')
        }
        render(<ErrorBoundary>
            <FakeComponent />
        </ErrorBoundary>);

        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    })
})