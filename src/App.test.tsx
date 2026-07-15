import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App navigation', () => {
  beforeEach(() => { location.hash = '#/'; });
  it('shows the adaptive home and accessible navigation', async () => {
    render(<App />);
    expect(await screen.findByRole('heading', { name: /Tu inglés empieza aquí/i })).toBeInTheDocument();
    expect(screen.getAllByRole('navigation', { name: /Navegación principal/i }).length).toBeGreaterThan(0);
  });
});
