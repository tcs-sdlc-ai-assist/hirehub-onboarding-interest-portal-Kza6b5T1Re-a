# HireHub Onboarding Portal — Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] — 2024-06-01

### Initial Release

**Features:**

- **Landing Page:**  
  - Welcome hero section  
  - Features overview  
  - Quick links to Apply and Admin

- **Interest/Application Form:**  
  - Candidate form with validation  
  - Duplicate email check  
  - LocalStorage persistence  
  - Success/error banners

- **Admin Portal:**  
  - Secure login (username: `admin`, password: `hirehub2024`)  
  - Session stored in sessionStorage  
  - Dashboard with stats (total applications, unique positions, latest submission)  
  - Application table with edit/delete  
  - Edit modal with validation  
  - Robust error handling

- **Protected Routes:**  
  - Admin pages require authentication

- **Responsive UI:**  
  - Mobile and desktop friendly  
  - Accessible forms and navigation

- **Utilities:**  
  - LocalStorage CRUD helpers  
  - Form field validators

- **Testing:**  
  - Unit tests for forms, storage, admin, login, and validators

- **Build & Tooling:**  
  - Vite + React 18  
  - PropTypes for validation  
  - No backend required (demo only)

---

## [Unreleased]

- (No changes yet)

---

**HireHub Onboarding Portal © 2024 HireHub. All rights reserved.**