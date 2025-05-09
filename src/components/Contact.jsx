import { Button, ConfigProvider, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import Footer from "./Footer/Footer";
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
const API_URL = process.env.REACT_APP_API_URL;
const Contact = () => {
    
    const [name, setYourName] = useState('');
    const [mobile, setMobile] = useState('');
    const [form] = Form.useForm();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case "name":
            setYourName(value);
            break;
          case "mobileNumber":
            setMobile(value);
            break;
          case "emailId":
            setEmail(value);
            break;
          case "messages":
            setMessage(value);
            break;
          default:
            break;
        }
    }
    
    const handleSubmit = async() => {
        try{
            const values = await form.validateFields();
            const response = await axios.post(`${API_URL}/api/contacts`,{
                data:{
                    Name:values.name,
                    MobileNumber:values.mobileNumber,
                    Email:values.emailId,
                    Message:values.messages
                }
            });
        }
        catch (err) {
            console.error(err);
        }
        window.location.href=('/')
    }
  return (
    <div className="container">
    <h1 className='contest-heading'>CONTACT US</h1>
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
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="form-container"
          >
            <div  className='Two input'>
            <Form.Item
              label="Your Name"
              name="name"
              rules={[{ required: true, message: 'Please Enter Your Name!' }]}
              className="input-container"
              // initialValue={yourName}
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true, message: 'Please Enter Mobile Number!' },{pattern: /^[0-9]{10}$/, message: 'Please Enter Valid Mobile Number!' }]} 
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              <Form.Item
              label="Email"
              name="emailId"
              rules={[{ required: true, message: 'Please Enter Email ID!' }]} 
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
              {/* <div className='Two input'> */}
              <Form.Item
              label="Your Message"
              name='messages'
              rules={[{ required: true, message: 'Please Describe your Message!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
          <TextArea rows={6}   />
            </Form.Item>
            <div style={{marginBottom:'10px'}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.763101173865!2d80.21206527491977!3d13.050745687271935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e94571bb8b%3A0x5e4eab3021eae855!2sdreamzmedia!5e0!3m2!1sen!2sus!4v1714460690513!5m2!1sen!2sus" frameborder="0" style={{border:'0', width: '100%', height:'300px'}} allowfullscreen></iframe>
                </div>
            <Button type="primary" style={{float: 'right'}} htmlType='submit'>
             SUBMIT
           </Button>
              </Form>
    </ConfigProvider>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact