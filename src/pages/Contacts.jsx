import { message } from 'antd';
import React, { useEffect, useState } from 'react';
const backendUrl = 'https://backend-qzdy.onrender.com';
const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(`${backendUrl}/api/contacts`);

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        message.error('Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contacts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contacts.map(contact => (
          <div key={contact._id} className="bg-white border rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{contact.fullName}</h3>
            <p className="text-gray-700"><strong>Email:</strong> {contact.email}</p>
            <p className="text-gray-700"><strong>Institution:</strong> {contact.institutionName}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
            <p className="text-gray-700"><strong>Service:</strong> {contact.service}</p>
            <p className="text-gray-700"><strong>Message:</strong> {contact.message}</p>
            {contact.file && (
              <a 
                href={`http://localhost:5000/uploads/${contact.file}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                Download File
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
