import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SubmissionTable component
 * @param {object} props
 * @param {array} props.submissions
 * @param {function} props.onEdit
 * @param {function} props.onDelete
 */
function SubmissionTable({ submissions, onEdit, onDelete }) {
  if (!submissions.length) {
    return (
      <div className="text-center text-muted" style={{ margin: '2em 0' }}>
        No applications found.
      </div>
    );
  }
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1em',
        fontSize: '1rem',
      }}
    >
      <thead>
        <tr style={{ background: 'var(--color-secondary)' }}>
          <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Name</th>
          <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Email</th>
          <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Position</th>
          <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Submitted At</th>
          <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((sub, idx) => (
          <tr key={sub.email} style={{ background: idx % 2 ? 'var(--color-secondary)' : 'var(--color-bg)' }}>
            <td style={{ padding: '0.7em' }}>{sub.name}</td>
            <td style={{ padding: '0.7em' }}>{sub.email}</td>
            <td style={{ padding: '0.7em' }}>{sub.position}</td>
            <td style={{ padding: '0.7em' }}>
              {new Date(sub.submittedAt).toLocaleString()}
            </td>
            <td style={{ padding: '0.7em' }}>
              <button
                className="btn btn-accent"
                style={{ marginRight: '0.5em', fontSize: '0.95rem' }}
                onClick={() => onEdit(sub)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                style={{ fontSize: '0.95rem' }}
                onClick={() => onDelete(sub)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SubmissionTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

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
    onSave({
      ...submission,
      name: form.name.trim(),
      email: form.email.trim(),
      position: form.position.trim(),
    });
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

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({ type: '', message: '' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const stored = localStorage.getItem('hirehub_applications');
      if (stored) {
        setSubmissions(JSON.parse(stored));
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      setBanner({
        type: 'danger',
        message: 'Failed to load applications.',
      });
    }
    setLoading(false);
  }, []);

  const refreshSubmissions = () => {
    try {
      const stored = localStorage.getItem('hirehub_applications');
      if (stored) {
        setSubmissions(JSON.parse(stored));
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      setBanner({
        type: 'danger',
        message: 'Failed to refresh applications.',
      });
    }
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    setEditModalOpen(true);
    setBanner({ type: '', message: '' });
  };

  const handleDelete = (submission) => {
    if (!window.confirm(`Delete application for ${submission.name}?`)) return;
    try {
      const updated = submissions.filter(
        (s) => s.email !== submission.email
      );
      localStorage.setItem('hirehub_applications', JSON.stringify(updated));
      setSubmissions(updated);
      setBanner({
        type: 'success',
        message: 'Application deleted successfully.',
      });
    } catch (err) {
      setBanner({
        type: 'danger',
        message: 'Failed to delete application.',
      });
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setEditingSubmission(null);
    setBanner({ type: '', message: '' });
  };

  const handleModalSave = (updatedSubmission) => {
    try {
      const updated = submissions.map((s) =>
        s.email === updatedSubmission.email ? updatedSubmission : s
      );
      localStorage.setItem('hirehub_applications', JSON.stringify(updated));
      setSubmissions(updated);
      setEditModalOpen(false);
      setEditingSubmission(null);
      setBanner({
        type: 'success',
        message: 'Application updated successfully.',
      });
    } catch (err) {
      setBanner({
        type: 'danger',
        message: 'Failed to update application.',
      });
    }
  };

  // Stat cards
  const total = submissions.length;
  const uniquePositions = Array.from(
    new Set(submissions.map((s) => s.position.trim().toLowerCase()))
  );
  const latest = submissions.length
    ? submissions.reduce((a, b) =>
        new Date(a.submittedAt) > new Date(b.submittedAt) ? a : b
      )
    : null;

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p className="text-muted">
          Manage onboarding applications and review candidate progress.
        </p>
        {banner.message && (
          <div
            className={`text-center text-${banner.type} mb-1`}
            style={{
              padding: '0.7em 1em',
              borderRadius: 'var(--border-radius)',
              background:
                banner.type === 'success'
                  ? 'var(--color-success)'
                  : banner.type === 'danger'
                  ? 'var(--color-danger)'
                  : 'var(--color-accent)',
              color: '#fff',
              marginBottom: '1em',
            }}
            role="alert"
          >
            {banner.message}
          </div>
        )}
        {/* Stat Cards */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1em', marginBottom: '2em' }}>
          <div className="card" style={{ textAlign: 'center', background: 'var(--color-secondary)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>
              <span role="img" aria-label="total">📋</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>{total}</div>
            <div className="text-muted">Total Applications</div>
          </div>
          <div className="card" style={{ textAlign: 'center', background: 'var(--color-secondary)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>
              <span role="img" aria-label="departments">🏷️</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>{uniquePositions.length}</div>
            <div className="text-muted">Unique Positions</div>
          </div>
          <div className="card" style={{ textAlign: 'center', background: 'var(--color-secondary)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-success)' }}>
              <span role="img" aria-label="latest">⏰</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {latest
                ? `${latest.name} (${latest.position})`
                : '—'}
            </div>
            <div className="text-muted" style={{ fontSize: '0.95em' }}>
              {latest
                ? `Submitted: ${new Date(latest.submittedAt).toLocaleString()}`
                : 'No submissions yet'}
            </div>
          </div>
        </div>
        {/* Submission Table */}
        {loading ? (
          <div className="text-center text-muted" style={{ margin: '2em 0' }}>
            Loading applications...
          </div>
        ) : (
          <SubmissionTable
            submissions={submissions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <EditModal
        submission={editingSubmission}
        open={editModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </div>
  );
}

AdminDashboard.propTypes = {};

export default AdminDashboard;