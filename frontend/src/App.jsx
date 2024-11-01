import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Start from './pages/Start';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <div className="pages">
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Start />} 
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
