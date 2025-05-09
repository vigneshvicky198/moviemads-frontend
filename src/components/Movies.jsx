import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
// import required modules
import {  Grid, Navigation, Pagination } from 'swiper/modules';
const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("JwtToken");
function Movies() {
  const [bytes, setBytes] = useState([]);
  const navigate = useNavigate();

  
const option1 = {
  headers: {
  'Authorization':`Bearer ${Token}`
  },
  };

  const getBytes = async() => {
    try{
      const res = await axios.get(`${API_URL}/api/director-bytes?populate[0]=byte.Thumbnail&populate[1]=byte.Poster`);
      setBytes(res.data.data);
      // console.log(res.data.data,'Bytes')
    }
    catch(err){
      console.error(err);
    }
  }
  useEffect(() => {
    getBytes();
  },[]);
  
    return (
        <Container>
            <div style={{display:'flex', justifyContent:"space-between"}}>
            <h1 onClick={() => { navigate("/blogs"); }}>BYTES <span>&#8702;</span></h1>
              </div>
            <Swiper
        modules={[ Navigation, Pagination,Grid]}
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={20}
        // pagination={{
        //   type: 'fraction',
        // }}
        breakpoints={{
          // when window width is <= 768px
          768: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
      >
                {bytes.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={'/blogs'} onClick={() => window.scrollTo(0, 0)} className="movie-link" >
                            <div className="movie-container">
                                <img src={`${API_URL}${movie.attributes.byte.data.attributes.Thumbnail.data.attributes.url}`} alt="Img" id={movie.id}/>
                            <div className="overlay">
                                <p className="movie-name">{movie.attributes.byte.data.attributes.caption}</p>
                            </div>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
                 </Swiper>
        </Container>
    )
}

export default Movies;

const Container = styled.div`
h1{
  padding: 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  span{
    opacity:0;
    font-size:1.5rem;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    display: inline-block;
    transform: translateX(-25px);
  }
  &:hover{
    color:#e50914;
    span{
        opacity:1;
    transform: translateX(5px);
      }
  }
}
  @media(max-width:768px){
    font-size:16px;
  }
}`;

const Content = styled.div`
cursor: pointer;
height: 90%;
width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    height: 100%;
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border-color: rgba(249, 249, 249, 0.8);
  }
`;