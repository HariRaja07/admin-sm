import React, { useEffect, useState } from "react";
import { message, Button, Modal } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPhone, FaEnvelope, FaHome, FaGlobe } from "react-icons/fa";
import logo from '../assets/mi.jpg';
const backendUrl = 'https://backend-qzdy.onrender.com';

const TeamMembers = () => {
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        id: "",
        name: "",
        salutation: "",
        designation: "",
        degrees: "",
        mobile: "",
        email: "",
        address: "",
        website: "",
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const response = await fetch(`${backendUrl}/api/team-members`);
        if (response.ok) {
            const data = await response.json();
            setMembers(data);
        } else {
            message.error('Failed to fetch team members');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/api/team-members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            message.success('Team member added successfully');
            resetForm();
            fetchMembers();
            setIsModalVisible(false);
        } else {
            message.error('Failed to add team member');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log("Editing member with data: ", form); // Log the form data
    
        const response = await fetch(`${backendUrl}/api/team-members/${form.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
    
        if (response.ok) {
            message.success('Team member updated successfully');
            resetForm();
            fetchMembers();
            setIsModalVisible(false);
        } else {
            const errorData = await response.json();
            message.error(`Failed to update team member: ${errorData}`);
        }
    };
    

    const resetForm = () => {
        setForm({
            id: "",
            name: "",
            salutation: "",
            designation: "",
            degrees: "",
            mobile: "",
            email: "",
            address: "",
            website: "",
        });
    };

    const handleDelete = async (id) => {
        const response = await fetch(`${backendUrl}/api/team-members/${id}`, { method: 'DELETE' });
        if (response.ok) {
            message.success('Team member deleted successfully');
            fetchMembers();
        } else {
            message.error('Failed to delete team member');
        }
    };

    const handleEdit = (member) => {
        setForm({
            id: member._id, // Explicitly set the ID
            name: member.name,
            salutation: member.salutation,
            designation: member.designation,
            degrees: member.degrees,
            mobile: member.mobile,
            email: member.email,
            address: member.address,
            website: member.website,
        });
        setIsModalVisible(true);
    };
    

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Team Members</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => { resetForm(); setIsModalVisible(true); }} className="flex items-center text-green-600">
                    <IoIosAddCircle className="text-2xl mr-2" />
                    Add Team Member
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map(member => (
                    <div key={member._id} className="shadow-xl border border-blue-200 bg-blue-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                        <div className="relative">
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button onClick={() => handleEdit(member)} className="text-blue-500">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(member._id)} className="text-red-500">
                                    <MdDelete />
                                </button>
                            </div>
                            <div className="flex flex-col items-center p-4">
                                <img 
                                    alt={member.name} 
                                    src={logo} 
                                    className="w-24 h-24 object-cover rounded-full border-0 border-white shadow-md mb-4"
                                />
                                <h2 className="text-xl font-bold text-black">{`${member.salutation} ${member.name}`}</h2>
                                <p className="text-black font-semibold">{member.designation}</p>
                                <p className="text-black">{member.degrees}</p>
                            </div>
                            <div className="p-4">
                                <div className="mt-2 space-y-1">
                                    <p className="flex items-center text-gray-800">
                                        <FaPhone className="mr-2 text-blue-600" />
                                        <a href={`tel:${member.mobile}`} className="hover:text-blue-700 transition-colors">{member.mobile}</a>
                                    </p>
                                    <p className="flex items-center text-gray-800">
                                        <FaEnvelope className="mr-2 text-blue-600" />
                                        <a href={`mailto:${member.email}`} className="hover:text-blue-700 transition-colors">{member.email}</a>
                                    </p>
                                    <p className="flex items-center text-gray-800">
                                        <FaHome className="mr-2 text-blue-600" />
                                        {member.address}
                                    </p>
                                    <p className="flex items-center text-gray-800">
                                        <FaGlobe className="mr-2 text-blue-600" />
                                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">{member.website}</a>
                                    </p>
                                </div>
                                <Button className="mt-4 w-full" type="primary" style={{ backgroundColor: '#1DA57A', borderColor: '#1DA57A' }}>
                                    Contact {member.name}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title={form.id ? "Edit Team Member" : "Add Team Member"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <form onSubmit={form.id ? handleEditSubmit : handleAddSubmit}>
                    <input type="hidden" name="id" value={form.id} />
                    {Object.keys(form).map((key) => (
                        key !== "id" && ( // Exclude ID from the form
                            <div key={key} className="mb-4">
                                <label className="block text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                        )
                    ))}
                    
                    <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">Save</button>
                </form>
            </Modal>
        </div>
    );
};

export default TeamMembers;
