import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa"; // Import social media icons
import logo from "../assets/img1.png";

const Layout = ({ children, setIsAuthenticated }) => {
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-500 p-2 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 bg-white rounded-full shadow-md overflow-hidden flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          </div>
          <span className="text-lg font-extrabold text-white bg-clip-text text-transparent bg-white tracking-wider drop-shadow-md">
            Company Name
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          <Link
            to="/team-members"
            className={`px-2 py-1 ${getActiveClass("/team-members")}`}
          >
            Manage Team Members
          </Link>
          <Link
            to="/contacts"
            className={`px-2 py-1 ${getActiveClass("/contacts")}`}
          >
            View Contacts
          </Link>
          <button
            onClick={handleLogout}
            className={`px-2 py-1 ${getActiveClass("")}`}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-grow w-full h-full overflow-auto mt-20">
        {children} {/* This renders the children routes */}
      </div>
      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Name */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="SM-Ed-Consultant"
                className="h-16 w-16 object-contain"
              />
              <span className="text-xl font-bold">
                SM Educational Consultant
              </span>
            </div>
            <p className="text-gray-400">Empowering Education with Expertise</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <Link to="/team-members" className="hover:text-gray-300">
              Manage Team Members
            </Link>
            <Link to="/contacts" className="hover:text-gray-300">
              View Contacts
            </Link>
          </div>

          {/* Social Media & Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-lg font-semibold">Connect with Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaTwitter size={24} />
              </a>
            </div>
            <p className="mt-4">1234 Education Lane, Knowledge City, USA</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@sm-educational.com"
                className="hover:text-gray-300"
              >
                info@sm-educational.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-gray-300">
                +1 234 567 890
              </a>
            </p>
          </div>
        </div>
        {/* Copyright Info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SM Educational Consultant. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
