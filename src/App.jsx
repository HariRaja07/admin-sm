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
import HomePage from "./pages/HomePage";
import AuditForm from "./pages/AuditForm";
import AboutForm from "./pages/AboutForm";
import LayoutForm from "./pages/LayoutForm";
import NewsForm from "./pages/NewsForm";
import ServiceForm from "./pages/ServiceForm";

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
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/auditpage" element={<AuditForm/>}/>
          <Route path="/aboutpage" element={<AboutForm/>}/>
          <Route path="/layoutpage" element={<LayoutForm/>}/>
          <Route path="/newspage" element={<NewsForm/>}/>
          <Route path="/servicepage" element={<ServiceForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
