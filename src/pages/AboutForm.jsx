import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = "https://backend-qzdy.onrender.com";

const AboutForm = () => {
    const [aboutDatas, setAboutDatas] = useState([]);
    const [newAboutDatas, setNewAboutDatas] = useState({ Heading: '', description: '', format: 'paragraph' });
    const [editingAboutDatas, setEditingAboutDatas] = useState(null);
  
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const aboutDatasResponse = await axios.get(`${backendUrl}/api/aboutDatas`);
        setAboutDatas(aboutDatasResponse.data);
    };

    const handleSubmitAboutDatas = async (e) => {
        e.preventDefault();
        if (editingAboutDatas) {
            await axios.put(`${backendUrl}/api/aboutDatas/${editingAboutDatas._id}`, newAboutDatas);
            setEditingAboutDatas(null);
        } else {
            await axios.post(`${backendUrl}/api/aboutDatas`, newAboutDatas);
        }
        setNewAboutDatas({ Heading: '', description: '', format: 'paragraph' });
        fetchData();
    };

    const handleEditAboutDatas = (aboutDatas) => {
        setEditingAboutDatas(aboutDatas);
        setNewAboutDatas(aboutDatas);
    };

    const handleDeleteAboutDatas = async (id) => {
        await axios.delete(`${backendUrl}/api/aboutDatas/${id}`);
        fetchData();
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl mb-5">Manage About Page</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* About Datas */}
                <div className="p-4 border rounded shadow">
                    <h3 className="text-xl">AboutDatas</h3>
                    <form onSubmit={handleSubmitAboutDatas} className="mt-2">
                        <input
                            type="text"
                            placeholder="Heading"
                            value={newAboutDatas.Heading}
                            onChange={(e) => setNewAboutDatas({ ...newAboutDatas, Heading: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        
                        {/* Format Selection */}
                        <div className="mt-2">
                            <label>
                                <input
                                    type="radio"
                                    value="paragraph"
                                    checked={newAboutDatas.format === 'paragraph'}
                                    onChange={(e) => setNewAboutDatas({ ...newAboutDatas, format: e.target.value })}
                                />
                                Paragraph
                            </label>
                            <label className="ml-4">
                                <input
                                    type="radio"
                                    value="points"
                                    checked={newAboutDatas.format === 'points'}
                                    onChange={(e) => setNewAboutDatas({ ...newAboutDatas, format: e.target.value })}
                                />
                                Points
                            </label>
                        </div>

                        {/* Description Input */}
                        {newAboutDatas.format === 'paragraph' ? (
                            <textarea
                                placeholder="Description"
                                value={newAboutDatas.description}
                                onChange={(e) => setNewAboutDatas({ ...newAboutDatas, description: e.target.value })}
                                required
                                className="border p-2 w-full mt-2"
                            />
                        ) : (
                            <textarea
                                placeholder="Enter points (one per line)"
                                value={newAboutDatas.description}
                                onChange={(e) => setNewAboutDatas({ ...newAboutDatas, description: e.target.value })}
                                required
                                className="border p-2 w-full mt-2"
                            />
                        )}

                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
                            {editingAboutDatas ? 'Update About' : 'Add About'}
                        </button>
                    </form>
                    <ul className="mt-2">
                        {aboutDatas.map(a => (
                            <li key={a._id} className="flex justify-between items-center">
                                {a.Heading} - {a.format === 'points' ? a.description.split('\n').map((point, index) => (
                                    <li key={index}>{point}</li>
                                )) : a.description}
                                <div>
                                    <button onClick={() => handleEditAboutDatas(a)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                                    <button onClick={() => handleDeleteAboutDatas(a._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutForm;
