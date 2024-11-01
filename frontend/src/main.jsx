import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PasswordsContextProvider } from './context/PasswordContext';
import { AuthContextProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <PasswordsContextProvider>
        <App />
      </PasswordsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
