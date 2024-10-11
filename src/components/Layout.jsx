import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa"; // Import social media icons
const backendUrl = "https://backend-qzdy.onrender.com";
import axios from "axios";


const Layout = ({ children, setIsAuthenticated }) => {
  const [logo, setLogo] = useState({
    image: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login page
  };

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "text-gray-300 border-b-2 border-white"
      : "hover:text-gray-300";
  };

  useEffect(() => {
    const fetchData = async () => {
      const logoResponse = await axios.get(
        `${backendUrl}/api/logo`
      );

      setLogo(logoResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 bg-white rounded-full shadow-md overflow-hidden flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <img src={`${backendUrl}/${logo.image}`} alt="Logo" className="h-16 w-16 object-contain" />
          </div>
          <span className="text-lg font-extrabold text-white tracking-wider">
            <span className="text-white text-2xl font-black tracking-wide">SM</span> Educational Consultant
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-white font-medium">
          <button onClick={handleLogout} className={`px-2 py-1 ${getActiveClass("")}`}>
            Logout
          </button>
        </nav>
      </header>

      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white shadow-lg fixed top-40 left-0 overflow-auto">
          <nav className="flex flex-col p-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <Link to="/team-members" className={`mb-2 ${getActiveClass("/team-members")}`}>
              Manage Team Members
            </Link>
            <Link to="/contacts" className={`mb-2 ${getActiveClass("/contacts")}`}>
              Manage Contacts
            </Link>
            <Link to="/homepage" className={`mb-2 ${getActiveClass("/homepage")}`}>
              Manage Home Page
            </Link>
            <Link to="/auditpage" className={`mb-2 ${getActiveClass("/auditpage")}`}>
              Manage Audit Page
            </Link>
            <Link to="/aboutpage" className={`mb-2 ${getActiveClass("/aboutpage")}`}>
              Manage About Page
            </Link>
            <Link to="/layoutpage" className={`mb-2 ${getActiveClass("/layoutpage")}`}>
              Manage Layout Page
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow ml-64 p-4">
          {children} {/* This renders the children routes */}
        </main>
      </div>

      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8 w-full mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Name */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="SM-Ed-Consultant" className="h-16 w-16 object-contain" />
              <span className="text-xl font-bold">SM Educational Consultant</span>
            </div>
            <p className="text-gray-400">Empowering Education with Expertise</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <Link to="/team-members" className="hover:text-gray-300">Manage Team Members</Link>
            <Link to="/contacts" className="hover:text-gray-300">View Contacts</Link>
          </div>

          {/* Social Media & Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-lg font-semibold">Connect with Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaFacebookF size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
            </div>
            <p className="mt-4">1234 Education Lane, Knowledge City, USA</p>
            <p>Email: <a href="mailto:info@sm-educational.com" className="hover:text-gray-300">info@sm-educational.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a></p>
          </div>
        </div>
        {/* Copyright Info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SM Educational Consultant. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
