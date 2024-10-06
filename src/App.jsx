import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TeamMembers from './pages/TeamMembers';
import Contacts from './pages/Contacts';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass setIsAuthenticated to the Login component here */}
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protecting these routes */}
        <Route 
          path='/contacts' 
          element={isAuthenticated ? <Contacts /> : <Navigate to="/adminDash" />} 
        />
        <Route 
          path='/team-members' 
          element={isAuthenticated ? <TeamMembers /> : <Navigate to="/adminDash" />} 
        />
        
        <Route 
          path='/adminDash' 
          element={isAuthenticated ? <AdminDashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

