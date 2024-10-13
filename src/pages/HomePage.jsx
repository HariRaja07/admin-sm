import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = "https://backend-qzdy.onrender.com";
const HomePage = () => {
  const [solutions, setSolutions] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [banners, setBanners] = useState([]);
  
  const [newBanner, setNewBanner] = useState('');
  const [newHero, setNewHero] = useState({ title: '', description: '' });
  const [newSolution, setNewSolution] = useState({ title: '', description: '', image: '' });
  const [newService, setNewService] = useState({ name: '' });
  const [newTestimonial, setNewTestimonial] = useState({ text: '', author: '', designation: '' });

  const [editingSolution, setEditingSolution] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [solutionImage, setSolutionImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [bannersData, solutionsData, servicesData, testimonialsData, heroDataResponse] = await Promise.all([
      axios.get(`${backendUrl}/api/banner`),
      axios.get(`${backendUrl}/api/solutions`),
      axios.get(`${backendUrl}/api/services`),
      axios.get(`${backendUrl}/api/testimonials`),
      axios.get(`${backendUrl}/api/hero`),
    ]);

    setBanners(bannersData.data);
    setSolutions(solutionsData.data);
    setServices(servicesData.data);
    setTestimonials(testimonialsData.data);
    setHeroData(heroDataResponse.data);
  };

  const handleSubmitBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (bannerImage) {
      formData.append('image', bannerImage); // Append the image file
    }
  
    await axios.post(`${backendUrl}/api/banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    setBannerImage(null); // Reset the image input
    setNewBanner(''); // Reset the URL input if needed
    fetchData();
  };
  

  const handleSubmitHero = async (e) => {
    e.preventDefault();
    if (heroData) {
      await axios.put(`${backendUrl}/api/hero`, newHero);
    } else {
      await axios.post(`${backendUrl}/api/hero`, newHero);
    }
    setNewHero({ title: '', description: '' }); // Resetting form fields
    fetchData(); // Refresh the data
  };
  

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newSolution.title);
    formData.append('description', newSolution.description);
    if (solutionImage) {
        formData.append('image', solutionImage); // Append the image file
    }

    if (editingSolution) {
        await axios.put(`${backendUrl}/api/solutions/${editingSolution._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setEditingSolution(null);
    } else {
        await axios.post(`${backendUrl}/api/solutions`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    setNewSolution({ title: '', description: '', image: '' });
    setSolutionImage(null); // Reset the image input
    fetchData();
};


  const handleEditSolution = (solution) => {
    setEditingSolution(solution);
    setNewSolution(solution);
  };

  const handleDeleteSolution = async (id) => {
    await axios.delete(`${backendUrl}/api/solutions/${id}`);
    fetchData();
  };

  const handleSubmitService = async (e) => {
    e.preventDefault();
    if (editingService) {
      await axios.put(`${backendUrl}/api/services/${editingService._id}`, newService);
      setEditingService(null);
    } else {
      await axios.post(`${backendUrl}/api/services`, newService);
    }
    setNewService({ name: '' });
    fetchData();
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  const handleDeleteService = async (id) => {
    await axios.delete(`${backendUrl}/api/services/${id}`);
    fetchData();
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    if (editingTestimonial) {
      await axios.put(`${backendUrl}/api/testimonials/${editingTestimonial._id}`, newTestimonial);
      setEditingTestimonial(null);
    } else {
      await axios.post(`${backendUrl}/api/testimonials`, newTestimonial);
    }
    setNewTestimonial({ text: '', author: '', designation: '' });
    fetchData();
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setNewTestimonial(testimonial);
  };

  const handleDeleteTestimonial = async (id) => {
    await axios.delete(`${backendUrl}/api/testimonials/${id}`);
    fetchData();
  };

  const handleDeleteBanner = async (id) => {
    await axios.delete(`${backendUrl}/api/banner/${id}`);
    fetchData();
  };

  const handleDeleteHero = async () => {
    await axios.delete(`${backendUrl}/api/hero`);
    setHeroData(null);
    fetchData();
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Manage Home Page</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner */}
        {/* Banner */}
<div className="p-4 border rounded shadow">
  <h3 className="text-xl">Banner</h3>
  <form onSubmit={handleSubmitBanner} className="mt-2">
    <input
      type="file"
      onChange={(e) => setBannerImage(e.target.files[0])} // Set the image file
      accept="image/*"
      required
      className="border p-2 w-full"
    />
    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">Add Banner</button>
  </form>
  <div className="mt-2">
    {banners.map(b => (
      <div key={b._id} className="flex justify-between items-center mb-2">
        <img src={b.image} alt="Banner" className="w-24 h-24 rounded object-cover" />
        <button onClick={() => handleDeleteBanner(b._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
      </div>
    ))}
  </div>
</div>


        {/* Hero */}
       {/* Hero */}
<div className="p-4 border rounded shadow">
  <h3 className="text-xl">Hero</h3>
  <form onSubmit={handleSubmitHero} className="mt-2">
    <input
      type="text"
      placeholder="Title"
      value={newHero.title}
      onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
      required
      className="border p-2 w-full"
    />
    <input
      type="text"
      placeholder="Description"
      value={newHero.description}
      onChange={(e) => setNewHero({ ...newHero, description: e.target.value })}
      required
      className="border p-2 w-full mt-2"
    />
    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
      {heroData ? 'Update Hero' : 'Add Hero'}
    </button>
    {heroData && (
      <button onClick={handleDeleteHero} className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2">
        Delete Hero
      </button>
    )}
  </form>
  {heroData && (
    <div className="mt-2">
      <h4 className="font-semibold">{heroData.title}</h4>
      <p>{heroData.description}</p>
      <button 
        onClick={() => setNewHero({ title: heroData.title, description: heroData.description })} 
        className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
        Edit Hero
      </button>
    </div>
  )}
</div>



        {/* Solutions */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">Solutions</h3>
          <form onSubmit={handleSubmitSolution} className="mt-2">
    <input
        type="text"
        placeholder="Title"
        value={newSolution.title}
        onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
        required
        className="border p-2 w-full"
    />
    <input
        type="text"
        placeholder="Description"
        value={newSolution.description}
        onChange={(e) => setNewSolution({ ...newSolution, description: e.target.value })}
        required
        className="border p-2 w-full mt-2"
    />
    <input
        type="file"
        onChange={(e) => setSolutionImage(e.target.files[0])} // Set the image file
        accept="image/*"
        required
        className="border p-2 w-full mt-2"
    />
    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
        {editingSolution ? 'Update Solution' : 'Add Solution'}
    </button>
</form>

          <div className="mt-2">
          {solutions.map(s => (
    <div key={s._id} className="mb-2 flex justify-between items-center">
        <div>
            <h4 className="font-semibold">{s.title}</h4>
            <p>{s.description}</p>
            <img src={s.image} alt="Solution" className="w-24 h-24 rounded" />
        </div>
        <div>
            <button onClick={() => handleEditSolution(s)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
            <button onClick={() => handleDeleteSolution(s._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
        </div>
    </div>
))}

          </div>
        </div>

        {/* Services */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">Services</h3>
          <form onSubmit={handleSubmitService} className="mt-2">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ name: e.target.value })}
              required
              className="border p-2 w-full"
            />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">{editingService ? 'Update Service' : 'Add Service'}</button>
          </form>
          <ul className="mt-2">
            {services.map(s => (
              <li key={s._id} className="flex justify-between items-center">
                {s.name}
                <div>
                  <button onClick={() => handleEditService(s)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                  <button onClick={() => handleDeleteService(s._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonials */}
        <div className="p-4 border rounded shadow">
          <h3 className="text-xl">Testimonials</h3>
          <form onSubmit={handleSubmitTestimonial} className="mt-2">
            <input
              type="text"
              placeholder="Text"
              value={newTestimonial.text}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
              required
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Author"
              value={newTestimonial.author}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
              required
              className="border p-2 w-full mt-2"
            />
            <input
              type="text"
              placeholder="Designation"
              value={newTestimonial.designation}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
              required
              className="border p-2 w-full mt-2"
            />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">{editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}</button>
          </form>
          <ul className="mt-2">
            {testimonials.map(t => (
              <li key={t._id} className="flex justify-between items-center">
                {t.text} - {t.designation} - {t.author}
                <div>
                  <button onClick={() => handleEditTestimonial(t)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                  <button onClick={() => handleDeleteTestimonial(t._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
