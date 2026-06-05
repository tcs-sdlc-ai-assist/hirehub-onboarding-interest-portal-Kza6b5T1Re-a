import React from 'react';
import PropTypes from 'prop-types';
import AdminLogin from './AdminLogin';

/**
 * ProtectedRoute component for guarding admin routes.
 * Checks sessionStorage for 'hirehub_logged_in'.
 * Renders children if authenticated, else renders <AdminLogin />.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode}
 */
function ProtectedRoute({ children }) {
  const loggedIn = sessionStorage.getItem('hirehub_logged_in') === 'true';
  if (loggedIn) {
    return <>{children}</>;
  }
  return <AdminLogin />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;