import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img5.png"; // Import your logo/image
import backgroundImage from "../assets/img6.jpg"; // Import your background image

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin1" && password === "1234567") {
      setIsAuthenticated(true);
      message.success("Login successful!");
      navigate("/team-members");
    } else {
      message.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set the background image
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Login Icon" className="w-24 h-24" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-none rounded-full p-3 mb-4 w-full text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-none rounded-full p-3 mb-6 w-full text-gray-800"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white rounded-full py-3 w-full hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
