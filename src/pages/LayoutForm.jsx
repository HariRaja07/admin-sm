import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = "https://backend-qzdy.onrender.com";

const LayoutForm = () => {
  const [logo, setLogo] = useState(null);
  

  
  const [newLogo, setNewLogo] = useState({
    image: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const logoResponse= await axios.get(`${backendUrl}/api/logo`);

    setLogo(logoResponse.data);
  };

  

  const handleSubmitLogo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newLogo.image) {
      formData.append("image", newLogo.image);
    }

    if (logo) {
      await axios.put(`${backendUrl}/api/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(`${backendUrl}/api/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setNewLogo({ image: "" }); // Resetting form fields
    fetchData(); // Refresh the data
  };

  const handleDeleteLogo = async () => {
    await axios.delete(`${backendUrl}/api/logo`);
    setLogo(null);
    fetchData();
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Manage Layout Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Logo */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">Logo</h3>
          <form onSubmit={handleSubmitLogo} className="mt-2">
            <input
              type="file"
              onChange={(e) =>
                setNewLogo({ ...newLogo, image: e.target.files[0] })
              }
              accept="image/*"
              required={!logo} // Make this required only if Logo data doesn't exist
              className="border p-2 w-full mt-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              {logo ? "Update Logo" : "Add Logo"}
            </button>
            {logo && (
              <button
                onClick={handleDeleteLogo}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
              >
                Delete Logo
              </button>
            )}
          </form>
          {logo && (
            <div className="mt-2">
              <img
                src={`${backendUrl}/${logo.image}`} // Ensure you display the current image
                alt="image"
                className="w-32 h-32 rounded mt-2"
              />
              <button
                onClick={() =>
                  setNewLogo({
                    image: "", // Clear image for editing
                  })
                }
                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
              >
                Edit Logo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutForm;
