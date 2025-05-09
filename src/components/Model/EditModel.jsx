import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer/Footer'
import Topnav from '../TopNav/Topnav'
import './Model.css'
import { PlusOutlined } from '@ant-design/icons'


const EditModel = () => {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
    const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [imageId, setImageId] = useState("");
  const [posterId, setPosterId] = useState("");
  const [thumbnailId, setThumbnailId] = useState("");
  const [details, setDetails] = useState(null);
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [poster, setPoster] = useState(null);
  const [multipleImage, setMultipleImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = React.useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "hairColor":
        setHairColor(value);
        break;
      case "eyeColor":
        setEyeColor(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "weight":
        setWeight (value);
        break;
      default:
        break;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/Models/${id}?populate=*`
      );
      const responseData = response.data.data;
      setDetails(responseData);
      setFullName(responseData?.attributes.Name);
      setDescription(responseData?.attributes.Description);
      setHairColor(responseData?.attributes.HairColor);
      setEyeColor(responseData?.attributes.EyeColor);
      setHeight(responseData?.attributes.Height);
      setWeight(responseData?.attributes?.Weight);
      setPosterId(responseData?.attributes?.Poster?.data?.id);
      
      setThumbnailId(responseData?.attributes?.Thumbnail?.data?.id);
      // console.log(responseData,'Edit response');
    } catch (err) {
      console.error(err);
    }
  };

  const handleFieldChange = async() =>{
    try {
      const res = await axios.put(`${API_URL}/api/Models/${id}`,{
        data:{
            Name: fullName,
            HairColor:hairColor,
            EyeColor:eyeColor,
            Description:description,
            Height:height,
            Weight:weight,
        }
      });
      // console.log(res.data,'edited response')
      toggleEditing();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  } 

  const handleFileChange = (e, index) => {
    const { name, files } = e.target;
    // console.log(`File selected for ${name}:`, files[0]);
  
    switch (name) {
      case "poster":
        // console.log("Setting poster:", files[0]);
        setPoster(files[0]);
        break;
      case "thumbnail":
        // console.log("Setting thumbnail:", files[0]);
        setThumbnail(files[0]);
        break;
      case "images":
        setImages(prevImages => {
          const newImages = [...prevImages];
          newImages[index] = files[0];
          // console.log("Setting images:", newImages);
          return newImages;
        });
        break;
      default:
        break;
    }
  };
  


  const handlePosterUpload = async (img) => {

    try {
      const formData = new FormData();
      formData.append('files', img);
      const newFileData = {
        alternativeText: " ",
        name: " ",
        caption: 'Poster',
      };
      formData.append('fileInfo', JSON.stringify(newFileData));

      const res = await axios.post(`${API_URL}/api/upload?id=${posterId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      });
      fetchData(); // Refresh data after upload
      setIsModalOpen(false); // Close the modal after upload
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  const handleThumbnailUpload = async (img) => {
    try {
      const formData = new FormData();
      formData.append('files', img);
      const newFileData = {
        alternativeText: " ",
        name: " ",
        caption: 'Thumbnail',
      };
      formData.append('fileInfo', JSON.stringify(newFileData));

      const res = await axios.post(`${API_URL}/api/upload?id=${thumbnailId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      });
      fetchData(); // Refresh data after upload
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagesUpload = async (img) => {
    try {
      const formData = new FormData();
      formData.append('files', img);
      const newFileData = {
        alternativeText: " ",
        name: " ",
        caption: 'Images',
      };
      formData.append('fileInfo', JSON.stringify(newFileData));
  
      if (imageId) {
        // Replace existing image
        // console.log('OLD Image Check')
        const res = await axios.post(`${API_URL}/api/upload?id=${imageId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json'
          }
        });
        window.location.reload();
        // console.log(res.data, 'image update response');
      } else {
        // console.log('new Image Check')
        const newImageData = new FormData();
        newImageData.append('files', img);
        newImageData.append('field', 'Images');
        const newFileData = {
          alternativeText: " ",
          name: " ",
          caption: 'Images',
        };
        newImageData.append('fileInfo', JSON.stringify(newFileData));
        newImageData.append('refId',localStorage.getItem('ModelId'));
        newImageData.append('ref', 'api::model.model');
        // Upload new image
        const res = await axios.post(`${API_URL}/api/upload`, newImageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json'
          }
        });
        window.location.reload();
        // console.log(localStorage.getItem('ModelId'),res.data, 'new image upload response');
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: '#c71b29',
        padding:'20px',
        borderRadius:'10px',
        cursor: 'pointer', // Ensure the button is clickable
      }}
      type="button"
      onClick={handleSvgClick}
    >
      <PlusOutlined style={{color:'white'}} />
      <div
        style={{
          marginTop: 8,
          color: '#fff', // Ensure text is visible
        }}
      >
        Upload More
      </div>
    </button>
  );

  return (
   <>
   <Topnav/>
   <Header/>
   <Container>
   <div className="profile-card">
        <h1 className="title">Profile Page</h1>
        
        <div className='profile'>
        <div className="profile-info left">
          <div className="profile-pic">
            <img src={`${API_URL}${details?.attributes?.Poster?.data?.attributes?.url}`} alt="Profile" />
          </div>
          <div className="profile-details">
            {!editing ? (
              <>
                <h2 className="name">{details?.attributes?.Name}</h2>
                {/* <p className="email">{details?.attributes.Email}</p> */}
                <p className="bio"><span>H: {details?.attributes?.Height}cm</span>{" "}|{" "}<span>W: {details?.attributes.Weight}kg</span></p>
                <p className="bio"><span>Eye Color: {details?.attributes?.EyeColor}</span>{" "}|{" "}<span>Hair Color: {details?.attributes.HairColor}</span></p>
                <p className="bio">{details?.attributes?.Description}</p>
                <button className="edit-button" onClick={toggleEditing}>
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="TwoField">
                <div className="form-group">
                  <label>Height</label>
                  <input
                    type="text"
                    name="height"
                    value={height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={weight}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="TwoField">
                <div className="form-group">
                  <label>Eye Color</label>
                  <input
                    type="text"
                    name="eyeColor"
                    value={eyeColor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Hair Color</label>
                  <input
                    type="text"
                    name="hairColor"
                    value={hairColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  rows={4}
                  value={description}
                  onChange={handleInputChange}
                />
              </div>
              <button className="save-button" onClick={handleFieldChange}>
                Save
              </button>
            </div>
            )}
          </div>
        </div>
        <div className='right'>
          
          <div className='right-up'>
        <div className='r1'>
        <h2 className="gallery-title">Poster</h2>
        <div className="gallery-item gallery1">
              <img src={`${API_URL}${details?.attributes?.Poster?.data?.attributes?.url}`}  alt={`Model Image`} className="gallery-image" />
              <button className="edit-Pic" onClick={() => setIsModalOpen('poster')}>
                  Change Poster
                </button>
        </div>
        </div>

        <div className='r1'>
        <h2 className="gallery-title">Thumbnail</h2>
        <div className="gallery-item gallery1">
              <img src={`${API_URL}${details?.attributes?.Thumbnail?.data?.attributes?.url}`}  alt={`Model Image`} className="gallery-image" />
         <button className="edit-Pic" onClick={() => setIsModalOpen('thumbnail')}>
                  Change Thumbnail
                </button>
        </div>
        </div>
        </div>
        <div className='r2'>
        <h2 className="gallery-title">Images</h2>

        <div className="gallery1">
  {[...Array(5)].map((_, index) => {
    const image = details?.attributes?.Images?.data?.[index];
    const fileInputId = `fileInput_${index}`;

    return (
      <div key={index} className="gallery-item">
        {image ? (
          <>
            <img src={`${API_URL}${image?.attributes?.url}`} alt={`Model ${index}`} className="gallery-image" />
            <button className="edit-Pic" onClick={() => { setIsModalOpen('Images'); setMultipleImage(`${API_URL}${image?.attributes?.url}`); setImageId(`${image.id}`) }}>
              Change Image
            </button>
          </>
        ) : (
          <div className="gallery-item">
            <img src={`https://api.moviemads.com/uploads/empty_image_dd70f20899.jpg`} alt={`Model `} className="gallery-image" />
             <button className="edit-Pic" onClick={() => { setIsModalOpen('Images'); }}>
              Change Image
            </button>
          </div>
        )}
      </div>
    );
  })}
</div>


        </div>
        </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal
          closeModal={toggleModal}
          handleFileChange={handleFileChange}
          handleImageUpload={handlePosterUpload}
          currentImage={`${API_URL}${details?.attributes?.Poster?.data?.attributes?.url}`}
          handleSvgClick={handleSvgClick}
          fileInputRef={fileInputRef}
        />
      )}

        {isModalOpen === 'thumbnail' && (
          <ProfileModal
            closeModal={() => setIsModalOpen(false)}
            handleFileChange={handleFileChange}
            handleImageUpload={handleThumbnailUpload}
            currentImage={`${API_URL}${details?.attributes?.Thumbnail?.data?.attributes?.url}`}
            handleSvgClick={handleSvgClick}
            fileInputRef={fileInputRef}
          />
        )}
        {isModalOpen === 'Images' && (
          <ProfileModal
            closeModal={() => setIsModalOpen(false)}
            handleFileChange={handleFileChange}
            handleImageUpload={handleImagesUpload}
            currentImage={multipleImage}
            handleSvgClick={handleSvgClick}
            fileInputRef={fileInputRef}
          />
        )}
   </Container>
      <Footer/>
    {/* Modal for changing profile picture */}
   </>
  )
}

const ProfileModal = ({ closeModal, handleFileChange,handleSvgClick,fileInputRef, handleImageUpload, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
  };
// console.log(selectedFile,'selectedFile')

  return (
    <div className="modal">
      <div className="modal-content1">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Change Profile Picture</h2>

        <div className="modal-fields">
          <div className="modal-upload">
            <div class="input-div" onClick={handleSvgClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
            <input class="input" name="file" type="file" accept="image/*"  ref={fileInputRef} onChange={handleFileSelected}/>
          </div>
          </div>
                {selectedFile?(<p><span style={{color:'#c71b29',fontWeight:'bold'}} >Selected Image:</span>{selectedFile.name}</p>):null}
          <button
            className="save-button"
            onClick={() => handleImageUpload(selectedFile)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModel;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
  &:before {
    // background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;