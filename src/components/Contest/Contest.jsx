import React, { useState,useEffect } from 'react';
import { Steps, Form, Input,ConfigProvider, Button, Upload, message, Progress,Select,notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import './Contest.css';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import Modal  from 'antd/es/modal/Modal';
import Topnav from '../TopNav/Topnav';
import Header from '../Header';
const { Step } = Steps;
const Token = localStorage.getItem("JwtToken");
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



  const API_URL = process.env.REACT_APP_API_URL;
  
const Contest = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [ previewImage, setPreviewImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [previewVideo, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload1, setImageUpload1] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [yourName, setYourName] = useState("");
  const [mobile, setMobile] = useState("");
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [actorName, setActorName] = useState("");
  const [actressName, setActressName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [price, setPrice] = useState(0);

  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileSizeError1, setFileSizeError1] = useState(false);
  const [fileSizeError2, setFileSizeError2] = useState(false);

  const ShowModal = () =>{
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // Set a timeout to show the modal after 2 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    },3000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const [uploadStatus, setUploadStatus] = useState({
    poster: false,
    thumbnail: false,
    movie: false
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "yourName":
        setYourName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "movieName":
        setMovieName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "actorName":
        setActorName(value);
        break;
      case "actressName":
        setActressName(value);
        break;
      case "directorName":
        setDirectorName(value);
        break;
      case "contentRating":
        setContentRating(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "profile":
        setProfile(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      setLoading(true); 
      const response = await axios.post(`${API_URL}/api/contests`, {
        data:{
          UserName: values.yourName,
          MobileNumber: values.mobile,
          MovieName: values.movieName,
          Description: values.description,
          Language: values.language,
          Genres: values.genre,
          Actors: values.actorName,
          Actress: values.actressName,
          Directors: values.directorName,
          contentRating: values.contentRating,
          Duration: values.duration,
          Profile: values.profile,
          users_permissions_user: localStorage.getItem('UserId'),
          Email: localStorage.getItem('EmailId'),
        }
      }, option1);
      const formId = response.data.data.id;
      localStorage.setItem("formId", formId);
      setCurrentStep(currentStep + 1);  
      setLoading(false);
      // console.log(formId);
  } catch (err) {
      if (err.response) {
        setLoading(false);
        setCurrentStep(currentStep + 1);
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.error("Server responded with error:", err.response.data);
          // alert("Server responded with error: " + err.response.data.error.message);
      } else if (err.request) {
        // setLoading(false);
          // The request was made but no response was received
          // console.error("No response received from server:", err.request);
          // alert("No response received from server. Please check your network connection.");
      } else {
          // Something happened in setting up the request that triggered an Error
          notification.error({
            message: 'Upload Error',
            description: 'Fill all the required fields',
            placement:'top'
          });
      }
  }  
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      // console.log(file);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
    setPreviewVisible(true);
  };







  
  const handleVideoUpload =  (file) => {
    const MAX_FILE_SIZE = 1500 * 1024 * 1024; 
    // console.log(file,'file size')
    try {
      // Check if a file is selected
      if (!file || !file.file || !file.file.originFileObj) {
        // Handle case where no file is selected
        return;
      }
      // Check file size against the maximum allowed size
      if (file.file.originFileObj.size > MAX_FILE_SIZE) {
        // setFileSizeError2(true);
        console.error('Error: File size exceeds the maximum limit.');
        // Optionally, you can also reset the file input here
        // handlePreview(false);
        // document.getElementById('fileInput').value = '';
        return;
      }
  
      // Proceed with setting the video upload state and updating progress
      setVideoUpload(file.file.originFileObj);
      setUploadProgress(prevState => ({ ...prevState, movie: file.percent }));
      setUploadStatus(prevStatus => ({ ...prevStatus, movie: true }));

    } catch (error) {
      console.error('Error handling video upload:', error);
      // Handle other errors, if any
    }
  };
  

  const handleImageUpload = (file) => {
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // Example maximum file size for images (10MB)
    try {
        // Check if a file is selected
        if (!file || !file.file || !file.file.originFileObj) {
            // Handle case where no file is selected
            return;
        }
        // Check file size against the maximum allowed size
        if (file.file.originFileObj.size > MAX_FILE_SIZE) {
          // setFileSizeError(true);
            console.error('Error: File size exceeds the maximum limit.');
            return;
        }

        // Proceed with setting the image upload state and updating progress
        setImageUpload(file.file.originFileObj);
        setUploadProgress(prevState => ({ ...prevState, poster: file.percent }));
        setUploadStatus(prevStatus => ({ ...prevStatus, poster: true }));
    } catch (error) {
        console.error('Error handling image upload:', error);
        // Handle other errors, if any
    }
};

const handleImageUpload1 =  (file) => {
    const MAX_FILE_SIZE = 7 * 1024 * 1024; // Example maximum file size for images (10MB)
    try {
        // Check if a file is selected
        if (!file || !file.file || !file.file.originFileObj) {
            // Handle case where no file is selected
            return;
        }
        // Check file size against the maximum allowed size
        if (file.file.originFileObj.size > MAX_FILE_SIZE) {
          // setFileSizeError1(true);
            console.error('Error: File size exceeds the maximum limit.');
            return;
        }

        // Proceed with setting the image upload state and updating progress
        setImageUpload1(file.file.originFileObj);
        setUploadProgress(prevState => ({ ...prevState, thumbnail: file.percent }));
        setUploadStatus(prevStatus => ({ ...prevStatus, thumbnail: true }));
    } catch (error) {
        console.error('Error handling image upload:', error);
        // Handle other errors, if any
    }
};


useEffect(() => {
    // Check if all files are uploaded
    if (uploadStatus.movie && uploadStatus.thumbnail && uploadStatus.poster) {
        setButtonDisabled(false); // Enable button
    } else {
        setButtonDisabled(true); // Disable button
    }
}, [uploadStatus]);

  const calculateOverallProgress = () => {
    const { poster, thumbnail, movie } = uploadProgress;
    if (poster !== undefined && thumbnail !== undefined && movie !== undefined) {
      const overallProgress = movie;
      const overallProgresss = Math.round(overallProgress);
      return overallProgresss;
    }
    return 0;
  };



  const handleUpload = async () => {
    setUploading(true); 
    // setUploading(true);
    const videoSize = videoUpload.size;
    // console.log('uplaodsizeuplaodsizeuplaodsizeuplaodsizeuplaodsize',videoSize);
    let uploadedBytes = 0;

    for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => {
            // Calculate progress based on uploaded bytes
            const progress = Math.min(uploadedBytes / videoSize * 100, 100);
            setUploadProgress({
                poster: progress,
                thumbnail: progress,
                movie: progress,
            });
        }, i * 100);
    }
    const videoFormData = new FormData();

    const newFileData = {
      alternativeText: localStorage.getItem("formId"),
      caption: 'video',
    };

    const captionVideo = {
      caption: 'video',
    };
    videoFormData.append('fileInfo', JSON.stringify(newFileData));
    // formData.append('file', JSON.stringify(captionVideo));
    videoFormData.append('files', videoUpload);
    videoFormData.append('refId',localStorage.getItem("formId"))
    videoFormData.append('ref','api::constest.constest')
    videoFormData.append('field',"VideoFile")
    // Handle video upload
    // console.log(' upload response:', videoFormData.values);
    
    try {
      const videoResponse = await axios.post(`${API_URL}/api/upload`, videoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${Token}`,
        },
        onUploadProgress: progressEvent => {
          uploadedBytes = progressEvent.loaded;
          // Calculate progress based on uploaded bytes
          const progress = Math.min(uploadedBytes / videoSize * 100, 100);
          setUploadProgress({
            poster: progress,
            thumbnail: progress,
            movie: progress,
          });
      }
      });
      // Handle success or error for video upload
      // console.log('Video upload response:', videoResponse);
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle error, e.g., show a message to the user
    }
  
    // Handle image uploads (assuming you have two imageUpload variables)
    const imageFormDatas = [imageUpload,imageUpload1];
  
    for (let i = 0; i < imageFormDatas.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append('files', imageFormDatas[i]);
      imageFormData.append('refId',localStorage.getItem("formId"))
      imageFormData.append('ref','api::constest.constest')

      
      if(i==0){
        imageFormData.append('field',"MoviePoster")
        const newFileData = {
          alternativeText: localStorage.getItem("formId"),
          caption: 'MoviePoster',
        };
        imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      else{
        imageFormData.append('field',"MovieThumbnail")
        const newFileData = {
          alternativeText: localStorage.getItem("formId"),
          caption: 'Thumbnail',
        };
        imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      // Handle image upload
      try {
        const imageResponse = await axios.post(`${API_URL}/api/upload`, imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${Token}`,
          },
        });
        setCurrentStep(currentStep + 1);
        setLoading(false);
      } catch (error) {
        console.error(`Error uploading Media ${i + 1}:`, error);
      }finally {
        setUploading(false); 
      }
    }
  
  };


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

 
  

  const handleFinish = () => {
    // Your final submission logic goes here
    message.success('Form submitted successfully!');
  };


  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  const handlePay = () => {
    if (agreed) {
      handlePayment();
    } else {
      // console.log("Please agree to the terms and conditions.");
    }
  };

  const option1 = {
    headers: {
    'Authorization':`Bearer ${Token}`
    },
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
    };


    const validateWordCount = (_, value) => {
      if (value) {
        const words = value.trim().split(/\s+/);
        if (words.length > 200) {
          return Promise.reject(new Error('Description cannot exceed 200 words!'));
        }
      }
      return Promise.resolve();
    };


    const getAmount = async() =>{
      try{
        const res = await axios.get(`${API_URL}/api/price?populate=*`)
        setPrice(res?.data?.data?.attributes?.ContestPrice);
        // console.log(res,'amount')
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      getAmount();
    },[])


  const handlePayment = async(e)=>{
    // e.preventDefault();
    const response = await axios.get(`${API_URL}/api/razorpay`,option1);

    const { data: order } = await axios.post(`${API_URL}/api/contests/${price}/create-order`, {} );
    // console.log(order,'order created')

      var options = {
        key: `${response.data.data.attributes.keyId}`,
        key_secret:`${response.data.data.attributes.keySecret}`,
        amount: order.price,
        currency:"INR",
        order_id: order.id,
        name:"MovieMads",
        
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  {
                    method: 'upi',
                  },
                  {
                    method: 'card'
                  },
                  {
                      method: 'wallet'
                  },
                  {
                      method: 'netbanking'
                  },
                ],
              },
            },
            sequence: ['block.banks'],
            preferences: {
              show_default_blocks: false
            },
          },
        },
        handler:  async function (Paymentresponse){
          const response = await axios.post( `${API_URL}/api/contests/${Paymentresponse.razorpay_payment_id}/${localStorage.getItem('formId')}/payment`,{},option1);
          handleFinish();
          window.location.href = "/";
          // console.log(response,'payment response');
          // window.location.reload();
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }

    const validateDuration = (_, value) => {
      if (value > 7  ) { 
        return Promise.reject('Duration cannot exceed 7 minutes!');
      }
      else if(value<3){
        return Promise.reject('Duration cannot be less than 3 minutes!')
      }
      return Promise.resolve();
    };



    const handleBeforeUpload = (file) => {
      // Check if the file size exceeds the limit
      const isSizeAccepted = file.size / 1024 / 1024 < 3; // 3MB limit
      if (!isSizeAccepted) {
        setButtonDisabled(true);
        setFileSizeError(true);
        notification.error({
          message: 'Upload Error',
          description: 'File size exceeds the limit. Maximum size allowed is 3MB.',
          placement:'top',
          duration: 8,
        });
        return false;
        
      }else{
        setFileSizeError(false);
        notification.success({
          message: 'Your file is Uploading',
          description: 'plesase wait while we upload your file',
          placement:'top'
        });
      }
      return true;
    };
    const handleBeforeUpload1 = (file) => {
      // Check if the file size exceeds the limit
      const isSizeAccepted = file.size / 1024 / 1024 < 3; // 3MB limit
      if (!isSizeAccepted) {
        setButtonDisabled(true);
        setFileSizeError1(true);
        notification.error({
          message: 'Upload Error',
          description: 'File size exceeds the limit. Maximum size allowed is 3MB.',
          placement:'top',
          duration: 8,
        });
        return false;
        
      }else{
        setFileSizeError1(false);
        notification.success({
          message: 'Your file is Uploading',
          description: 'plesase wait while we upload your file',
          placement:'top'
        });
      }
      return true;
    };
    const handleBeforeUploadVideo = (file) => {
      // Check if the file size exceeds the limit
      const isSizeAccepted = file.size / 1024 / 1024 < 5000; 
      if (!isSizeAccepted) {
        setButtonDisabled(true);
        setFileSizeError2(true);
        notification.error({
          message: 'Upload Error',
          description: 'File size exceeds the limit. Maximum size allowed is 5GB.',
          placement:'top'
        });
        // return setButtonDisabled(false);
        return false;
      }else{
        setFileSizeError2(false);
        notification.success({
          message: 'Your file is Uploading',
          description: 'plesase wait while we upload your file',
          placement:'top'
        });
      }
      return true;
    };

  return (
    <>
    <Topnav/>
    <Header/>
    <Modal
    open={showModal} footer={null}  onCancel={handleClose}
    >  
    <VideoContainer>
        <img
        src='https://api.moviemads.com/uploads/Rules1_5554c18870.jpg'
        alt='Moviemads Invitation'
        />
        <img
        src='https://api.moviemads.com/uploads/Whats_App_Image_2024_08_16_at_18_00_35_3f74cab0_f8777d6bb1.jpg'
        alt='Moviemads Invitation'
        />
      </VideoContainer>
    </Modal>
    <div className="container">
      <h1 className='contest-heading'>Short Film contest 2024 <p style={{fontSize:'1.5rem', padding:'0',margin:'0'}}>(Entry fee of Rs.{price} only)</p></h1>
      {loading?(
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
     ):(
      <div className="steps-container">
        <button className='Rules-Btn' onClick={ShowModal}>View rules and regulations</button>
      <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#fba010',
          colorText: '#ffffff',
          colorIcon: '#ffffff',
        },
        components: {
          Steps: {
            colorPrimary: '#e50914',
            algorithm: true, 
            colorText: '#ffffff',
            colorTextTertiary: '#ffffff',
            colorTextSecondary: '#ffffff',
            navArrowColor: '#ffffff',
          },
          Button: {
            colorPrimary: '#e50914',
            algorithm: true, 
            colorBgContainerDisabled: '#495057',
          },
          Select:{
            optionSelectedBg: '#e50914',
            selectorBg: '#495057',
            colorText: '#ffffff',
            colorPrimary: '#fba010',
            optionColor: '#212529',
            colorBgElevated: '#212529',
            colorBorder: '#495057',
            borderRadiusLG: 0,
          },
          Form: {
            colorPrimary: '#ffffff',
            colorText: '#ffffff',
            colorTextTertiary: '#ffffff',
            colorTextSecondary: '#ffffff',
            colorFillSecondary: '#ffffff',
            algorithm: true,
            labelColor: '#ffffff',
          },
          Typography: {
           colorPrimary: '#ffffff',
          },
          Upload:{
            colorText: '#ffffff',
            colorIcon: '#ffffff',
            colorPrimary: '#e50914',
            colorFillAlter: 'rgba(251, 161, 16, 0.6)',
            actionsColor: '#ffffff',
          },
          DatePicker:{
            activeBg: '#212529',
            colorBgContainer: '#495057',
            colorText: '#ffffff',
            colorBgElevated: '#212529',
            colorPrimary: '#e50914',
            colorBorder: '#495057',
            borderRadius: 0,
          },
          Progress:{
            defaultColor: '#fba010',
            colorSuccess: '#e50914',
            colorFillSecondary:'#303030',
            fontSize: '36px',
          },
          TimePicker:{
            colorBgContainer: '#495057',
            colorText: '#ffffff',
            colorBgElevated: '#212529',
            colorPrimary: '#e50914',
            colorBorder: '#495057',
          },
          Notification:{
            colorBgElevated: '#212529',

          },
          Input: {
            colorBgContainer: '#495057',
            colorPrimary: '#fba010',
            algorithm: true,
            colorText: '#ffffff',
            colorBorder: '#495057',
            borderRadius: 0,
          }
        },
      }}
    >
      <Steps current={currentStep}>
        <Step title="Details" />
        <Step title="Upload" />
        <Step title="Payment" />
      </Steps>
      <div style={{ marginTop: 30 , color:"white"}}>
        {currentStep === 0 && (
          <Form
            form={form}
            layout="vertical"
            size="large"
            className="form-container"
          >
            <div  className='Two input'>
            <Form.Item
              label="Your Name"
              name="yourName"
              rules={[{ required: true, message: 'Please Enter Your Name!' }]}
              className="input-container"
              // initialValue={yourName}
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true, message: 'Please Enter Mobile Number!' },{pattern: /^[0-9]{10}$/, message: 'Please Enter Valid Mobile Number!' }]} 
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Movie Name"
              name="movieName"
              rules={[{ required: true, message: 'Please Enter the movie name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please Select a Language!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="Tamil">Tamil</Select.Option>
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="Hindi">Hindi</Select.Option>
            <Select.Option value="Telugu">Telugu</Select.Option>
            <Select.Option value="Kannada">Kannada</Select.Option>
            <Select.Option value="Malayalam">Malayalam</Select.Option>
          </Select>
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Actor Name"
              name="actorName"
              rules={[{ required: true, message: 'Please Enter Actor Name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Actress Name"
              name="actressName"
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Describe Your Short Film ( Max 200 words! )"
              name="description"
            rules={[
              { required: true, message: 'Please describe your movie!' },
              { validator: validateWordCount }
            ]}
              className="input-container"
              onChange={handleInputChange}
              
            >
          <TextArea rows={6}   />
            </Form.Item>
            <div className="input-container">
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: 'Please Select Genre!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Select>
            <Select.Option value="Action">Action</Select.Option>
            <Select.Option value="Adventure">Adventure</Select.Option>
            <Select.Option value="Comedy">Comedy</Select.Option>
            <Select.Option value="Drama">Drama</Select.Option>
            <Select.Option value="Fantasy">Fantasy</Select.Option>
            <Select.Option value="Horror">Horror</Select.Option>
            <Select.Option value="Mystery">Mystery</Select.Option>
            <Select.Option value="Romance">Romance</Select.Option>
            <Select.Option value="Science fiction">Science fiction</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
            <Select.Option value="Thriller">Thriller</Select.Option>
            <Select.Option value="Documentary">Documentary</Select.Option>
            <Select.Option value="Based on a True Story">Based on a True Story</Select.Option>
          </Select>
            </Form.Item>

            <Form.Item
              label="Director Name"
              name="directorName"
              rules={[{ required: true, message: 'Please Enter Director name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            </div>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Your Profile"
              name="profile"
              rules={[{ required: true, message: 'Please Select Your Profile!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Employee">Employee</Select.Option>
            <Select.Option value="Freelancer">Freelancer</Select.Option>
            <Select.Option value="Business Owner">Business Owner</Select.Option>
            <Select.Option value="Unemployed">Unemployed</Select.Option>
            <Select.Option value="Homemaker">Homemaker</Select.Option>
            <Select.Option value="Consultant">Consultant</Select.Option>
            <Select.Option value="Entrepreneur">Entrepreneur</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
            </Form.Item>
            <Form.Item
              label="Content Rating"
              name="contentRating"
              rules={[{ required: true, message: 'Please Select Content Rating!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="U">U (Universal)</Select.Option>
            <Select.Option value="UA">U/A (Universal with Adult)</Select.Option>
            <Select.Option value="A">A (Adult)</Select.Option>
        
          </Select>
            </Form.Item>
            <Form.Item
              label="Duration ( Maximum 7mins ! )"
              name="duration"
              rules={[{ required: true, message: 'Please Fill the Duration!' },
              { validator: validateDuration }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input type='number' max={2} />
            </Form.Item>
              </div>
            {/* Add other form fields here */}
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Next
              </Button>
            </Form.Item>
          </Form>
        )}
        {currentStep === 1 && (
          <Form>
         <div >
          <div className="upload-container">
         <div style={{ marginBottom: '40px',textAlign: 'center',lineHeight: '5px' }}>
          <h3>Upload Movie Poster </h3>
          <h4>( 500 x 750 px)</h4>
          <Form.Item
          name="movie"
          rules={[{ required: true, message: 'Please Upload the Movie' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleImageUpload}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 3 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 3MB.');
            return Upload.LIST_IGNORE; // Prevent the file from being uploaded
          }
          return true;
        }}
        maxCount={1}
        withCredentials={false}
        accept="image/*"
       
      >
        {fileList.length >= 8 ? null : uploadButton}
        {/* {uploadButton} */}
      </Upload>
      </Form.Item>
      <span >( Maximum 3MB )</span>
      <Modal open={previewOpen} title={previewTitle} visible={previewVisible} footer={null} 
      onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal >
         </div>
         <div style={{ marginBottom: '40px',textAlign: 'center',lineHeight: '5px' }}>
          <h3>Upload Thumbnail </h3>
          <h4>( 1280 x 720 px )</h4>
          <Form.Item
          name="movie"
          rules={[{ required: true, message: 'Please Upload the Movie' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 7 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 7MB.');
            return Upload.LIST_IGNORE; // Prevent the file from being uploaded
          }
          return true;
        }}
        onChange={handleImageUpload1}
        maxCount={1}
        accept="image/*"
      >
        {uploadButton}
      </Upload>
      </Form.Item>
      <span >( Maximum 7MB )</span>
      <Modal open={previewOpen} title={previewTitle} footer={null} 
      onCancel={handleCancel}
      visible={previewVisible}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
         </div>
         <div style={{ marginBottom: '40px',textAlign: 'center' , lineHeight: '5px' }}>
          <h3>Upload Movie</h3>
          <h4>( 1280 x 720 px )</h4>
          <Form.Item
          name="movie"
          rules={[{ required: true, message: 'Please Upload the Movie' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 1500 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 1.5GB.');
            return Upload.LIST_IGNORE;
          }
          return true;
        }}
        onChange={handleVideoUpload}
        maxCount={1}
        accept="video/*"
      >
        {uploadButton}
      </Upload>
      </Form.Item>
      {fileSizeError2 && <p className='SizeError'>Video size exceeds the limit</p>}
      <span >( Maximum 1.5GB )</span>
         </div>
         </div>
         <Progress percent={calculateOverallProgress()} />
         <div style={{ marginTop: 40 }}>
           <Button onClick={prevStep}>
             <LeftOutlined /> Previous
           </Button>
           <Button type="primary" disabled={buttonDisabled || uploading}  style={{float: 'right'}} onClick={handleUpload } 
               >
             Next
           </Button>
         </div>
       </div>
       </Form>
        )}
        {currentStep === 2 && (
          <div>
            <div style={{ height: '500px', overflow: 'auto' }}>
            <h2>Terms and Conditions for Short Films</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Copyright Ownership</strong>: The filmmaker retains all copyrights to the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Non-Commercial Use</strong>: The film may be used for non-commercial purposes only, unless otherwise specified.</li>
        <li><strong style={{color:'#ff0015'}}>Distribution Rights</strong>: Distribution rights may be granted to specified channels or platforms as agreed upon.</li>
        <li><strong style={{color:'#ff0015'}}>Screening Rights</strong>: Permission for public screenings may be granted under specific conditions.</li>
        <li><strong style={{color:'#ff0015'}}>Attribution</strong>: Any use of the film must credit the filmmaker appropriately.</li>
        <li><strong style={{color:'#ff0015'}}>Modifications</strong>: Modifications to the film may not be made without explicit permission from the filmmaker.</li>
        <li><strong style={{color:'#ff0015'}}>Release Forms</strong>: All individuals appearing in the film must sign release forms allowing their likeness to be used.</li>
        <li><strong style={{color:'#ff0015'}}>Indemnification</strong>: Users agree to indemnify the filmmaker against any legal claims arising from the use of the film.</li>
        <li><strong style={{color:'#ff0015'}}>Duration</strong>: The terms and conditions remain valid indefinitely unless otherwise specified or terminated by mutual agreement.</li>
    </ol>

    <h2>Supply Materials Rights for Short Film</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Script</strong>: The rights to the script shoold be secured either by purchasing the script outright or obtaining the necessary permissions from the author or copyright holder.</li>
        <li><strong style={{color:'#ff0015'}}>Music</strong>: If using music in the film, ensure that you have the appropriate licenses for all songs used. This may involve obtaining synchronization rights and mechanical licenses for the music.</li>
        <li><strong style={{color:'#ff0015'}}>Images and Footage</strong>: If incorporating images or footage created by others, ensure that you have the necessary permissions or licenses to use them in your film. This includes stock footage, photographs, and any other visual materials.</li>
        <li><strong style={{color:'#ff0015'}}>Artwork and Graphics</strong>: If using any artwork or graphics created by others, obtain permission from the artists or copyright holders to include them in your film.</li>
        <li><strong style={{color:'#ff0015'}}>Props and Set Dressings</strong>: If using any branded props or set dressings, consider obtaining permission from the brand owners to feature their products in your film.</li>
        <li><strong style={{color:'#ff0015'}}>Locations</strong>: Obtain appropriate permissions to film at any locations used in the film, including both public and private properties.</li>
        <li><strong style={{color:'#ff0015'}}>Talent</strong>: Ensure that all actors and performers involved in the film have signed release forms granting permission to use their likeness in the film.</li>
        <li><strong style={{color:'#ff0015'}}>Crew</strong>: Clarify the rights and responsibilities of crew members involved in the production of the film, including any intellectual property rights related to their contributions.</li>
    </ol>

    <h2>Licensing of Rights for Short Films</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Non-Exclusive License</strong>: Grants permission for specific uses of the short film to one or more parties while allowing the filmmaker to license the film to others simultaneously.</li>
        <li><strong style={{color:'#ff0015'}}>Exclusive License</strong>: Grants exclusive rights to a single party for a specified period, prohibiting the filmmaker from granting similar rights to others during that time.</li>
        <li><strong style={{color:'#ff0015'}}>Limited Term License</strong>: Allows the licensee to use the short film for a predetermined period, after which the rights revert to the filmmaker.</li>
        <li><strong style={{color:'#ff0015'}}>Territorial License</strong>: Grants rights to distribute and exhibit the film within specific geographic regions or territories, allowing the filmmaker to license the film separately in other regions.</li>
        <li><strong style={{color:'#ff0015'}}>Media License</strong>: Specifies the types of media through which the film can be distributed or exhibited, such as theatrical screenings, online streaming platforms, or broadcast television.</li>
        <li><strong style={{color:'#ff0015'}}>Royalty-Based License</strong>: Involves payment of royalties to the filmmaker based on the revenue generated from the licensed uses of the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Customized License</strong>: Tailored to the specific needs and requirements of the licensee and the filmmaker, taking into account factors such as intended use, duration, territory, and payment terms.</li>
    </ol>

    <h2>The Platform</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Film Festivals</strong>: Many filmmakers initially showcase their short films at film festivals, where they can attract attention from distributors, industry professionals, and audiences. Winning awards or gaining recognition at festivals can also enhance the film's marketability.</li>
        <li><strong style={{color:'#ff0015'}}>Online Streaming Platforms</strong>: Platforms like Vimeo, Short of the Week, and IndieFlix specialize in short films and offer filmmakers opportunities to license their work for online distribution. These platforms provide exposure to a global audience and often offer revenue-sharing models for filmmakers.</li>
        <li><strong style={{color:'#ff0015'}}>Broadcast Television</strong>: Some television networks and cable channels feature short film showcases or programming blocks dedicated to independent filmmaking. Licensing short films for broadcast can help reach a broader audience and attract the attention of industry professionals.</li>
        <li><strong style={{color:'#ff0015'}}>Educational Institutions</strong>: Colleges, universities, and educational organizations often license short films for classroom use, film studies programs, and academic research. Licensing to educational institutions can provide additional revenue streams and contribute to the film's educational impact.</li>
        <li><strong style={{color:'#ff0015'}}>Cinema Screenings</strong>: Renting out cinemas or participating in short film screening events can provide opportunities for filmmakers to showcase their work to live audiences and engage in post-screening discussions.</li>
        <li><strong style={{color:'#ff0015'}}>Specialized Distribution Companies</strong>: Some companies specialize in the distribution of short films and can help filmmakers navigate the licensing process, negotiate distribution deals, and promote their work to targeted audiences.</li>
    </ol>

    <h2>Online Streaming Platform Rights</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Exclusive vs. Non-Exclusive Rights</strong>: Decide whether you want to grant exclusive rights to a single streaming platform or retain the ability to license your film to multiple platforms simultaneously.</li>
        <li><strong style={{color:'#ff0015'}}>Territorial Rights</strong>: Specify the geographic regions where the streaming platform is allowed to distribute your film. You can grant worldwide rights or limit distribution to specific territories.</li>
        <li><strong style={{color:'#ff0015'}}>Duration of Rights</strong>: Determine the duration of the licensing agreement, including any renewal options. Rights may be licensed for a fixed term or on a per-view basis.</li>
        <li><strong style={{color:'#ff0015'}}>Streaming Formats</strong>: Specify the streaming formats and resolutions in which your film will be made available on the platform, such as HD or 4K.</li>
        <li><strong style={{color:'#ff0015'}}>Promotional Rights</strong>: Determine the platform's ability to promote your film through featured placement, marketing campaigns, and inclusion in curated collections.</li>
        <li><strong style={{color:'#ff0015'}}>Revenue Sharing</strong>: Negotiate the revenue-sharing terms, including the percentage of revenue you will receive from streaming views and any upfront payments or minimum guarantees.</li>
        <li><strong style={{color:'#ff0015'}}>Reporting and Analytics</strong>: Ensure that the platform provides access to detailed reporting and analytics tools, allowing you to track viewership metrics, revenue earnings, and audience demographics.</li>
        <li><strong style={{color:'#ff0015'}}>Technical Requirements</strong>: Provide the platform with any technical specifications or deliverables necessary for streaming your film, such as video files, subtitles, and artwork.</li>
        <li><strong style={{color:'#ff0015'}}>Content Restrictions</strong>: Clarify any content restrictions or guidelines that the platform imposes on uploaded films, such as nudity, violence, or hate speech.</li>
        <li><strong style={{color:'#ff0015'}}>Contract Termination</strong>: Include provisions for terminating the licensing agreement in case of breach of contract, non-payment of royalties, or other violations of the terms and conditions.</li>
    </ol>

    <h2>Fees:</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Submission Fees</strong>: Some film festivals and distribution platforms may charge filmmakers a submission fee to review their short films for potential inclusion in festivals or catalogs. Submission fees help cover administrative costs and may vary depending on the prestige and size of the festival or platform.</li>
    </ol>

    <h2>Return Policy:</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Refunds</strong>: Filmmakers should clarify whether distributors or platforms offer refunds to customers who are dissatisfied with their purchase or rental of the short film. Refund policies may vary depending on the platform's terms and conditions.</li>
        <li><strong style={{color:'#ff0015'}}>Quality Assurance</strong>: Filmmakers should ensure that their short films meet the quality standards and specifications required by distribution platforms.</li>
        <li><strong style={{color:'#ff0015'}}>Customer Support</strong>: Distributors and platforms should provide responsive customer support to address any issues or concerns raised by customers regarding the short film, including technical problems, playback issues, or billing inquiries.</li>
        <li><strong style={{color:'#ff0015'}}>Clear Terms and Conditions</strong>: Filmmakers should clearly communicate the terms and conditions of the distribution agreement, including any return policies, to customers to avoid misunderstandings or disputes.</li>
        <li><strong style={{color:'#ff0015'}}>Flexibility</strong>: Distributors and platforms may offer flexible return policies to accommodate customers' preferences and ensure a positive viewing experience.</li>
    </ol>

    <p>By understanding the fees associated with short film distribution and implementing clear return policies, filmmakers can effectively monetize their work, reach wider audiences, and provide a satisfying viewing experience for customers.</p>

    <h2>Warranties for Short Films:</h2>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Originality Warranty</strong>: The filmmaker warrants that the short film is an original work created by them and does not infringe upon the intellectual property rights of any third party.</li>
        <li><strong style={{color:'#ff0015'}}>Clearance Warranty</strong>: The filmmaker warrants that all necessary rights, licenses, and permissions have been obtained for the use of any third-party content featured in the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Quality Warranty</strong>: The filmmaker warrants that the short film meets certain quality standards, including technical specifications, audio-visual clarity, and production values.</li>
        <li><strong style={{color:'#ff0015'}}>Compliance Warranty</strong>: The filmmaker warrants that the short film complies with all applicable laws, regulations, and industry standards.</li>
        <li><strong style={{color:'#ff0015'}}>Indemnity</strong>: The filmmaker agrees to indemnify and hold harmless distributors, exhibitors, and other parties involved in the distribution and exhibition of the short film against any claims, damages, or liabilities.</li>
        <li><strong style={{color:'#ff0015'}}>Disclaimers</strong>: Filmmakers may also include disclaimers regarding certain aspects of the film.</li>
        <li><strong style={{color:'#ff0015'}}>Limitation of Liability</strong>: Filmmakers may limit their liability for certain types of damages or losses incurred by distributors or viewers.</li>
    </ol>

    <p>Warranties for short films are typically included in distribution agreements, licensing contracts, or release forms and serve to protect the interests of all parties involved in the production, distribution, and exhibition of the film.</p>

    <h2>Disclaimer of Liability for Short Films:</h2>
    <p>A disclaimer of liability for short films is a legal statement that aims to limit the filmmaker's responsibility for certain risks or outcomes associated with the production, distribution, and exhibition of the film.</p>

    <ol>
        <li><strong style={{color:'#ff0015'}}>General Disclaimer</strong>: A statement acknowledging that the information provided in the short film is for general informational purposes only and does not constitute professional advice or guidance.</li>
        <li><strong style={{color:'#ff0015'}}>No Warranty or Guarantee</strong>: A declaration that the filmmaker does not warrant or guarantee the accuracy, completeness, or reliability of the information presented in the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Assumption of Risk</strong>: A statement emphasizing that viewers watch the short film at their own risk.</li>
        <li><strong style={{color:'#ff0015'}}>Limitation of Liability</strong>: A clause limiting the filmmaker's liability for any direct, indirect, incidental, consequential, or punitive damages.</li>
        <li><strong style={{color:'#ff0015'}}>Indemnification</strong>: A provision requiring viewers to indemnify and hold harmless the filmmaker.</li>
        <li><strong style={{color:'#ff0015'}}>No Endorsement or Affiliation</strong>: A disclaimer stating that the inclusion of any third-party content does not imply endorsement, sponsorship, or affiliation by the filmmaker.</li>
        <li><strong style={{color:'#ff0015'}}>Reservation of Rights</strong>: A statement reserving the filmmaker's rights to modify, suspend, or terminate the availability of the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Legal Jurisdiction</strong>: A provision specifying the legal jurisdiction and venue governing any disputes or claims arising from the short film.</li>
    </ol>

    <p>A well-drafted disclaimer of liability can help protect the filmmaker from potential legal claims and liabilities associated with the distribution and exhibition of the short film. However, it's important to note that disclaimers may not be enforceable in all jurisdictions, and their effectiveness may depend on the specific language used and the circumstances surrounding the distribution and exhibition of the film. Consulting with legal professionals experienced in entertainment law can help filmmakers draft effective disclaimers tailored to their specific needs and circumstances.</p>

    <h2>Personal Data Terms for Short Films:</h2>
    <p>When dealing with personal data in short films, it's crucial to respect individuals' privacy rights and comply with relevant data protection laws.</p>

    <ol>
        <li><strong style={{color:'#ff0015'}}>Consent</strong>: Obtain explicit consent from individuals featured in the short film before capturing their personal data.</li>
        <li><strong style={{color:'#ff0015'}}>Purpose Limitation</strong>: Collect and process personal data only for legitimate and specified purposes related to the production, distribution, and exhibition of the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Data Minimization</strong>: Limit the collection and processing of personal data to the minimum necessary for achieving the intended purposes of the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Anonymization and Pseudonymization</strong>: Where feasible, anonymize or pseudonymize personal data to prevent individuals from being directly identified in the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Security Measures</strong>: Implement appropriate technical and organizational measures to safeguard personal data against unauthorized access, disclosure, alteration, or destruction.</li>
        <li><strong style={{color:'#ff0015'}}>Retention Period</strong>: Establish and adhere to a retention period for personal data collected in the context of the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Transparency</strong>: Provide clear and accessible information to individuals about the collection, processing, and use of their personal data in the short film.</li>
        <li><strong style={{color:'#ff0015'}}>Rights of Data Subjects</strong>: Respect the rights of data subjects, including the right to access, rectify, erase, and restrict the processing of their personal data.</li>
        <li><strong style={{color:'#ff0015'}}>Data Transfers</strong>: If personal data is transferred to third parties or stored in locations outside the original jurisdiction, ensure that adequate safeguards are in place to protect the data.</li>
        <li><strong style={{color:'#ff0015'}}>Legal Compliance</strong>: Comply with relevant data protection laws, regulations, and industry standards governing the collection, processing, and protection of personal data.</li>
    </ol>

    <p>By incorporating these personal data terms into the production, distribution, and exhibition of short films, filmmakers can help ensure compliance with data protection requirements and respect individuals' privacy rights.</p>

    <h2>Termination Clauses for Short Films:</h2>
    <p>Termination clauses in the terms and conditions for short films help protect the rights and interests of both parties involved in the agreement. It's crucial for filmmakers and distributors/exhibitors to carefully review and negotiate these clauses to ensure that they align with their respective needs and expectations. Additionally, seeking legal advice from qualified professionals can help ensure that the termination provisions are clear, fair, and enforceable.</p>
    <ol>
        <li><strong style={{color:'#ff0015'}}>Governing Law</strong>: The terms and conditions should specify that Indian law governs the agreement. This means that Indian courts will have jurisdiction over any disputes arising from the agreement, and Indian legal principles will be applied to interpret and enforce the terms of the contract. <br/><p>Example: "This agreement shall be governed by and construed in accordance with the laws of India."</p></li>
        <li><strong style={{color:'#ff0015'}}>Jurisdiction for Disputes</strong>: Designate the appropriate courts or forums within India for resolving disputes arising from the terms and conditions. Parties may choose to submit to the jurisdiction of courts located in a specific city or state within India. <br/><p>Example: "The courts located in [City/State], India shall have exclusive jurisdiction over any disputes arising out of or in connection with this agreement."</p></li>
        <li><strong style={{color:'#ff0015'}}>Dispute Resolution Process</strong>: Outline the procedures and methods for resolving disputes between the parties. This may include informal negotiation, mediation, arbitration, or litigation in Indian courts. <br/><p>Example: "Any dispute, controversy, or claim arising out of or relating to this agreement shall be resolved through mediation administered by [Name of Mediation Centre] in [City], India."</p></li>
        <li><strong style={{color:'#ff0015'}}>Mediation and Arbitration</strong>: Consider including provisions for mediation or arbitration as alternative dispute resolution methods before resorting to litigation in Indian courts. Parties may choose to resolve disputes through arbitration conducted in accordance with Indian arbitration laws. <br/><p>Example: "Any unresolved disputes shall be submitted to arbitration in accordance with the Arbitration and Conciliation Act, 1996, and the arbitration proceedings shall be held in [City], India."</p></li>
        <li><strong style={{color:'#ff0015'}}>Notice of Dispute</strong>: Specify the requirements for providing notice of the dispute to the other party and any specified timelines for response or resolution. This ensures that parties have an opportunity to address and resolve disputes in a timely manner. <br/><p>Example: "Any party seeking to initiate arbitration shall provide written notice to the other party, describing the nature of the dispute and the relief sought, within [number] days of the dispute arising."</p></li>
        <li><strong style={{color:'#ff0015'}}>Costs and Fees</strong>: Clarify how the costs and fees associated with dispute resolution will be allocated between the parties, including reimbursement of legal fees, arbitration costs, and other expenses incurred during the dispute resolution process. <br/><p>Example: "Each party shall bear its own costs and expenses incurred in connection with the arbitration proceedings, including legal fees and arbitration costs."</p></li>
    </ol>

    <p>These clauses are essential for governing the terms and conditions, termination, and dispute resolution related to short films in India.</p>

      </div>
       {/* Checkbox for agreement */}
       <div style={{ marginTop: 10 }}>
        <Checkbox checked={agreed} onChange={toggleAgreement}>
          I agree to the terms and conditions
        </Checkbox>
      </div>
            <div style={{ marginTop: 20 }}>
              <Button onClick={prevStep}>
                <LeftOutlined /> Previous
              </Button>
              <Button type="primary"  style={{float: 'right'}} onClick={handlePayment} disabled={!agreed}>
                Pay
              </Button>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
    </div>
     )} 
    </div>
    </>
  )
}


export default Contest;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  background: black;
  gap: 10px; /* Added 'px' to define the unit for gap */
  overflow-y: scroll;
  height: 600px; /* Set a fixed height for the container */
  border: 4px solid rgba(255, 0, 0, 0.315);

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    img {
      height: auto; /* Adjust height for smaller screens if needed */
    }
  }
`;