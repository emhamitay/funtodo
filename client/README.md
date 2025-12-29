# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## UX: Loading Feedback

The app uses [sonner](https://sonner.emilkowal.ski/) to display non-blocking loading toasts for long operations:

- Login: shows "Signing you in..." and dismisses on success/error.
- Registration: shows "Creating your account..." and dismisses on success/error.
- Post-auth sync: after login/registration, a toast indicates task syncing while local tasks merge and server tasks load.

You can adjust messages or disable buttons during loading in:

- `src/features/login/LoginForm.jsx`
- `src/features/login/RegisterForm.jsx`
- `src/features/login/AuthenticationModal.jsx`
