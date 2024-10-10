import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = "https://backend-qzdy.onrender.com";

const AuditForm = () => {
  const [auditHeroData, setAuditHeroData] = useState(null);
  const [auditBanners, setAuditBanners] = useState([]);
  const [auditDatas, setAuditDatas] = useState([]);
  const [auditSubHeading, setAuditSubHeading] = useState(null);

  const [newAuditDatas, setNewAuditDatas] = useState({
    Heading: "",
    description: "",
    format: "paragraph",
  });
  const [newAuditBanner, setNewAuditBanner] = useState("");
  const [newAuditHero, setNewAuditHero] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [newAuditSubHeading, setNewAuditSubHeading] = useState({
    title: '',
  });

  const [editingAuditDatas, setEditingAuditDatas] = useState(null);

  const [auditBannerImage, setAuditBannerImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [auditBannersData, auditHeroDataResponse, auditDatasResponse, auditSubHeadingResponse] =
      await Promise.all([
        axios.get(`${backendUrl}/api/auditBanner`),
        axios.get(`${backendUrl}/api/auditHero`),
        axios.get(`${backendUrl}/api/auditDatas`),
        axios.get(`${backendUrl}/api/auditSubHeading`),
      ]);

    setAuditBanners(auditBannersData.data);
    setAuditHeroData(auditHeroDataResponse.data);
    setAuditDatas(auditDatasResponse.data);
    setAuditSubHeading(auditSubHeadingResponse.data);
  };

  const handleSubmitBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (auditBannerImage) {
      formData.append("image", auditBannerImage); // Append the image file
    }

    await axios.post(`${backendUrl}/api/auditBanner`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setAuditBannerImage(null); // Reset the image input
    setNewAuditBanner(""); // Reset the URL input if needed
    fetchData();
  };

  const handleSubmitAuditHero = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newAuditHero.image) {
      formData.append("image", newAuditHero.image);
    }
    formData.append("title", newAuditHero.title);
    formData.append("description", newAuditHero.description);

    if (auditHeroData) {
      await axios.put(`${backendUrl}/api/auditHero`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(`${backendUrl}/api/auditHero`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setNewAuditHero({ title: "", description: "", image: "" }); // Resetting form fields
    fetchData(); // Refresh the data
  };

  const handleSubmitAuditSubHeading = async (e) => {
    e.preventDefault();
    if (auditSubHeading) {
      await axios.put(`${backendUrl}/api/auditSubHeading`, newAuditSubHeading);
    } else {
      await axios.post(`${backendUrl}/api/auditSubHeading`, newAuditSubHeading);
    }
    setNewAuditSubHeading({ title: '',}); // Resetting form fields
    fetchData(); // Refresh the data
  };

  const handleDeleteAuditSubHeading = async () => {
    await axios.delete(`${backendUrl}/api/auditSubHeading`);
    setAuditSubHeading(null);
    fetchData();
  };
  
  const handleDeleteBanner = async (id) => {
    await axios.delete(`${backendUrl}/api/auditBanner/${id}`);
    fetchData();
  };

  const handleDeleteAuditHero = async () => {
    await axios.delete(`${backendUrl}/api/auditHero`);
    setAuditHeroData(null);
    fetchData();
  };

  const handleSubmitAuditDatas = async (e) => {
    e.preventDefault();
    if (editingAuditDatas) {
      await axios.put(
        `${backendUrl}/api/auditDatas/${editingAuditDatas._id}`,
        newAuditDatas
      );
      setEditingAuditDatas(null);
    } else {
      await axios.post(`${backendUrl}/api/auditDatas`, newAuditDatas);
    }
    setNewAuditDatas({ Heading: "", description: "", format: "paragraph" });
    fetchData();
  };

  const handleEditAuditDatas = (auditDatas) => {
    setEditingAuditDatas(auditDatas);
    setNewAuditDatas(auditDatas);
  };

  const handleDeleteAuditDatas = async (id) => {
    await axios.delete(`${backendUrl}/api/auditDatas/${id}`);
    fetchData();
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Manage Audit Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner */}
        {/* Banner */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">Banner</h3>
          <form onSubmit={handleSubmitBanner} className="mt-2">
            <input
              type="file"
              onChange={(e) => setAuditBannerImage(e.target.files[0])} // Set the image file
              accept="image/*"
              required
              className="border p-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              Add Banner
            </button>
          </form>
          <div className="mt-2">
            {auditBanners.map((b) => (
              <div
                key={b._id}
                className="flex justify-between items-center mb-2"
              >
                <img
                  src={`${backendUrl}/${b.image}`}
                  alt="Banner"
                  className="w-24 h-24 rounded object-cover"
                />
                <button
                  onClick={() => handleDeleteBanner(b._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AuditHero */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">AuditHero</h3>
          <form onSubmit={handleSubmitAuditHero} className="mt-2">
            <input
              type="text"
              placeholder="Title"
              value={newAuditHero.title}
              onChange={(e) =>
                setNewAuditHero({ ...newAuditHero, title: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={newAuditHero.description}
              onChange={(e) =>
                setNewAuditHero({ ...newAuditHero, description: e.target.value })
              }
              required
              className="border p-2 w-full mt-2"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewAuditHero({ ...newAuditHero, image: e.target.files[0] })
              }
              accept="image/*"
              required={!auditHeroData} // Make this required only if auditHero data doesn't exist
              className="border p-2 w-full mt-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              {auditHeroData ? "Update AuditHero" : "Add AuditHero"}
            </button>
            {auditHeroData && (
              <button
                onClick={handleDeleteAuditHero}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
              >
                Delete AuditHero
              </button>
            )}
          </form>
          {auditHeroData && (
            <div className="mt-2">
              <h4 className="font-semibold">{auditHeroData.title}</h4>
              <p>{auditHeroData.description}</p>
              <img
                src={`${backendUrl}/${auditHeroData.image}`} // Ensure you display the current image
                alt={auditHeroData.title}
                className="w-32 h-32 rounded mt-2"
              />
              <button
                onClick={() =>
                  setNewAuditHero({
                    title: auditHeroData.title,
                    description: auditHeroData.description,
                    image: "", // Clear image for editing
                  })
                }
                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
              >
                Edit AuditHero
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border rounded shadow">
  <h3 className="text-xl">SubHeading</h3>
  <form onSubmit={handleSubmitAuditSubHeading} className="mt-2">
    <input
      type="text"
      placeholder="Title"
      value={newAuditSubHeading.title}
      onChange={(e) => setNewAuditSubHeading({ ...newAuditSubHeading, title: e.target.value })}
      required
      className="border p-2 w-full"
    />
    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
      {auditSubHeading ? 'Update Sub Heading' : 'Add Sub Heading'}
    </button>
    {auditSubHeading && (
      <button onClick={handleDeleteAuditSubHeading} className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2">
        Delete Sub Heading
      </button>
    )}
  </form>
  {auditSubHeading && (
    <div className="mt-2">
      <h4 className="font-semibold">{auditSubHeading.title}</h4>
      <button 
        onClick={() => setNewAuditSubHeading({ title: auditSubHeading.title,})} 
        className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
        Edit Sub Heading
      </button>
    </div>
  )}
</div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">AuditDatas</h3>
          <form onSubmit={handleSubmitAuditDatas} className="mt-2">
            <input
              type="text"
              placeholder="Heading"
              value={newAuditDatas.Heading}
              onChange={(e) =>
                setNewAuditDatas({ ...newAuditDatas, Heading: e.target.value })
              }
              required
              className="border p-2 w-full"
            />

            {/* Format Selection */}
            <div className="mt-2">
              <label>
                <input
                  type="radio"
                  value="paragraph"
                  checked={newAuditDatas.format === "paragraph"}
                  onChange={(e) =>
                    setNewAuditDatas({
                      ...newAuditDatas,
                      format: e.target.value,
                    })
                  }
                />
                Paragraph
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  value="points"
                  checked={newAuditDatas.format === "points"}
                  onChange={(e) =>
                    setNewAuditDatas({
                      ...newAuditDatas,
                      format: e.target.value,
                    })
                  }
                />
                Points
              </label>
            </div>

            {/* Description Input */}
            {newAuditDatas.format === "paragraph" ? (
              <textarea
                placeholder="Description"
                value={newAuditDatas.description}
                onChange={(e) =>
                  setNewAuditDatas({
                    ...newAuditDatas,
                    description: e.target.value,
                  })
                }
                required
                className="border p-2 w-full mt-2"
              />
            ) : (
              <textarea
                placeholder="Enter points (one per line)"
                value={newAuditDatas.description}
                onChange={(e) =>
                  setNewAuditDatas({
                    ...newAuditDatas,
                    description: e.target.value,
                  })
                }
                required
                className="border p-2 w-full mt-2"
              />
            )}

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              {editingAuditDatas ? "Update Audit" : "Add Audit"}
            </button>
          </form>
          <ul className="mt-2">
            {auditDatas.map((a) => (
              <li key={a._id} className="flex justify-between items-center">
                {a.Heading} -{" "}
                {a.format === "points"
                  ? a.description
                      .split("\n")
                      .map((point, index) => <li key={index}>{point}</li>)
                  : a.description}
                <div>
                  <button
                    onClick={() => handleEditAuditDatas(a)}
                    className="bg-blue-500 text-white py-1 px-2 rounded ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAuditDatas(a._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
