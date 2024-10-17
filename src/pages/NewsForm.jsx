import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = "https://backend-qzdy.onrender.com";

const NewsForm = () => {
    const [news, setNews] = useState([]);
    const [newNews, setNewNews] = useState({ Heading: '', description: '', format: 'paragraph' });
    const [editingNews, setEditingNews] = useState(null);
  
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const newsResponse = await axios.get(`${backendUrl}/api/news`);
        setNews(newsResponse.data);
    };

    const handleSubmitNews = async (e) => {
        e.preventDefault();
        if (editingNews) {
            await axios.put(`${backendUrl}/api/news/${editingNews._id}`, newNews);
            setEditingNews(null);
        } else {
            await axios.post(`${backendUrl}/api/news`, newNews);
        }
        setNewNews({ Heading: '', description: '', format: 'paragraph' });
        fetchData();
    };

    const handleEditNews = (news) => {
        setEditingNews(news);
        setNewNews(news);
    };

    const handleDeleteNews = async (id) => {
        await axios.delete(`${backendUrl}/api/news/${id}`);
        fetchData();
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl mb-5">Manage News Page</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* News Datas */}
                <div className="p-4 border rounded shadow">
                    <h3 className="text-xl">News</h3>
                    <form onSubmit={handleSubmitNews} className="mt-2">
                        <input
                            type="text"
                            placeholder="Heading"
                            value={newNews.Heading}
                            onChange={(e) => setNewNews({ ...newNews, Heading: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        
                        {/* Format Selection */}
                        <div className="mt-2">
                            <label>
                                <input
                                    type="radio"
                                    value="paragraph"
                                    checked={newNews.format === 'paragraph'}
                                    onChange={(e) => setNewNews({ ...newNews, format: e.target.value })}
                                />
                                Paragraph
                            </label>
                            <label className="ml-4">
                                <input
                                    type="radio"
                                    value="points"
                                    checked={newNews.format === 'points'}
                                    onChange={(e) => setNewNews({ ...newNews, format: e.target.value })}
                                />
                                Points
                            </label>
                        </div>

                        {/* Description Input */}
                        {newNews.format === 'paragraph' ? (
                            <textarea
                                placeholder="Description"
                                value={newNews.description}
                                onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                                required
                                className="border p-2 w-full mt-2"
                            />
                        ) : (
                            <textarea
                                placeholder="Enter points (one per line)"
                                value={newNews.description}
                                onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                                required
                                className="border p-2 w-full mt-2"
                            />
                        )}

                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
                            {editingNews ? 'Update News' : 'Add News'}
                        </button>
                    </form>
                    <ul className="mt-2">
                        {news.map(a => (
                            <li key={a._id} className="flex justify-between items-center">
                                {a.Heading} - {a.format === 'points' ? a.description.split('\n').map((point, index) => (
                                    <li key={index}>{point}</li>
                                )) : a.description}
                                <div>
                                    <button onClick={() => handleEditNews(a)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                                    <button onClick={() => handleDeleteNews(a._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsForm;
