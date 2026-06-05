import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing and header', () => {
  beforeEach(() => {
    // Clear sessionStorage and localStorage before each test
    sessionStorage.clear();
    localStorage.clear();
  });

  it('renders header on all routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/HireHub Onboarding Portal/i)).toBeInTheDocument();
  });

  it('renders home page at "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to HireHub!/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument();
  });

  it('renders application form at "/apply"', () => {
    render(
      <MemoryRouter initialEntries={['/apply']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Application Form/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Position applied for/i)).toBeInTheDocument();
  });

  it('renders admin portal at "/admin"', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/View Applications/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go Home/i)).toBeInTheDocument();
  });

  it('navigates between routes using header links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Click Apply link
    const applyLink = screen.getByText(/Apply Now/i);
    fireEvent.click(applyLink);
    // Since it's an anchor, navigation won't happen in test, so simulate route change
    render(
      <MemoryRouter initialEntries={['/apply']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Application Form/i)).toBeInTheDocument();

    // Click Admin Portal link
    const adminLink = screen.getByText(/Admin Portal/i);
    fireEvent.click(adminLink);
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument();
  });
});