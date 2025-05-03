import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import ChatInterface from './ChatInterface';
import Dashboard from './Dashboard';

function App() {

  return (
    <Router>
      <Header />
      <nav style={{padding: '1rem'}}>
        <Link to="/chat" style={{marginRight: '1rem'}}>Chat</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;