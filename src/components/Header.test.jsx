import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('renders portal title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/HireHub Onboarding Portal/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });

  it('shows Login button when not logged in', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('shows Logout button when logged in', () => {
    sessionStorage.setItem('hirehub_logged_in', 'true');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  it('login button sets sessionStorage and shows logout', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const loginBtn = screen.getByText(/Login/i);
    fireEvent.click(loginBtn);
    expect(sessionStorage.getItem('hirehub_logged_in')).toBe('true');
    // Re-render to update state
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('logout button removes sessionStorage and shows login', () => {
    sessionStorage.setItem('hirehub_logged_in', 'true');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);
    expect(sessionStorage.getItem('hirehub_logged_in')).not.toBe('true');
    // Re-render to update state
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('active nav link styling changes on route', () => {
    render(
      <MemoryRouter initialEntries={['/apply']}>
        <Header />
      </MemoryRouter>
    );
    const applyLink = screen.getByText(/Apply/i);
    expect(applyLink.className).toContain('btn-success');
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink.className).not.toContain('btn-success');
  });

  it('responsive layout: nav links and buttons always visible', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeVisible();
    expect(screen.getByText(/Apply/i)).toBeVisible();
    expect(screen.getByText(/Admin/i)).toBeVisible();
    expect(screen.getByText(/Login/i)).toBeVisible();
  });
});