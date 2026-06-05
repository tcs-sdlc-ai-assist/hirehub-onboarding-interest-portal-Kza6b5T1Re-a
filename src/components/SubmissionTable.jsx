import React from 'react';
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
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: 600,
          fontSize: '1rem',
        }}
      >
        <thead>
          <tr style={{ background: 'var(--color-secondary)' }}>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>#</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Name</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Email</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Mobile</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Department</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Submitted At</th>
            <th style={{ padding: '0.7em', borderBottom: '1px solid var(--color-secondary)' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, idx) => (
            <tr key={sub.email} style={{ background: idx % 2 ? 'var(--color-secondary)' : 'var(--color-bg)' }}>
              <td style={{ padding: '0.7em', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
              <td style={{ padding: '0.7em' }}>{sub.name}</td>
              <td style={{ padding: '0.7em' }}>{sub.email}</td>
              <td style={{ padding: '0.7em' }}>
                {sub.mobile ? (
                  <span>{sub.mobile}</span>
                ) : (
                  <span className="text-muted" style={{ fontSize: '0.95em' }}>—</span>
                )}
              </td>
              <td style={{ padding: '0.7em' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2em 0.7em',
                    borderRadius: '16px',
                    background: 'var(--color-accent)',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                    fontSize: '0.95em',
                  }}
                >
                  {sub.department || sub.position || '—'}
                </span>
              </td>
              <td style={{ padding: '0.7em', fontSize: '0.98em', color: 'var(--color-muted)' }}>
                {sub.submittedAt
                  ? new Date(sub.submittedAt).toLocaleString()
                  : '—'}
              </td>
              <td style={{ padding: '0.7em', textAlign: 'center' }}>
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
    </div>
  );
}

SubmissionTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SubmissionTable;