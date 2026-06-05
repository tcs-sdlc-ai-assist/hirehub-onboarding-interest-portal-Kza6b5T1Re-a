import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InterestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
  });
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      newErrors.email = 'Invalid email address.';
    }
    if (!form.position.trim()) {
      newErrors.position = 'Position is required.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
    setBanner({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBanner({ type: '', message: '' });
    setSubmitting(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }
    try {
      const stored = localStorage.getItem('hirehub_applications');
      let applications = [];
      if (stored) {
        applications = JSON.parse(stored);
      }
      const duplicate = applications.find(
        (app) => app.email.trim().toLowerCase() === form.email.trim().toLowerCase()
      );
      if (duplicate) {
        setBanner({
          type: 'danger',
          message: 'An application with this email already exists.',
        });
        setSubmitting(false);
        return;
      }
      const newApp = {
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position.trim(),
        submittedAt: new Date().toISOString(),
      };
      applications.push(newApp);
      localStorage.setItem('hirehub_applications', JSON.stringify(applications));
      setBanner({
        type: 'success',
        message: 'Application submitted successfully!',
      });
      setForm({ name: '', email: '', position: '' });
      setErrors({});
    } catch (err) {
      setBanner({
        type: 'danger',
        message: 'An error occurred. Please try again.',
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2>Express Your Interest</h2>
        <p>
          Fill out the form below to start your onboarding journey.
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
        <form className="grid" style={{ gap: '1em' }} onSubmit={handleSubmit} autoComplete="off">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              disabled={submitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <div className="text-danger" id="name-error" style={{ fontSize: '0.95em' }}>
                {errors.name}
              </div>
            )}
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
              disabled={submitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div className="text-danger" id="email-error" style={{ fontSize: '0.95em' }}>
                {errors.email}
              </div>
            )}
          </label>
          <label>
            Position
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Position applied for"
              required
              disabled={submitting}
              aria-invalid={!!errors.position}
              aria-describedby={errors.position ? 'position-error' : undefined}
            />
            {errors.position && (
              <div className="text-danger" id="position-error" style={{ fontSize: '0.95em' }}>
                {errors.position}
              </div>
            )}
          </label>
          <button
            className="btn btn-success mt-1"
            type="submit"
            disabled={submitting}
            style={{ fontSize: '1.05rem' }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        <div className="mt-1">
          <a className="btn btn-accent" href="/" style={{ fontSize: '1rem' }}>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

InterestForm.propTypes = {};

export default InterestForm;