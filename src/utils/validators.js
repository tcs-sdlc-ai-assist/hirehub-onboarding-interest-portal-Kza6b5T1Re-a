/**
 * Form field validation utilities for HireHub.
 * Each function returns an error string if invalid, or empty string if valid.
 */

/**
 * Validate full name.
 * @param {string} name
 * @returns {string} Error message or empty string.
 */
export function validateName(name) {
  if (!name || !name.trim()) {
    return 'Name is required.';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }
  return '';
}

/**
 * Validate email address.
 * @param {string} email
 * @returns {string} Error message or empty string.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required.';
  }
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!re.test(email.trim())) {
    return 'Invalid email address.';
  }
  return '';
}

/**
 * Validate mobile number (optional, but if present must be valid).
 * Accepts digits, spaces, +, -, (), min 7 digits.
 * @param {string} mobile
 * @returns {string} Error message or empty string.
 */
export function validateMobile(mobile) {
  if (!mobile || !mobile.trim()) return '';
  const cleaned = mobile.replace(/[^\d]/g, '');
  if (cleaned.length < 7) {
    return 'Mobile number must be at least 7 digits.';
  }
  return '';
}

/**
 * Validate department or position.
 * @param {string} department
 * @returns {string} Error message or empty string.
 */
export function validateDepartment(department) {
  if (!department || !department.trim()) {
    return 'Department/Position is required.';
  }
  if (department.trim().length < 2) {
    return 'Department/Position must be at least 2 characters.';
  }
  return '';
}