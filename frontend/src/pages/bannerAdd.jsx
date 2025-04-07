// src/components/Banner/AddBannerForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './bannerAdd.css'; // Use a better name like BannerForm.css

const AddBannerForm = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [responseMsg, setResponseMsg] = useState({ status: '', message: '', error: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('http://127.0.0.1:5000/banner/displayBanner')
      .then(res => setImages(res.data))
      .catch(err => console.error("Error fetching images", err));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      ['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setResponseMsg({ ...responseMsg, error: 'Only .jpg, .png, .jpeg, .jfif files allowed' });
    } else {
      setResponseMsg({ ...responseMsg, error: '' });
    }

    setSelectedImages(validFiles);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedImages.forEach(image => formData.append('files[]', image));
    formData.append('description', description);

    axios.post('http://127.0.0.1:5000/banner/addBanner', formData)
      .then((res) => {
        if (res.status === 201) {
          setResponseMsg({ status: 'success', message: 'Successfully uploaded!', error: '' });
          setSelectedImages([]);
          setDescription('');
          fetchImages();
        }
      })
      .catch(err => {
        console.error(err);
        setResponseMsg({ status: 'failed', message: '', error: 'Upload failed' });
      });
  };

  const deleteImage = (id) => {
    axios.delete(`http://127.0.0.1:5000/banner/deleteBanner/${id}`)
      .then((res) => {
        if (res.status === 200) fetchImages();
      })
      .catch(err => console.error("Delete error", err));
  };

  return (
    <div>
      <h2>Add New Banner</h2>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        {responseMsg.message && <p style={{ color: 'green' }}>{responseMsg.message}</p>}
        {responseMsg.error && <p style={{ color: 'red' }}>{responseMsg.error}</p>}

        <label>Images</label><br />
        <input type="file" name="image" multiple onChange={handleImageChange} className="form-control" /><br />
        <label>Description</label><br />
        <input type="text" name="description" value={description} onChange={handleDescriptionChange} className="form-control" /><br />
        <button type="submit">Upload</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Current Banners</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{img.id}</td>
              <td>{img.description}</td>
              <td><img src={`http://127.0.0.1:5000/static/uploads/${img.title}`} style={{ width: '100px' }} alt="Banner" /></td>
              <td><button className="btn btn-danger" onClick={() => deleteImage(img.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddBannerForm;
