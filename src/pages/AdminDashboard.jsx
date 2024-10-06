import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleTeamMembersClick = () => {
        navigate("/team-members");
        console.log("Team Members button clicked");
    };

    const handleViewContactDetailsClick = () => {
        navigate("/contacts");
        console.log("View Contact Details button clicked");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="flex space-x-4">
                <button
                    onClick={handleTeamMembersClick}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Team Members
                </button>
                <button
                    onClick={handleViewContactDetailsClick}
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 transition duration-200"
                >
                    View Contact Details
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
