<<<<<<< HEAD
# React Routing & Firebase Authentication Assignment

A simple React application demonstrating **React Router**, **Firebase Email/Password Authentication**, and **protected routes**. This project uses **Create React App (CRA)** with `react-scripts` (not Vite).

## 1. Requirements

- Node.js and npm
- A Firebase project
- Internet connection for package installation and Firebase Authentication

## 2. Install and run (Create React App)

Open a terminal in the project folder and run:

```bash
npm install
npm start
```

You can also use `npm run dev` as a convenience alias; both commands start the same Create React App development server (there is no Vite server).

Create React App starts the development server at `http://localhost:3000` and opens the app in your browser.

To create an optimized production build:

```bash
npm run build
```

> This project intentionally uses CRA's `start` command. Do not use `npm run dev`; that was the old Vite command.

## 3. Firebase setup

1. Open the [Firebase Console](https://console.firebase.google.com/) and create a Firebase project.
2. Add a **Web App** to the project.
3. Copy the Firebase web app configuration.
4. Make a copy of `.env.example` named `.env` in the project root.
5. Replace the example values with your Firebase configuration values. The variable names must begin with `REACT_APP_` as shown below.
6. In Firebase Console, open **Authentication** → **Sign-in method**.
7. Enable **Email/Password** and save.
8. Stop and restart `npm start` after creating or changing `.env`.

Example `.env` format:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Do not commit `.env` or share your Firebase configuration in public screenshots. The `.env.example` file is safe to include in GitHub.

## 4. Required pages and routes

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Dashboard | `/dashboard` | Protected |
| Profile | `/profile` | Protected |

## 5. Main implementation files

- `src/index.js` — Create React App entry point; wraps the app in `BrowserRouter` and `AuthProvider`.
- `src/App.jsx` — declares the five application routes using `Routes` and `Route`.
- `src/firebase.js` — initializes the Firebase app and Authentication service from CRA environment variables.
- `src/context/AuthContext.jsx` — observes authentication state and provides register, login, and logout functions.
- `src/components/Navbar.jsx` — shows navigation links and Login or Logout based on authentication state.
- `src/components/ProtectedRoute.jsx` — redirects signed-out visitors to `/login`.
- `src/pages/` — contains Home, Login, Register, Dashboard, and Profile.

## 6. How the assignment works

### React Router

`BrowserRouter` enables browser-based routing. `Routes` selects the matching `Route`. `Link` and `NavLink` navigate between pages without reloading the entire document. `useNavigate` navigates after login or logout.

### Firebase Authentication

- Registration uses `createUserWithEmailAndPassword(auth, email, password)`.
- Login uses `signInWithEmailAndPassword(auth, email, password)`.
- Logout uses `signOut(auth)`.
- `onAuthStateChanged(auth, callback)` listens for sign-in and sign-out changes.

### Authentication state and refresh

`AuthProvider` stores the current Firebase user in React state. It sets `browserLocalPersistence`, which keeps a signed-in session after a browser refresh. A loading message is displayed while Firebase restores the saved session.

### Protected routes

`ProtectedRoute` waits for Firebase to finish restoring the session. If there is no signed-in user, it redirects to `/login`; otherwise, it renders the protected page with `Outlet`. The originally requested page is saved, so a successful login can return the user to that page.

## 7. Suggested testing

1. Visit `/` — Home should be available without logging in.
2. Open `/dashboard` in a signed-out browser — it should redirect to `/login`.
3. Register with an email and password of at least 6 characters.
4. Confirm Dashboard displays the signed-in user's email.
5. Refresh Dashboard — the user should remain signed in.
6. Open Profile — it should display the same email.
7. Click Logout — the app should return to Home and the Navbar should show Login and Register.
8. Try `/profile` after logout — it should redirect to Login.

## 8. Submission checklist

- [ ] Push the project to a GitHub repository.
- [ ] Include screenshots of Home, Login, Register, Dashboard, and Profile.
- [ ] Include a screenshot showing that a signed-out user is redirected from a protected route to Login.
- [ ] Do not commit the `.env` file.
=======
# react-firebase-assignment
cse-3532 assignment
>>>>>>> 33256b2db13f3c9e0284133f8c6b14beb9cf2bc4
