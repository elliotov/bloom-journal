import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import RequireAuth from './RequireAuth';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import ChatInterface from './ChatInterface';
import Dashboard from './Dashboard';
import './firebase';
import "./App.css";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Header />
        <nav className="nav-container">
          <Link className="nav-link" to="/chat" >Chat</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/chat" element={
            <RequireAuth>
              <ChatInterface /> 
            </RequireAuth>
          }/>
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;