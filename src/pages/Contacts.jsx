import { message } from "antd";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
const backendUrl = "https://backend-qzdy.onrender.com";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(`${backendUrl}/api/contacts`);

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        message.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/contacts/${contactId}`);
      if (response.status === 200) {
        // Update the contacts state by filtering out the deleted contact
        setContacts(contacts.filter(contact => contact._id !== contactId));
        message.success("Contact deleted successfully");
      } else {
        message.error("Failed to delete contact");
      }
    } catch (error) {
      message.error("Error deleting contact");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Contacts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white border rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <div className="flex justify-between items-center w-full mb-2">
              <h3 className="text-xl font-semibold text-blue-600">
                {contact.fullName}
              </h3>
              <button
                onClick={() => handleDelete(contact._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">
              <strong>Email:</strong> {contact.email}
            </p>
            <p className="text-gray-700">
              <strong>Institution:</strong> {contact.institutionName}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p className="text-gray-700">
              <strong>Service:</strong> {contact.service}
            </p>
            <p className="text-gray-700">
              <strong>Message:</strong> {contact.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
