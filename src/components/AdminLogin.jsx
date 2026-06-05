import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const HARD_CODED = {
    username: 'admin',
    password: 'hirehub2024',
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (
        form.username.trim() === HARD_CODED.username &&
        form.password === HARD_CODED.password
      ) {
        sessionStorage.setItem('hirehub_logged_in', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="container flex-center" style={{ minHeight: '70vh' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="text-center" style={{ marginBottom: '1em' }}>Admin Login</h2>
        <form className="grid" style={{ gap: '1em' }} onSubmit={handleSubmit} autoComplete="off">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin"
              required
              disabled={submitting}
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              disabled={submitting}
            />
          </label>
          {error && (
            <div className="text-danger text-center" style={{ fontSize: '1em', marginBottom: '0.5em' }}>
              {error}
            </div>
          )}
          <button
            className="btn btn-danger mt-1"
            type="submit"
            disabled={submitting}
            style={{ fontSize: '1.05rem' }}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-1 text-center">
          <a className="btn btn-accent" href="/" style={{ fontSize: '1rem' }}>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {};

export default AdminLogin;