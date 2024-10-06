import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import TeamMembers from "./pages/TeamMembers";
import Contacts from "./pages/Contacts";
import Layout from "./components/Layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Wrap protected routes with Layout and pass setIsAuthenticated */}
        <Route
          element={
            isAuthenticated ? (
              <Layout setIsAuthenticated={setIsAuthenticated}>
                <Outlet />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/team-members" element={<TeamMembers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
