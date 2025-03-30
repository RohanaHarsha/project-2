import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/AdminNavbar'
import './AddHouse.css';


class ImageUpload extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      images: [], // Store uploaded images
      image: [],
      description: '',
      responseMsg: {
        status: '',
        message: '',
        error: '',
      },
    };
  }

  componentDidMount() {
    this.fetchImages();
  }
  // Add deleteImage method in ImageUpload component
deleteImage = (id) => {
  axios.delete(`http://127.0.0.1:5000/deleteBanner/${id}`)
    .then((response) => {
      if (response.status === 200) {
        this.fetchImages(); // Refresh images list
      }
    })
    .catch((error) => {
      console.error("There was an error deleting the image!", error);
    });
};

  // Fetch uploaded images
  fetchImages = () => {
    axios.get('http://127.0.0.1:5000/displayBanner')
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the images!", error);
      });
  };

  // Image change handler
  handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      if (this.fileValidate(e.target.files[i])) {
        imagesArray.push(e.target.files[i]);
      }
    }
    this.setState({
      image: imagesArray,
    });
  };

  // Description change handler
  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  // Submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.image.length; i++) {
      data.append('files[]', this.state.image[i]);
    }
    data.append('description', this.state.description); // Append description to form data

    axios
      .post('http://127.0.0.1:5000/addBanner', data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          this.setState({
            responseMsg: {
              status: 'success',
              message: 'Successfully Uploaded',
              error: '',
            },
          });
          this.fetchImages(); // Refresh images list
          setTimeout(() => {
            this.setState({
              image: [],
              description: '',
              responseMsg: {
                status: '',
                message: '',
                error: '',
              },
            });
          }, );
          document.querySelector('#imageForm').reset();
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          this.setState({
            responseMsg: {
              status: 'failed',
              message: '',
              error: 'Upload Failed',
            },
          });
        }
      });
  };

  // File validation
  fileValidate = (file) => {
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'|| file.type === 'image/jfif') {
      this.setState({
        responseMsg: {
          ...this.state.responseMsg,
          error: '',
        },
      });
      return true;
    } else {
      this.setState({
        responseMsg: {
          ...this.state.responseMsg,
          error: 'File type allowed only jpg, png, jpeg',
        },
      });
      return false;
    }
  };

  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        <h2>Add New Banner</h2>
        <div className='bodyProperties'>
        <form onSubmit={this.submitHandler} action="#" encType="multipart/form-data" id="imageForm">
          {this.state.responseMsg.status === 'success' ? (
            <div style={{ color: 'green' }}>{this.state.responseMsg.message}</div>
          ) : this.state.responseMsg.status === 'failed' ? (
            <div style={{ color: 'red' }}>{this.state.responseMsg.error}</div>
          ) : (
            ''
          )}
          {this.state.responseMsg.error && <div style={{ color: 'red' }}>{this.state.responseMsg.error}</div>}
          
          <label htmlFor="images">Images</label><br />
          <input type="file" name="image" multiple onChange={this.handleChange} className="form-control" /><br />
          <label htmlFor="description">Description</label><br />
          <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} className="form-control" /><br />
          <button type="submit">Upload</button>
        </form>
        </div>
        <br/><br/><br/>
        <h2>Current Displaying Banners</h2><br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.images.map((img, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{img.id}</td>
                <td>{img.description}</td>
                <td>
                  <img src={`http://127.0.0.1:5000/static/uploads/${img.title}`} alt={img.title} style={{width: '100px'}} />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.deleteImage(img.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ImageUpload;
