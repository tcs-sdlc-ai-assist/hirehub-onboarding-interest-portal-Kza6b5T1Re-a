# HireHub Onboarding Portal — Deployment Guide

This document describes how to deploy the HireHub Onboarding Portal, including environment notes, Vercel configuration, and CI/CD considerations.

---

## 1. Deployment Overview

- **Frontend:**  
  Pure React 18 app, built with Vite.  
  No backend required — all data is stored in browser `localStorage`/`sessionStorage`.

- **Recommended Hosting:**  
  [Vercel](https://vercel.com/) (zero-config for Vite/React projects)  
  Also works on Netlify, GitHub Pages, or any static host.

---

## 2. Build & Preview

**Build for Production:**

```sh
npm run build
```

- Output: `dist/` folder (static assets)

**Preview Production Build Locally:**

```sh
npm run preview
```

---

## 3. Vercel Deployment

### a. One-Click Deploy

1. Push your code to GitHub/GitLab/Bitbucket.
2. Go to [Vercel](https://vercel.com/import) and import the repo.
3. Vercel auto-detects Vite + React and sets up the build:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click "Deploy".

### b. Manual Vercel Setup

- No environment variables required.
- No backend/serverless functions.
- [vercel.json](vercel.json) is included for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures all routes (e.g. `/apply`, `/admin`) serve `index.html` for client-side routing.

---

## 4. Environment Notes

- **No .env needed:**  
  All data is stored in the browser.  
  No API keys, no secrets, no backend endpoints.

- **Session:**  
  Admin login is stored in `sessionStorage` (`hirehub_logged_in`).

- **Persistence:**  
  Applications are stored in `localStorage` (`hirehub_applications`).

---

## 5. CI/CD Notes

- **Testing:**  
  - Run all tests before deploying:
    ```sh
    npm run test
    ```
  - Tests use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).

- **Vercel:**  
  - Runs `npm install`, `npm run build` automatically.
  - Fails deployment if build or tests fail.

- **Preview Deployments:**  
  - Every PR/branch gets a unique preview URL.

---

## 6. Custom Domains

- Add your domain in Vercel dashboard.
- Update DNS as instructed by Vercel.

---

## 7. Other Hosts

- **Netlify:**  
  - Add a `_redirects` file with:  
    ```
    /*    /index.html   200
    ```
- **GitHub Pages:**  
  - Use [gh-pages](https://github.com/tschaub/gh-pages) or deploy `/dist` as static site.
  - Client-side routing may require additional configuration.

---

## 8. Troubleshooting

- **404s on refresh:**  
  - Vercel's `vercel.json` handles this.  
  - For other hosts, ensure all routes rewrite to `/index.html`.

- **Data loss:**  
  - All data is client-side. Clearing browser storage/logging out will remove admin session and applications.

---

## 9. Security

- **Demo Only:**  
  - No real authentication or backend.
  - Do not use for production hiring without a backend.

---

**HireHub Onboarding Portal © 2024 HireHub. All rights reserved.**