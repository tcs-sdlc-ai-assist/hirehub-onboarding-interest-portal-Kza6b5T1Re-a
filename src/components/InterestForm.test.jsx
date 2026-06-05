import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InterestForm from './InterestForm';

describe('InterestForm component', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders form fields and submit button', () => {
    render(<InterestForm />);
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Position applied for/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Application/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<InterestForm />);
    fireEvent.click(screen.getByText(/Submit Application/i));
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Position is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<InterestForm />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email.com/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText(/Position applied for/i), { target: { value: 'Developer' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it('submits successfully and shows success banner', async () => {
    render(<InterestForm />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email.com/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Position applied for/i), { target: { value: 'Designer' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    expect(await screen.findByText(/Application submitted successfully/i)).toBeInTheDocument();
    // Form should reset
    expect(screen.getByPlaceholderText(/Your name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/you@email.com/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Position applied for/i).value).toBe('');
    // Storage should have the submission
    const stored = localStorage.getItem('hirehub_applications');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored);
    expect(parsed.length).toBe(1);
    expect(parsed[0].email).toBe('jane@example.com');
  });

  it('shows error banner for duplicate email', async () => {
    // Pre-populate storage
    localStorage.setItem(
      'hirehub_applications',
      JSON.stringify([
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          position: 'Designer',
          submittedAt: new Date().toISOString(),
        },
      ])
    );
    render(<InterestForm />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email.com/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Position applied for/i), { target: { value: 'Designer' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    expect(await screen.findByText(/An application with this email already exists/i)).toBeInTheDocument();
  });

  it('shows error banner for storage failure', async () => {
    // Simulate localStorage failure
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('Storage error');
    };
    render(<InterestForm />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email.com/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Position applied for/i), { target: { value: 'Engineer' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    expect(await screen.findByText(/An error occurred/i)).toBeInTheDocument();
    localStorage.setItem = originalSetItem;
  });

  it('disables submit button while submitting', () => {
    render(<InterestForm />);
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email.com/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Position applied for/i), { target: { value: 'Engineer' } });
    const submitBtn = screen.getByText(/Submit Application/i);
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
  });

  it('shows Back to Home link', () => {
    render(<InterestForm />);
    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
  });
});