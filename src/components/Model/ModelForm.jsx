import React, { useState,useEffect } from 'react';
import { Steps, Form, Input,ConfigProvider, Button, Upload, message,Tag,Space, Progress,Select,notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

import {PlusOutlined } from '@ant-design/icons';

// import {STRAPI_API_URL} from '../../constants.js';
import './Model.css';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import Modal from 'antd/es/modal/Modal';
import Topnav from '../TopNav/Topnav';
import Header from '../Header';
const { Step } = Steps;
const API_URL = process.env.REACT_APP_API_URL;

const ModelForm = () => {
  
  const [token, setToken] = useState(localStorage.getItem("JwtToken"));
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [refCode, setRefCode] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload1, setImageUpload1] = useState(null);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailId, setEmailId] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileSizeError1, setFileSizeError1] = useState(false);
  const [fileSizeError2, setFileSizeError2] = useState(false);
  const [price, setPrice] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(price);

  const [uploadStatus, setUploadStatus] = useState({
    poster: false,
    thumbnail: false,
    images: false
  });


  
 // Update discounted price when price or coupon changes
  useEffect(() => {
    if (appliedCoupon) {
      const discountAmount = (price * appliedCoupon.discount) / 100;
      setDiscountedPrice(price - discountAmount);
    } else {
      setDiscountedPrice(price);
    }
  }, [price, appliedCoupon]);

  const validateCoupon = async (code) => {
    try {
      const response = await axios.get(`${API_URL}/api/validate-coupon`, {
        params: { code }
      });

      if (response.data.valid) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCouponError('Invalid or expired coupon');
      } else {
        setCouponError('Error validating coupon. Please try again.');
      }
      return null;
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const result = await validateCoupon(couponInput);
    if (result) {
      setAppliedCoupon(result);
      setCouponError('');
      notification.success({
        message: 'Coupon Applied',
        description: `You've received ${result.discount}% off!`,
        placement: 'top'
      });
    } else {
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "emailId":
        setEmailId(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "category":
        setCategory(value);
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
      case "instaLink":
        setInstaLink(value);
        break;
      case "refcode":
        setRefCode(value);
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
      const response = await axios.post(`${API_URL}/api/models`, {
          data:{
            Name: values.fullName,
            MobileNumber: values.mobile,
            Email: values.emailId,
            Language: values.language,
            Category: values.category,
            HairColor: values.hairColor,
            EyeColor: values.eyeColor,
            Description: values.description,
              Height: values.height,
              Weight: values.weight,
              Social: values.instaLink,
              referral_code: values.refcode,
              users_permissions_user: localStorage.getItem('UserId'),
              Model_ID:null,
              publishedAt:null
          }
      });
      const ModelId = response.data.data.id;
      localStorage.setItem("ModelId", ModelId);
      // console.log(ModelId,'ModelId');
      setCurrentStep(currentStep + 1);  
      setLoading(false); 
  } catch (err) {
        setLoading(false);
      if (err.response) {
        notification.error({
          message: 'Upload Error',
          description: 'Server responded with an error',
          placement: 'top'
        });
      } else if (err.request) {
        notification.error({
          message: 'Network Error',
          description: 'No response received from server. Please check your network connection.',
          placement: 'top'
        });
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


  const validateWordCount = (_, value) => {
    if (value) {
      const words = value.trim().split(/\s+/);
      if (words.length > 200) {
        return Promise.reject(new Error('Description cannot exceed 200 words!'));
      }
    }
    return Promise.resolve();
  };


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

  const handleImageUpload = (file) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example maximum file size for images (10MB)
    try {
        // Check if a file is selected
        if (!file || !file.file || !file.file.originFileObj) {
            // Handle case where no file is selected
            return;
        }
        // Check file size against the maximum allowed size
        if (file.file.originFileObj.size > MAX_FILE_SIZE) {

          return false // Prevent the file from being uploaded
        }
        // Proceed with setting the image upload state and updating progress
        setImageUpload(file.file.originFileObj);
        setUploadProgress(prevState => ({ ...prevState, poster: file.percent }));
        setUploadStatus(prevStatus => ({ ...prevStatus, poster: true }));
        return true;
    } catch (error) {
        console.error('Error handling image upload:', error);
        // Handle other errors, if any
    }
};

const handleImageUpload1 =  (file) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example maximum file size for images (5MB)
    try {
        // Check if a file is selected
        if (!file || !file.file || !file.file.originFileObj) {
            // Handle case where no file is selected
            return;
        }
        // Check file size against the maximum allowed size
        if (file.file.originFileObj.size > MAX_FILE_SIZE) {
          return false; 
        }

        // Proceed with setting the image upload state and updating progress
        setImageUpload1(file.file.originFileObj);
        setUploadProgress(prevState => ({ ...prevState, thumbnail: file.percent }));
        setUploadStatus(prevStatus => ({ ...prevStatus, thumbnail: true }));
        return true;
    } catch (error) {
        console.error('Error handling image upload:', error);
        // Handle other errors, if any
    }
};


const handleImageUpload2 = ({fileList}) => {

  try {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum file size for each image (5MB)
    let valid = true;
    fileList.forEach((file) => {
      if (file.originFileObj.size > MAX_FILE_SIZE) {
        valid = false;
      }
    });
    if (!valid) {
      return false;
    }
    const arrayImages = fileList.map((file) => file.originFileObj);
    setUploadProgress((prevState) => ({ ...prevState, images: fileList.length }));
    setUploadStatus((prevStatus) => ({ ...prevStatus, images: fileList.length <= 5 }));
    setImagesUpload(arrayImages);
    // console.log(imagesUpload, 'Multiple images uploaded');
    return true;
  } catch (error) {
    console.error('Error handling image upload:', error);
  }
};



useEffect(() => {
    // Check if all files are uploaded
    if (uploadStatus.images && uploadStatus.thumbnail && uploadStatus.images) {
        setButtonDisabled(false); // Enable button
    } else {
        setButtonDisabled(true); // Disable button
    }
}, [uploadStatus]);

// console.log(buttonDisabled,'Button disabled');

const calculateOverallProgress = () => {
  let progress = 0;
  if (uploadStatus.poster) progress += 33;
  if (uploadStatus.thumbnail) progress += 33;
  if (uploadStatus.images) progress += 34;
  return progress;
};



  const handleUpload = async () => {
    setUploading(true);
    setLoading(true);
    // Handle image uploads (assuming you have two imageUpload variables)
    const imageFormDatas = [imageUpload,imageUpload1, ...imagesUpload];
  // console.log(localStorage.getItem('ModelId'),'ModelId Poster');
    for (let i = 0; i < imageFormDatas.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append('files', imageFormDatas[i]);
      imageFormData.append('refId',localStorage.getItem("ModelId"))
      imageFormData.append('ref','api::model.model')
   
      
      if(i==0){
        imageFormData.append('field',"Poster")
        const newFileData = {
          alternativeText: localStorage.getItem("ModelId"),
          caption: 'Poster',
        };
        imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      else if(i==1){
        imageFormData.append('field',"Thumbnail")
        const newFileData = {
          alternativeText: localStorage.getItem("ModelId"),
          caption: 'Thumbnail',
        };
        imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      else{
        imageFormData.append('field',"Images")
        const newFileData = {
          alternativeText: localStorage.getItem("ModelId"),
          caption: 'Images',
        };
        imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      // Handle image upload
      try {
        const imageResponse = await axios.post(`${API_URL}/api/upload`, imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization':`Bearer ${Token}`,
          },
        });
        // console.log('All uploads completed');
        // console.log(`Image ${i + 1} upload response:`, imageResponse);
        setCurrentStep(currentStep + 1);
        setLoading(false);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
      }finally {
        setUploading(false); 
        setLoading(false);
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



  const option1 = {
    headers: {
    'Authorization':`Bearer ${token}`
    },
    };

    const getAmount = async() =>{
      try{
        const res = await axios.get(`${API_URL}/api/price?populate=*`)
        setPrice(res?.data?.data?.attributes?.ModelPrice);
        // console.log(res,'amount')
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      getAmount();
    },[])


    const handlePayment = async (e) => {
      e.preventDefault();
      try {
        // Get Razorpay key
        const keyResponse = await axios.get(`${API_URL}/api/razorpay`, option1);
        const keyId = keyResponse.data.data.attributes.keyId;
        const key_secret = keyResponse.data.data.attributes.keySecret;
        // Create order
        const orderResponse = await axios.post(`${API_URL}/api/contests/${price}/create-order`, {}, option1);
        const order = orderResponse.data;
    
        // Razorpay options
        const options = {
          key: keyId,
          key_secret:key_secret,
          amount: order.price,
          currency: "INR",
          order_id: order.id,
          name: "MovieMads",
          config: {
            display: {
              blocks: {
                banks: {
                  name: 'All payment methods',
                  instruments: [
                    { method: 'upi' },
                    { method: 'card' },
                    { method: 'wallet' },
                    { method: 'netbanking' },
                  ],
                },
              },
              sequence: ['block.banks'],
              preferences: {
                show_default_blocks: false
              },
            },
          },
          handler: async function (Paymentresponse) {
            message.info('Please do not refresh the page');
            try {
              const paymentResponse = await axios.post(`${API_URL}/api/models/${localStorage.getItem('ModelId')}/${Paymentresponse.razorpay_payment_id}/payment`, {}, option1);
              handleFinish();  // Make sure handleFinish is defined and handles any async operations
              // console.log(paymentResponse, 'payment response');
              window.location.href = "/";
            } catch (error) {
              console.error('Error in payment handler:', error);
            }
          },
        };
    
        // Open Razorpay payment interface
        const pay = new window.Razorpay(options);
        pay.open();
      } catch (error) {
        console.error('Error in handlePayment:', error);
      }
    };
    

  return (
    <>
    <Topnav/>
    <Header/>
    <div className="container">
        <div>
          <h1 className='contest-heading'>
            Model form 
            <p style={{ fontSize: '1.5rem', padding: '0', margin: '0' }}>
              (Entry fee of <span className='strikeOut'>Rs.999</span> 
              {appliedCoupon ? (
                <>
                  <span> Now Rs.<span className='original-price'>{price}</span> Rs.{discountedPrice} only</span>
                  <Tag color="green" style={{ marginLeft: '10px' }}>
                    {appliedCoupon.discount}% OFF
                  </Tag>
                </>
              ) : (
                <span> Now Rs.{price} only</span>
              )}
            </p>
          </h1>
        </div>
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
              label="Full Name"
              name="fullName"
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
              label="Email Address"
              name="emailId"
              type="email"
              rules={[{ required: true, message: 'Please Enter Your Email address!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Known Languages (English,Tamil...etc)"
              name="language"
              rules={[{ required: true, message: 'Please Enter Your known Languages!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Gender"
              name="category"
              rules={[{ required: true, message: 'Please Select a Category!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Child Artist">Child Artist</Select.Option>
          </Select>
            </Form.Item>

            <Form.Item
              label="Hair Color"
              name="hairColor"
              rules={[{ required: true, message: 'Please Enter Hair Color!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Eye Color"
              name="eyeColor"
              rules={[{ required: true, message: 'Please Enter Eye Color!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Describe Yourself (Max 200 words!)"
              name="description"
                rules={[
              { required: true, message: 'Please describe about yourself!' },
              { validator: validateWordCount }
            ]}
              className="input-container"
              onChange={handleInputChange}
              
            >
          <TextArea rows={6}   />
            </Form.Item>
            <div className="input-container">
            <Form.Item
              label="Height (In centimeters)"
              name="height"
              rules={[{ required: true, message: 'Please Enter your Height!' },{ 
                pattern: /^(1[3-9][0-9]|[2-9][0-9]{2})$/, // matches 130-999 cm range
                message: 'Please enter a valid height (130-999 cm)!'
              }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Weight (In kg)"
              name="weight"
              rules={[{ required: true, message: 'Please Enter Your Weight!' }, { 
                pattern: /^(2[0-9]|[3-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/, // matches 20-300 kg range
                message: 'Please enter a valid weight (20-300 kg)!'
              }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            </div>
              </div>
              <div className="Two input">

            <Form.Item
              label="Paste Your Instagram link"
              name="instaLink"
              rules={[{ required: true, message: 'Please Paste Your Instagram URL!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
            <Input/>
            </Form.Item>

                    <Form.Item
                      label="Referral Code"
                      name="refcode"
                      className="input-container"
                      onChange={handleInputChange}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Coupon Code"
                      help={couponError}
                      validateStatus={couponError ? 'error' : ''}
                    >
                      <Space.Compact style={{ width: '100%' }}>
                        <Input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Enter coupon code"
                          disabled={!!appliedCoupon}
                        />
                        {appliedCoupon ? (
                          <Button danger onClick={handleRemoveCoupon}>
                            Remove
                          </Button>
                        ) : (
                          <Button 
                            type="primary" 
                            onClick={handleApplyCoupon}
                            loading={loading} // You might want to add loading state for coupon validation
                          >
                            Apply
                          </Button>
                        )}
                      </Space.Compact>
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
          <h3>Upload Poster </h3>
          <h4>( 500 x 750 px)</h4>
          <Form.Item
          name="poster"
          rules={[{ required: true, message: 'Please Upload the Movie' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 5MB.');
            return Upload.LIST_IGNORE; // Prevent the file from being uploaded
          }
          return true;
        }}
        onChange={handleImageUpload}
        maxCount={1}
        accept="image/*"
       
      >
        {uploadButton}
      </Upload>
      </Form.Item>
      {/* {fileSizeError && <p className='SizeError'>Image size exceeds the limit</p>} */}
      <span >( Maximum 5MB )</span>
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
          <h3>Upload Thumbnail</h3>
          <h4>( 1280 x 720 px )</h4>
          <Form.Item
          name="thumbnail"
          rules={[{ required: true, message: 'Please Upload the Movie' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 5MB.');
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
      {/* {fileSizeError1  && <p className='SizeError'>Image size exceeds the limit</p>} */}
      <span >( Maximum 5MB )</span>
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
          <h3>Upload Images</h3>
          <h4>( Max 5 images )</h4>
          <Form.Item
          name="images"
          rules={[{ required: true, message: 'Please Upload the Images' }]}
          className="input-container"
        >
         <Upload
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleImageUpload2}
        beforeUpload={(file) => {
          const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum file size for each image (3MB)
          if (file.size > MAX_FILE_SIZE) {
            message.error('File size exceeds the maximum limit of 3MB.');
            return Upload.LIST_IGNORE; // Prevent the file from being uploaded
          }
          return true;
        }}
        multiple
        maxCount={5}
        accept="image/*"
      >
        {imagesUpload.length<5 && uploadButton}
      </Upload>
      </Form.Item>
      {/* {fileSizeError2 && <p className='SizeError'>Image size exceeds the limit</p>} */}
      <span >( Max 5MB Each)</span>
         </div>
         </div>
         <Progress percent={calculateOverallProgress()} />
         <div style={{ marginTop: 40 }}>
           <Button onClick={prevStep}>
             <LeftOutlined /> Previous
           </Button>
           <Button type="primary" disabled={ buttonDisabled}  style={{float: 'right'}} onClick={handleUpload } 
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
            <h2>Terms and Conditions for Model Application</h2>
            <ol>
              <li><strong style={{color:'#ff0015'}}>Categories</strong>: The contest is open to three categories of models: male, female, and child artist.</li>
              <li><strong style={{color:'#ff0015'}}>Eligibility</strong>: Applicants must meet the age and other eligibility requirements specified for their respective category.</li>
              <li><strong style={{color:'#ff0015'}}>Application Process</strong>: Applicants must complete the application form accurately and submit any required supporting materials along with the payment.</li>
              <li><strong style={{color:'#ff0015'}}>Payment and Refunds</strong>: There is a non-refundable fee for submitting the application. No refunds will be issued after the payment is made.</li>
              <li><strong style={{color:'#ff0015'}}>Profile Review</strong>: After payment, each application will be reviewed. Profiles will be published on the website if they meet the contest standards and criteria.</li>
              <li><strong style={{color:'#ff0015'}}>Publication</strong>: Approved profiles will be published on the contest website, where they can be viewed by directors and other industry professionals.</li>
              <li><strong style={{color:'#ff0015'}}>Selection Criteria</strong>: Selection and approval of profiles will be based on criteria set by the contest organizers, including but not limited to appearance, charisma, and suitability for modeling.</li>
              <li><strong style={{color:'#ff0015'}}>Usage Rights</strong>: By applying, applicants grant the organizers the right to use their submitted photos and personal information for promotional and contest-related purposes.</li>
              <li><strong style={{color:'#ff0015'}}>No Guarantee</strong>: Submission of an application and payment does not guarantee selection as a contest participant or publication of the profile.</li>
              <li><strong style={{color:'#ff0015'}}>Facilitation of Connections</strong>: The organizers will facilitate connections between models and interested parties such as directors or others who wish to hire models from the published list.</li>
              <li><strong style={{color:'#ff0015'}}>Model Release</strong>: Selected participants will be required to sign a model release form, granting the organizers permission to use their likeness in promotional materials.</li>
              <li><strong style={{color:'#ff0015'}}>Indemnification</strong>: Applicants agree to indemnify the contest organizers against any legal claims arising from the use of their submitted materials.</li>
              <li><strong style={{color:'#ff0015'}}>Termination</strong>: The organizers reserve the right to terminate the contest or disqualify participants at their discretion.</li>
              <li><strong style={{color:'#ff0015'}}>Compliance with Laws</strong>: Applicants must comply with all local, state, and federal laws and regulations. Failure to comply may result in disqualification.</li>
              <li><strong style={{color:'#ff0015'}}>Confidentiality</strong>: Applicants agree to keep all contest-related information confidential and not disclose any details to third parties without the organizer's consent.</li>
              <li><strong style={{color:'#ff0015'}}>Data Protection</strong>: The organizers will handle all personal data in accordance with applicable data protection laws. Applicants have the right to access and request the correction or deletion of their personal data.</li>
          </ol>
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


export default ModelForm;