// AgentEditModel.jsx

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer/Footer';
import Topnav from '../TopNav/Topnav';

const USERID = localStorage.getItem('UserId');
const API_URL = process.env.REACT_APP_API_URL;

const AgentEditModel = () => {
  const [agentModels, setAgentModels] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [formStates, setFormStates] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [multipleImage, setMultipleImage] = useState('');
  const [imageId, setImageId] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${USERID}?populate[agent_models][populate][Poster]=*&populate[agent_models][populate][Thumbnail]=*&populate[agent_models][populate][Images]=*`);
        const models = res.data.agent_models || [];
        setAgentModels(models);
        // console.log(agentModels,'Agent mdoels')
        setUserDetails(res.data);
        const initialEdit = {};
        const initialForms = {};
        models.forEach(model => {
          initialEdit[model.id] = false;
          initialForms[model.id] = {
            Name: model.Name || '',
            Description: model.Description || '',
            HairColor: model.HairColor || '',
            EyeColor: model.EyeColor || '',
            Height: model.Height || '',
            Weight: model.Weight || '',
          };
        });
        setEditStates(initialEdit);
        setFormStates(initialForms);
      } catch (err) {
        console.error('Error fetching agent models:', err);
      }
    };

    fetchModels();
  }, []);

  const handleInputChange = (e, modelId) => {
    const { name, value } = e.target;
    setFormStates(prev => ({
      ...prev,
      [modelId]: {
        ...prev[modelId],
        [name]: value,
      },
    }));
  };

  const toggleEdit = (modelId) => {
    setEditStates(prev => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const saveModel = async (modelId) => {
    try {
      await axios.put(`${API_URL}/api/agent-models/${modelId}`, {
        data: formStates[modelId],
      });
      toggleEdit(modelId);
    } catch (err) {
      console.error('Error saving model:', err);
    }
  };

  const handleSvgClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (modalType === 'Poster') handlePosterUpload(file);
      else if (modalType === 'Thumbnail') handleThumbnailUpload(file);
      else if (modalType === 'Images') handleImagesUpload(file);
    }
  };

  const handlePosterUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('fileInfo', JSON.stringify({ caption: 'Poster' }));
      await axios.post(`${API_URL}/api/upload?id=${selectedModelId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleThumbnailUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('fileInfo', JSON.stringify({ caption: 'Thumbnail' }));
      await axios.post(`${API_URL}/api/upload?id=${selectedModelId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImagesUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('fileInfo', JSON.stringify({ caption: 'Images' }));
      if (imageId) {
        await axios.post(`${API_URL}/api/upload?id=${imageId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        formData.append('ref', 'api::agent-model.agent-model');
        formData.append('refId', selectedModelId);
        formData.append('field', 'Images');
        await axios.post(`${API_URL}/api/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setLoading(true);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
{loading && 
  <div class="hourglassBackground">
  <div class="hourglassContainer">
    <div class="hourglassCurves"></div>
    <div class="hourglassCapTop"></div>
    <div class="hourglassGlassTop"></div>
    <div class="hourglassSand"></div>
    <div class="hourglassSandStream"></div>
    <div class="hourglassCapBottom"></div>
    <div class="hourglassGlass"></div>
  </div>
</div>
}

  const openModal = (type, modelId, img = '', imgId = '') => {
    setIsModalOpen(true);
    setModalType(type);
    setSelectedModelId(modelId);
    setMultipleImage(img);
    setImageId(imgId);
  };


  const ProfileModal = ({ closeModal, handleFileChange, handleSvgClick, fileInputRef, currentImage }) => {
    return (
      <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>Upload New Image</h2>
            <CloseButton onClick={closeModal}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            {currentImage && <PreviewImage src={currentImage} alt="Current" />}
            <UploadLabel htmlFor="file-upload">Choose File</UploadLabel>
            <HiddenInput
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button onClick={handleSvgClick}>Upload</Button>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  };
  

  return (
    <>
      <Topnav />
      <Header />
      <Container>
        <Card>
          <Title>Agent Models By <span1>{userDetails?.username}</span1></Title>
          {agentModels.map(model => (
            <FullSection key={model.id}>
              <Profile>
                <LeftSection>
                  <ProfilePic src={`${API_URL}${model?.Poster?.url || ''}`} />
                </LeftSection>
                <RightSection>
                  {editStates[model.id] ? (
                    <>
                      <FormGroup>
                        <label>Name</label>
                        <Input name="Name" value={formStates[model.id]?.Name} onChange={(e) => handleInputChange(e, model.id)} />
                      </FormGroup>
                      <Row>
                        <FormGroup><label>Height</label><Input name="Height" value={formStates[model.id]?.Height} onChange={(e) => handleInputChange(e, model.id)} /></FormGroup>
                        <FormGroup><label>Weight</label><Input name="Weight" value={formStates[model.id]?.Weight} onChange={(e) => handleInputChange(e, model.id)} /></FormGroup>
                      </Row>
                      <Row>
                        <FormGroup><label>Eye Color</label><Input name="EyeColor" value={formStates[model.id]?.EyeColor} onChange={(e) => handleInputChange(e, model.id)} /></FormGroup>
                        <FormGroup><label>Hair Color</label><Input name="HairColor" value={formStates[model.id]?.HairColor} onChange={(e) => handleInputChange(e, model.id)} /></FormGroup>
                      </Row>
                      <FormGroup>
                        <label>Description</label>
                        <TextArea name="Description" rows={4} value={formStates[model.id]?.Description} onChange={(e) => handleInputChange(e, model.id)} />
                      </FormGroup>
                      <Button onClick={() => saveModel(model.id)}>Save</Button>
                    </>
                  ) : (
                    <>
                      <ModelName>{model?.Name}</ModelName>
                      <p>{model?.Description}</p>
                      <p>Height: {model?.Height} | Weight: {model?.Weight}</p>
                      <p>Hair Color: {model?.HairColor}</p>
                      <p>Eye Color: {model?.EyeColor}</p>
                      <Button onClick={() => toggleEdit(model?.id)}>Edit</Button>
                    </>
                  )}
                </RightSection>
              </Profile>

              <RightContainer>
                <RightUp>
                  <Section>
                    <SectionTitle>Poster</SectionTitle>
                    <GalleryItem>
                      <GalleryImage src={model?.Poster?.url ? `${API_URL}${model?.Poster?.url}` : 'https://api.moviemads.com/uploads/empty_image_dd70f20899.jpg'} />
                      <EditButton onClick={() => openModal('Poster', model?.Poster?.id, `${API_URL}${model?.Poster?.url}`)}>Change Poster</EditButton>
                    </GalleryItem>
                  </Section>
                  <Section>
                    <SectionTitle>Thumbnail</SectionTitle>
                    <GalleryItem>
                      <GalleryImage src={model?.Thumbnail?.url ? `${API_URL}${model?.Thumbnail?.url}` : 'https://api.moviemads.com/uploads/empty_image_dd70f20899.jpg'} />
                      <EditButton onClick={() => openModal('Thumbnail', model?.Thumbnail?.id, `${API_URL}${model?.Thumbnail?.url}`)}>Change Thumbnail</EditButton>
                    </GalleryItem>
                  </Section>
                </RightUp>

                <Section>
                  <SectionTitle>Images</SectionTitle>
                  <GalleryRow>
                    {[...Array(5)].map((_, index) => {
                      const image = model?.Images?.[index];
                      return (
                        <GalleryItem key={index}>
                          <GalleryImage
                            src={image ? `${API_URL}${image.url}` : 'https://api.moviemads.com/uploads/empty_image_dd70f20899.jpg'}
                          />
                          <EditButton onClick={() => openModal('Images', model.id, image ? `${API_URL}${image.url}` : '', image?.id)}>
                            Change Image
                          </EditButton>
                        </GalleryItem>
                      );
                    })}
                  </GalleryRow>
                </Section>
              </RightContainer>
            </FullSection>
          ))}
        </Card>
      </Container>
      {/* {console.log(multipleImage,'multipleimage') } */}
      {isModalOpen && (
        <ProfileModal
          closeModal={() => setIsModalOpen(false)}
          handleFileChange={handleFileChange}
          handleImageUpload={() => {}}
          currentImage={multipleImage}
          handleSvgClick={handleSvgClick}
          fileInputRef={fileInputRef}
        />
      )}

      <Footer />

      
    </>
  );
};

export default AgentEditModel;


export const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap:4rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin: 2rem auto;
  @media (max-width: 768px) {
    padding: 20px;
  }
  `;


  export const FullSection = styled.div`
  display:flex;
  flex-direction:row;
  width:100%;
  @media (max-width: 768px) {
    flex-direction:column;
    border-bottom:1px solid #eee
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  span1{
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 30px;
    color:red;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-right: 30px;
  border-right: 1px solid #eee;
  width: 25%;

  @media (max-width: 768px) {
    flex-direction: column;
    width:100%;
    align-items: center;
    border-right: none;
    padding-right: 0px;
  }
`;

export const LeftSection = styled.div`
  flex: 0 0 200px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const ProfilePic = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: vertical;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  background-color: #ff0015;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #80000b;
  }
`;

export const ModelName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width:75%;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    width:100%;
  }
`;

export const RightUp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Section = styled.div`
  flex: 1;
  min-width: 250px;
  justify-content:center;
    align-items:center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const GalleryRow = styled.div`
  display: flex;
  flex-direction:row;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
`;

export const GalleryItem = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border-radius: 8px;
  text-align: center;
  width: 100%;
`;

export const GalleryImage = styled.img`
  width:100%;
  height: 200px;
  object-fit:contain;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const EditButton = styled.button`
  background-color: #ff0015;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #80000b;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #404040;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  font-size: 20px;
  background: transparent;
  color:white;
  border: none;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadLabel = styled.label`
  font-weight: bold;
  margin: 10px 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 8px;
`;
