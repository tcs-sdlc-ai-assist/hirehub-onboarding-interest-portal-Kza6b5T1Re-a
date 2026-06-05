# HireHub Onboarding Portal

A modern onboarding portal for HireHub, built with React and Vite. This portal enables candidates to submit applications, track onboarding progress, and allows admins to manage submissions securely.

---

## Tech Stack

- **React 18+**
- **Vite**
- **JavaScript (JSX)**
- **React Router DOM**
- **PropTypes**
- **CSS (custom, responsive)**

---

## Features

- **Landing Page:** Welcome, features, and quick access to onboarding.
- **Interest/Application Form:** Candidates submit their details, with validation and duplicate checks.
- **Admin Portal:** Secure login, dashboard with stats, application review, edit, and delete.
- **Protected Routes:** Admin pages require authentication.
- **LocalStorage Persistence:** All submissions are stored client-side for demo purposes.
- **Responsive UI:** Works on desktop and mobile.
- **Error Handling:** Robust error and validation states throughout.

---

## Folder Structure

```
hirehub-onboarding-portal/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── EditModal.jsx
│   │   ├── Header.jsx
│   │   ├── InterestForm.jsx
│   │   ├── LandingPage.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SubmissionTable.jsx
│   ├── utils/
│   │   ├── storage.js
│   │   ├── validators.js
│   ├── tests/
│   │   └── (see *.test.jsx and *.test.js files)
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

---

## Setup & Usage

### 1. Clone the Repository

```
git clone https://github.com/your-org/hirehub-onboarding-portal.git
cd hirehub-onboarding-portal
```

### 2. Install Dependencies

```
npm install
```

### 3. Start Development Server

```
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```
npm run build
```

### 5. Preview Production Build

```
npm run preview
```

---

## Admin Access

- **Login Credentials:**  
  Username: `admin`  
  Password: `hirehub2024`

- **Session:**  
  Admin login is stored in `sessionStorage` for demo purposes.

---

## Testing

- **Run Unit Tests:**

```
npm run test
```

- Tests cover form validation, storage utilities, admin dashboard, login, and routing.

---

## Environment Variables

- No external API or backend required.
- All data is stored in browser `localStorage` for demo and testing.

---

## License

**PRIVATE & CONFIDENTIAL**

This codebase is proprietary to HireHub and intended for internal use only.  
Do not distribute, copy, or use outside of authorized HireHub projects.

---

## Contact

For questions or access requests, contact the HireHub engineering team.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**HireHub Onboarding Portal © 2024 HireHub. All rights reserved.**