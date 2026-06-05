import React from 'react';
import PropTypes from 'prop-types';

function LandingPage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="card text-center" style={{ marginBottom: '2em' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.2rem', marginBottom: '0.5em' }}>
          Welcome to HireHub Onboarding
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)', marginBottom: '1.5em' }}>
          Kickstart your career journey with a seamless onboarding experience. Discover how HireHub empowers you to succeed from day one.
        </p>
        <div className="flex-center" style={{ gap: '1em', marginBottom: '1em' }}>
          <a className="btn btn-success" href="/apply" style={{ fontSize: '1.1rem' }}>
            Apply Now
          </a>
          <a className="btn btn-accent" href="/apply" style={{ fontSize: '1.1rem' }}>
            Start Onboarding
          </a>
        </div>
      </div>
      {/* Features Section */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5em' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: 'var(--color-accent)', marginBottom: '0.5em' }}>
            <span role="img" aria-label="rocket">🚀</span>
          </div>
          <h3>Fast Application</h3>
          <p className="text-muted">
            Submit your details in minutes and get started quickly. Our streamlined process saves you time.
          </p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: 'var(--color-success)', marginBottom: '0.5em' }}>
            <span role="img" aria-label="checklist">✅</span>
          </div>
          <h3>Transparent Progress</h3>
          <p className="text-muted">
            Track your onboarding status and stay informed every step of the way. No surprises, just clarity.
          </p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.5em' }}>
            <span role="img" aria-label="support">🤝</span>
          </div>
          <h3>Personalized Support</h3>
          <p className="text-muted">
            Get help from our dedicated team whenever you need it. Your success is our priority.
          </p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: 'var(--color-danger)', marginBottom: '0.5em' }}>
            <span role="img" aria-label="security">🔒</span>
          </div>
          <h3>Secure & Private</h3>
          <p className="text-muted">
            Your information is protected with industry-leading security. Privacy you can trust.
          </p>
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {};

export default LandingPage;