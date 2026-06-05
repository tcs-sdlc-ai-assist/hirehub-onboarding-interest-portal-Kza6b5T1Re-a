import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * EditModal component
 * @param {object} props
 * @param {object} props.submission
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {function} props.onSave
 */
function EditModal({ submission, open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: submission ? submission.name : '',
    email: submission ? submission.email : '',
    position: submission ? submission.position : '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (submission) {
      setForm({
        name: submission.name,
        email: submission.email,
        position: submission.position,
      });
      setError('');
    }
  }, [submission]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      setError('All fields are required.');
      return;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      setError('Invalid email address.');
      return;
    }
    try {
      const stored = localStorage.getItem('hirehub_applications');
      let applications = [];
      if (stored) {
        applications = JSON.parse(stored);
      }
      const updated = applications.map((app) =>
        app.email === form.email
          ? {
              ...app,
              name: form.name.trim(),
              position: form.position.trim(),
            }
          : app
      );
      localStorage.setItem('hirehub_applications', JSON.stringify(updated));
      onSave({
        ...submission,
        name: form.name.trim(),
        position: form.position.trim(),
      });
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        background: 'rgba(44,62,80,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center">Edit Application</h3>
        <form className="grid" style={{ gap: '1em' }} onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled
              style={{ background: '#f5f7fa', color: '#888' }}
            />
          </label>
          <label>
            Position
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              required
            />
          </label>
          {error && (
            <div className="text-danger text-center" style={{ fontSize: '1em' }}>
              {error}
            </div>
          )}
          <div className="flex-center" style={{ gap: '1em', marginTop: '1em' }}>
            <button className="btn btn-success" type="submit">
              Save
            </button>
            <button className="btn btn-accent" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  submission: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditModal;