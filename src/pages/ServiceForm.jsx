import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = "https://backend-qzdy.onrender.com";
const ServiceForm = () => {
  const [hero, setHero] = useState(null);
  const [newHero, setNewHero] = useState({ title: "", description: "" });
  const [dataArray, setDataArray] = useState([]);
  const [newDataItem, setNewDataItem] = useState({
    title1: "",
    description1: "",
    innerArray: [],
    benefits: {}
  });
  const [newInnerItem, setNewInnerItem] = useState({ title2: "", description2: "" });
  const [newBenefit, setNewBenefit] = useState({ category: "", items: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchData = async () => {
    try {
      const [heroResponse, dataArrayResponse] = await Promise.all([
        axios.get(`${backendUrl}/api/serviceHero`),
        axios.get(`${backendUrl}/api/dataArray`)
      ]);
      setHero(heroResponse.data);
      setDataArray(dataArrayResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitHero = async (e) => {
    e.preventDefault();
    try {
      if (hero) {
        await axios.put(`${backendUrl}/api/serviceHero`, newHero);
      } else {
        await axios.post(`${backendUrl}/api/serviceHero`, newHero);
      }
      setNewHero({ title: "", description: "" });
      fetchData();
    } catch (error) {
      console.error("Error submitting hero:", error);
    }
  };

  const handleDeleteHero = async () => {
    try {
      await axios.delete(`${backendUrl}/api/serviceHero`);
      setHero(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting hero:", error);
    }
  };

  const handleDataChange = (e) => {
    setNewDataItem({ ...newDataItem, [e.target.name]: e.target.value });
  };

  const handleInnerChange = (e) => {
    setNewInnerItem({ ...newInnerItem, [e.target.name]: e.target.value });
  };

  const addInnerItem = (e) => {
    e.preventDefault();
    if (newInnerItem.title2 && newInnerItem.description2) {
      setNewDataItem((prev) => ({
        ...prev,
        innerArray: [...prev.innerArray, newInnerItem],
      }));
      setNewInnerItem({ title2: "", description2: "" });
    } else {
      alert("Both title and description are required for inner items.");
    }
  };

  const handleSubmitDataArray = async (e) => {
    e.preventDefault();
    try {
      const method = editingIndex !== null ? 'put' : 'post';
      const url = editingIndex !== null 
        ? `${backendUrl}/api/dataArray/${dataArray[editingIndex]._id}` 
        : `${backendUrl}/api/dataArray`;
      
      const response = await axios[method](url, newDataItem);
      
      if (editingIndex !== null) {
        setDataArray((prev) => {
          const updatedArray = [...prev];
          updatedArray[editingIndex] = response.data;
          return updatedArray;
        });
      } else {
        setDataArray((prev) => [...prev, response.data]);
      }
      resetDataItem();
      window.location.reload();
    } catch (error) {
      console.error("Error adding or updating data item:", error);
    }
  };

  const resetDataItem = () => {
    setNewDataItem({ title1: "", description1: "", innerArray: [], benefits: {} });
    setEditingIndex(null);
    setNewInnerItem({ title2: "", description2: "" });
    setNewBenefit({ category: "", items: "" });
  };

  const deleteDataItem = async (index) => {
    try {
      await axios.delete(`${backendUrl}/api/dataArray/${dataArray[index]._id}`);
      setDataArray((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting data item:", error);
    }
  };

  const deleteInnerItem = (innerIndex) => {
    setNewDataItem((prev) => {
      const updatedInnerArray = prev.innerArray.filter((_, i) => i !== innerIndex);
      return { ...prev, innerArray: updatedInnerArray };
    });
  };

  const editDataItem = (index) => {
    const itemToEdit = dataArray[index];
    setNewDataItem(itemToEdit);
    setEditingIndex(index);
  };

  const editInnerItem = (innerIndex) => {
    const innerItemToEdit = newDataItem.innerArray[innerIndex];
    setNewInnerItem(innerItemToEdit);
    deleteInnerItem(innerIndex);
  };

  const handleBenefitChange = (e) => {
    const { name, value } = e.target;
    setNewBenefit((prev) => ({ ...prev, [name]: value }));
  };

  const addBenefit = (e) => {
    e.preventDefault();
    if (newBenefit.category && newBenefit.items) {
      setNewDataItem((prev) => ({
        ...prev,
        benefits: {
          ...prev.benefits,
          [newBenefit.category]: [
            ...(prev.benefits[newBenefit.category] || []),
            newBenefit.items
          ]
        }
      }));
      setNewBenefit({ category: "", items: "" });
    } else {
      alert("Both category and item are required for benefits.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Service Form</h2>

      {/* Hero Section */}
      <div className="p-4 border rounded shadow mb-5">
        <h3 className="text-xl">Service Hero</h3>
        <form onSubmit={handleSubmitHero} className="mt-2">
          <input
            type="text"
            placeholder="Hero Title"
            value={newHero.title}
            onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Hero Description"
            value={newHero.description}
            onChange={(e) => setNewHero({ ...newHero, description: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            {hero ? "Update Hero" : "Add Hero"}
          </button>
          {hero && (
            <div className="mt-2">
              <h4 className="font-semibold">{hero.title}</h4>
              <p>{hero.description}</p>
              <button
                onClick={handleDeleteHero}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2"
              >
                Delete Hero
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Data Item Section */}
      <div className="p-4 border rounded shadow mb-5">
        <h3 className="text-xl">Manage Data Items</h3>
        <form onSubmit={handleSubmitDataArray} className="mt-2">
          <input
            type="text"
            name="title1"
            placeholder="ArrayData Title"
            value={newDataItem.title1}
            onChange={handleDataChange}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="description1"
            placeholder="ArrayData Description"
            value={newDataItem.description1}
            onChange={handleDataChange}
            required
            className="border p-2 w-full mt-2"
          />

          <h4 className="mt-4">Add Inner Items</h4>
          <input
            type="text"
            name="title2"
            placeholder="Inner Title"
            value={newInnerItem.title2}
            onChange={handleInnerChange}
            className="border p-2 w-full mt-2"
          />
          <textarea
            name="description2"
            placeholder="Description enter points (one per line)"
            value={newInnerItem.description2}
            onChange={handleInnerChange}
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={addInnerItem}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Inner Item
          </button>

          <div className="mt-4">
            <h5 className="font-semibold">Inner Items:</h5>
            {Array.isArray(newDataItem.innerArray) && newDataItem.innerArray.length > 0 ? (
              newDataItem.innerArray.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-1">
                  <div>
                    <strong>{item.title2}</strong>: {item.description2}
                  </div>
                  <div>
                    <button
                      onClick={() => editInnerItem(index)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInnerItem(index)}
                      className="text-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No inner items available.</p>
            )}
          </div>

          <h4 className="mt-4">Add Benefits</h4>
          <input
            type="text"
            name="category"
            placeholder="Benefit Category"
            value={newBenefit.category}
            onChange={handleBenefitChange}
            className="border p-2 w-full mt-2"
          />
          <textarea
            name="items"
            placeholder="Benefit Item (one per line)"
            value={newBenefit.items}
            onChange={handleBenefitChange}
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={addBenefit}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Benefit
          </button>

          <div className="mt-4">
            <h5 className="font-semibold">Benefits:</h5>
            {Object.entries(newDataItem.benefits).length > 0 ? (
              Object.entries(newDataItem.benefits).map(([category, items]) => (
                <div key={category}>
                  <strong>{category}:</strong> {items.join(", ")}
                </div>
              ))
            ) : (
              <p>No benefits added.</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            {editingIndex !== null ? "Update Data Item" : "Add Data Item"}
          </button>
        </form>
      </div>
      
      {/* Existing Data Items */}
      <div className="mt-5">
        <h3 className="text-xl">Existing Data Items</h3>
        {dataArray.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow mb-2">
            <h4 className="font-semibold">{item.title1}</h4>
            <p>{item.description1}</p>
            <div className="mt-2">
              <h5 className="font-semibold">Inner Items:</h5>
              {Array.isArray(item.innerArray) && item.innerArray.length > 0 ? (
                item.innerArray.map((innerItem, innerIndex) => (
                  <div key={innerIndex} className="flex justify-between border-b py-1">
                    <div>
                      <strong>{innerItem.title2}</strong>: {innerItem.description2}
                    </div>
                  </div>
                ))
              ) : (
                <p>No inner items available.</p>
              )}
            </div>
            <div className="mt-2">
              <h5 className="font-semibold">Benefits:</h5>
              {Object.entries(item.benefits).length > 0 ? (
                Object.entries(item.benefits).map(([category, items]) => (
                  <div key={category}>
                    <strong>{category}:</strong> {items.join(", ")}
                  </div>
                ))
              ) : (
                <p>No benefits added.</p>
              )}
            </div>
            <button
              onClick={() => deleteDataItem(index)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2"
            >
              Delete Data Item
            </button>
            <button
              onClick={() => editDataItem(index)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mt-2 ml-2"
            >
              Edit Data Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceForm;
