/**
 * Helper functions for localStorage CRUD for HireHub submissions.
 * Handles corrupted data gracefully.
 */

const STORAGE_KEY = 'hirehub_applications';

/**
 * Get all submissions from localStorage.
 * @returns {array} Array of submissions, or empty array if none/corrupted.
 */
export function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    return [];
  }
}

/**
 * Save all submissions to localStorage.
 * @param {array} submissions Array of submissions to save.
 * @returns {boolean} True if successful, false otherwise.
 */
export function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Add a new submission to localStorage.
 * @param {object} submission Submission object to add.
 * @returns {boolean} True if successful, false otherwise.
 */
export function addSubmission(submission) {
  try {
    const submissions = getSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Update an existing submission by email.
 * @param {object} updatedSubmission Submission object with updated fields.
 * @returns {boolean} True if successful, false otherwise.
 */
export function updateSubmission(updatedSubmission) {
  try {
    const submissions = getSubmissions();
    const idx = submissions.findIndex(
      (s) =>
        s.email &&
        updatedSubmission.email &&
        s.email.trim().toLowerCase() === updatedSubmission.email.trim().toLowerCase()
    );
    if (idx === -1) return false;
    submissions[idx] = { ...submissions[idx], ...updatedSubmission };
    saveSubmissions(submissions);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Delete a submission by email.
 * @param {string} email Email of submission to delete.
 * @returns {boolean} True if successful, false otherwise.
 */
export function deleteSubmission(email) {
  try {
    const submissions = getSubmissions();
    const filtered = submissions.filter(
      (s) =>
        !(
          s.email &&
          email &&
          s.email.trim().toLowerCase() === email.trim().toLowerCase()
        )
    );
    saveSubmissions(filtered);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Check if an email already exists in submissions.
 * @param {string} email Email to check.
 * @returns {boolean} True if duplicate exists, false otherwise.
 */
export function isEmailDuplicate(email) {
  try {
    const submissions = getSubmissions();
    return submissions.some(
      (s) =>
        s.email &&
        email &&
        s.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
  } catch (err) {
    return false;
  }
}