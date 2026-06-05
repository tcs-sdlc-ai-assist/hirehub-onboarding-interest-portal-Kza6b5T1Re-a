import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header() {
  return (
    <header className="card flex-center mb-2">
      <h1>HireHub Onboarding Portal</h1>
    </header>
  );
}

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to HireHub!</h2>
        <p>
          Start your onboarding journey or manage applications as an admin.
        </p>
        <div className="flex mt-1">
          <a className="btn btn-accent" href="/apply">Apply Now</a>
          <a className="btn btn-success" href="/admin">Admin Portal</a>
        </div>
      </div>
    </div>
  );
}

function Apply() {
  return (
    <div className="container">
      <div className="card">
        <h2>Application Form</h2>
        <p>
          Please fill out your details to begin onboarding.
        </p>
        {/* Simple form placeholder */}
        <form className="grid" style={{ maxWidth: 400 }}>
          <label>
            Full Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label>
            Position
            <input type="text" name="position" placeholder="Position applied for" required />
          </label>
          <button className="btn btn-success mt-1" type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div className="container">
      <div className="card">
        <h2>Admin Portal</h2>
        <p>
          Manage onboarding applications and review candidate progress.
        </p>
        {/* Placeholder for admin actions */}
        <div className="grid">
          <button className="btn btn-accent">View Applications</button>
          <button className="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container">
      <div className="card text-center">
        <h2 className="text-danger">404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <a className="btn" href="/">Go Home</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

Header.propTypes = {};
Home.propTypes = {};
Apply.propTypes = {};
Admin.propTypes = {};
NotFound.propTypes = {};

export default App;