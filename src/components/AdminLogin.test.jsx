import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

describe('AdminLogin component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('renders username and password fields', () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/admin/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('shows error for invalid credentials', async () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/admin/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/Login/i));
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    expect(sessionStorage.getItem('hirehub_logged_in')).not.toBe('true');
  });

  it('sets sessionStorage and navigates on correct credentials', () => {
    // Mock useNavigate to test navigation
    const mockNavigate = vi.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/admin/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'hirehub2024' } });
    fireEvent.click(screen.getByText(/Login/i));
    expect(sessionStorage.getItem('hirehub_logged_in')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/admin');
    jest.restoreAllMocks();
  });

  it('shows error for storage failure', async () => {
    // Simulate sessionStorage failure
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = () => {
      throw new Error('Storage error');
    };
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/admin/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'hirehub2024' } });
    fireEvent.click(screen.getByText(/Login/i));
    expect(await screen.findByText(/An error occurred/i)).toBeInTheDocument();
    sessionStorage.setItem = originalSetItem;
  });

  it('disables fields and button while submitting', () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/admin/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'hirehub2024' } });
    const loginBtn = screen.getByText(/Login/i);
    fireEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();
    expect(screen.getByPlaceholderText(/admin/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDisabled();
  });

  it('shows Back to Home link', () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
  });
});