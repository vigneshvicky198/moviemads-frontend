import React from 'react'
import styled from 'styled-components'
import './TopNav.css'
import {  useNavigate } from 'react-router-dom'
import {  ConfigProvider, message, Modal, Typography } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';
const Token = localStorage.getItem("JwtToken");
const API_URL = process.env.REACT_APP_API_URL;
const { Text } = Typography;
const Topnav = () => {
  const [isParticipated,setIsParticipated] = useState(false);
  const [isPaid,setIsPaid] = useState(false);
  const [contestDetails,setContestDetails] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [price, setPrice] = useState(0);

  const option1 = {
    headers: {
    'Authorization':`Bearer ${Token}`
    },
    };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const user = localStorage.getItem("UserId");
  // console.log("userDetails",user);
  const getUserDetails  = async()=>{

    try{
      const response = await axios.get(`${API_URL}/api/users/${user}?populate=contest,contest.MovieThumbnail,contest.MoviePoster,contest.VideoFile`);
      if(response.data.contest){
        setIsParticipated(true);
        setContestDetails(response.data.contest);
        localStorage.setItem('formId',response.data.contest.id);
        if(response.data.contest.Payment=='Paid'){
          setIsPaid(true);
        }else{
          setIsPaid(false);
        }
        if(response.data.contest.MovieThumbnail && response.data.contest.MoviePoster && response.data.contest.VideoFile){
          // setIsUploaded(true);
          // console.log('uploaded')
          setIsParticipated(true);
        }else{
          // console.log('uploaded not')
          // setIsUploaded(false);
          setIsParticipated(false);
        }
      }
    }catch(err){
      console.error(err);
    }
  }
  useEffect(() => {
    getUserDetails();
  },[user]);


  const getAmount = async() =>{
    try{
      const res = await axios.get(`https://api.moviemads.com/api/price?populate=*`)
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
    e.preventDefault();
    try{
      const response = await axios.get(`${API_URL}/api/razorpay`,option1);
      const { data: order } = await axios.post(`${API_URL}/api/contests/${price}/create-order`, {} );
      // console.log(order,'order created');
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
            // console.log(Paymentresponse,'paym,enrsdasdas')
            const response = await axios.post( `${API_URL}/api/contests/${Paymentresponse.razorpay_payment_id}/${localStorage.getItem('formId')}/payment`,{},option1);
            handleFinish();
            window.location.href = "/"; // Navigate to the home page
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
    }catch(err){
      console.error(err);
    }
    }
    const handleFinish = () => {
      message.success('Form submitted successfully!');
    };
// console.log('Payment;',isPaid);
// return(
//  <Nav>
// <div className="marquee-containers">
//       <Text strong className="marquees">
//       Get ready for an exciting announcement: Moviemads 2024 Short Film Awards are coming soon! Prepare your best short films and stay tuned for more details!
//       </Text>
//     </div>
//     <button  onClick={showModal} class='glowing-btn'><span class='glowing-txt'>CONTEST</span></button>

//     <Modal className='antdmodal' open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
//       <h1 style={{ color: '#fff', textTransform: 'uppercase', textAlign: 'center' }}>
//         Get ready for an exciting announcement!
//       </h1>
//       <div className='awardvideo' style={{ display: 'flex', justifyContent: 'center'}}>
//         <ReactPlayer
//           url='https://api.moviemads.com/uploads/Trophy_FINAL_1_22da8deeae.mp4'
//           width='100%'
//           height='auto'
//           controls={false}
//           muted={true}
//           loop={true}
//           playing={true}
//         />
//       </div>
//       <div>
//         <p style={{ fontSize: '20px', color: '#fff', paddingBottom: '10px', textAlign: 'center' }}>
//           <span style={{ color: 'gold' }}>Moviemads</span> 2024 Short Film Awards are coming soon! Prepare your best short films and stay tuned for more details!
//         </p>
//       </div>
//     </Modal>
// </Nav>
// )}
  return !isParticipated?(
      <Nav>
        <div className="marquee-container">
      <Text strong className="marquees" style={{color:'white',textTransform:'uppercase'}}>
      Get ready for an exciting announcement: Moviemads 2025 Short Film Awards are coming soon! Prepare your best short films and stay tuned for more details!
      </Text>
    </div>
        {/* <button class="button-57" role="button" ><span class="text">Contest</span><span onClick={() => navigate("/contest")}>Apply Now</span></button>
         */}
{/* <button  onClick={() => navigate("/contest")} class='glowing-btn'><span class='glowing-txt'>CONTEST</span></button> */}
<button  onClick={() => navigate('/contest')} class='glowing-btn'><span class='glowing-txt'>CONTEST</span></button>
        </Nav>
  ):(
  
    <>
    {isPaid?(<Nav>
  <div className="marquee-container">
      <Text strong className="marquees" style={{color:'white',textTransform:'uppercase'}}>
      To know about your contest  participation, click the button on the right side to view more about the participation.
      </Text>
    </div>
    <button  onClick={showModal} class='glowing-btn'><span class='glowing-txt'>Info</span></button>
  </Nav>):(
    <Nav>
    <div className="marquee-container">
    <Text strong className="marquees" style={{color:'white',textTransform:'uppercase'}}>
    Secure your spot in the competition today! Your payment is still pending. Become one of our contestants by paying the registration fee. 
    </Text>
  </div>
  <button  onClick={showModal1} class='glowing-btn'><span class='glowing-txt'>Payment</span></button>
</Nav>)
}
  <>
  <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#ff0015',
          colorText: '#ffffff',
          colorIcon: '#ffffff',
        },
        components: {
          Modal: {
            colorPrimary: '#ff0015',
            contentBg:'#000',

          },
        },
      }}
    >
  <Modal   open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}
  
  >
    {isPaid?(<>
        <h1 style={{color:'#fff',textTransform:'uppercase',textAlign:'center'}}>Contest Details</h1>
        <div >
        <h2 style={{fontSize:'20px',color:'#fff'}}>Hi <span style={{fontWeight:'bold',color:'#daa520'}}>{contestDetails.UserName}</span>,</h2>
        <p style={{fontSize:'20px', color:'#fff', paddingBottom:'10px'}}>We are Happy to inform you that your movie has been successfully submitted. Your movie, titled "<span style={{fontWeight:'bold',color:'#daa520'}}>{contestDetails.MovieName}</span>" directed by <span style={{fontWeight:'bold',color:'#daa520'}}>{contestDetails.Directors}</span>, was submitted on <span style={{fontWeight:'bold',color:'#daa520'}}>{contestDetails.updatedAt.split('T')[0]}</span>.</p>
        <p style={{fontSize:'20px', color:'#fff', paddingBottom:'10px'}}>Further updates will be sent to your Gmail or Mobile Number once your movie has been shortlisted.</p>
        </div>
    </>):(
      <>
        <div >
      <h1 style={{color:'#fff',textTransform:'uppercase',textAlign:'center'}}>Payment Details</h1>
        <h2 style={{fontSize:'20px',color:'#fff'}}>Hi <span style={{fontWeight:'bold',color:'#daa520'}}>{contestDetails.UserName}</span>,</h2>
        <p style={{fontSize:'20px', color:'#fff', paddingBottom:'10px'}}>Your payment is still pending. Pay now to join the contest and compete with other contestants. To make the payment, click the 'Pay Now' button below.</p>
        <Button1 onClick={handlePayment}>Pay Now</Button1>
        </div>
      </>
    )}
      </Modal>
      </ConfigProvider>
  </>
  </>
  )
    }


export default Topnav;

const Nav = styled.div`
  height: 40px;
  background: linear-gradient(45deg, #e50914, #495057, #212529, #e50914);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 10s ease infinite;

  @-webkit-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 768px) {
    padding: 0 10px;
  }

  
`;
const Button1 = styled.button`
padding: 10px;
background-color: #ff0015;
color: #ffffff;
border-radius: 5px;
font-size: 15px;
// float:right;
font-weight: bold;
cursor: pointer;
@media (max-width: 768px) {
  font-size: 14px;
  margin-right: 10px;
padding: 5px;
}
`;