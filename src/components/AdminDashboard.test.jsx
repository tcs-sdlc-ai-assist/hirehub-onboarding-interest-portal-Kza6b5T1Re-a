import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

function seedApplications(apps) {
  localStorage.setItem('hirehub_applications', JSON.stringify(apps));
}

describe('AdminDashboard component', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders stat cards and empty table when no submissions', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Applications/i)).toBeInTheDocument();
    expect(screen.getByText(/Unique Positions/i)).toBeInTheDocument();
    expect(screen.getByText(/No applications found/i)).toBeInTheDocument();
  });

  it('renders stat cards and table with submissions', () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        position: 'Designer',
        submittedAt: '2024-06-02T15:00:00Z',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-03T18:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    expect(screen.getByText('3')).toBeInTheDocument(); // Total Applications
    expect(screen.getByText('2')).toBeInTheDocument(); // Unique Positions
    expect(screen.getByText(/Charlie/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Edit/i).length).toBe(3);
    expect(screen.getAllByText(/Delete/i).length).toBe(3);
  });

  it('shows latest submission in stat card', () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        position: 'Designer',
        submittedAt: '2024-06-02T15:00:00Z',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-03T18:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    expect(screen.getByText(/Charlie \(Engineer\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Submitted:/i)).toBeInTheDocument();
  });

  it('opens edit modal and updates submission', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByText(/Edit Application/i)).toBeInTheDocument();
    const nameInput = screen.getByDisplayValue('Alice');
    fireEvent.change(nameInput, { target: { value: 'Alicia' } });
    const positionInput = screen.getByDisplayValue('Engineer');
    fireEvent.change(positionInput, { target: { value: 'Lead Engineer' } });
    fireEvent.click(screen.getByText(/Save/i));
    await waitFor(() =>
      expect(screen.queryByText(/Edit Application/i)).not.toBeInTheDocument()
    );
    expect(screen.getByText(/Application updated successfully/i)).toBeInTheDocument();
    // Table should update
    expect(screen.getByText('Alicia')).toBeInTheDocument();
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument();
    // Storage should update
    const stored = JSON.parse(localStorage.getItem('hirehub_applications'));
    expect(stored[0].name).toBe('Alicia');
    expect(stored[0].position).toBe('Lead Engineer');
  });

  it('shows validation error in edit modal for empty fields', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Edit/i));
    const nameInput = screen.getByDisplayValue('Alice');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(screen.getByText(/Save/i));
    expect(await screen.findByText(/All fields are required/i)).toBeInTheDocument();
  });

  it('shows validation error in edit modal for invalid email', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Edit/i));
    // Email is disabled, so cannot change, but test error for invalid email by changing value programmatically
    const emailInput = screen.getByDisplayValue('alice@example.com');
    emailInput.value = 'invalid-email';
    fireEvent.click(screen.getByText(/Save/i));
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it('closes edit modal on cancel', () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByText(/Edit Application/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Edit Application/i)).not.toBeInTheDocument();
  });

  it('deletes submission and updates table and storage', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        position: 'Designer',
        submittedAt: '2024-06-02T15:00:00Z',
      },
    ]);
    // Mock window.confirm to always return true
    window.confirm = () => true;
    render(<AdminDashboard />);
    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    await waitFor(() =>
      expect(screen.getByText(/Application deleted successfully/i)).toBeInTheDocument()
    );
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    // Storage should update
    const stored = JSON.parse(localStorage.getItem('hirehub_applications'));
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe('Bob');
  });

  it('does not delete submission if confirm is false', () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    window.confirm = () => false;
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(localStorage.getItem('hirehub_applications')).not.toBeNull();
  });

  it('shows error banner if storage fails on delete', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    window.confirm = () => true;
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('Storage error');
    };
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(await screen.findByText(/Failed to delete application/i)).toBeInTheDocument();
    localStorage.setItem = originalSetItem;
  });

  it('shows error banner if storage fails on update', async () => {
    seedApplications([
      {
        name: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        submittedAt: '2024-06-01T12:00:00Z',
      },
    ]);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('Storage error');
    };
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/Edit/i));
    const nameInput = screen.getByDisplayValue('Alice');
    fireEvent.change(nameInput, { target: { value: 'Alicia' } });
    fireEvent.click(screen.getByText(/Save/i));
    expect(await screen.findByText(/Failed to update application/i)).toBeInTheDocument();
    localStorage.setItem = originalSetItem;
  });

  it('shows error banner if storage is corrupted on load', () => {
    localStorage.setItem('hirehub_applications', 'not-a-json');
    render(<AdminDashboard />);
    expect(screen.getByText(/Failed to load applications/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Loading applications/i)).toBeInTheDocument();
  });
});