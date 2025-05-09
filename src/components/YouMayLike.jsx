import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { json, Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
// import required modules
import { EffectCoverflow, Grid, Navigation, Pagination, Scrollbar, Virtual } from 'swiper/modules';
const Token = localStorage.getItem("JwtToken");
const API_URL = process.env.REACT_APP_API_URL;

function YouMayLike(props) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ID, setID] = useState(null);
  // setID(props.id);
  
const option1 = {
  headers: {
  'Authorization':`Bearer ${Token}`
  },
  };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/movies/${props.id}?populate[blocks][populate][movies][populate]=*`,option1);
        var responseData;
        if(response.data.data.attributes.blocks[0].movies.data){
           responseData = response.data.data.attributes.blocks[0].movies.data;
        }
        setRelatedMovies(responseData);
        // console.log("Related Movies", responseData);
        setLoading(false); // Set loading to false after data is fetched
        // setID();
        // window.location.reload();
      } catch (err) {
        console.error(err);
        setLoading(false); 
      }
    };
    useEffect(() => {
      fetchData();
      
  }, []); 


  
    return (
        <Container>
            <h1>You May Also Like  </h1>
            <Swiper
        modules={[ Navigation, Pagination,Grid]}
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={20}
        // pagination={{
        //   type: 'fraction',
        // }}
        breakpoints={{
          // when window width is <= 768px
          768: {
            slidesPerView: 6,
          },
        }}
        navigation={true}
      >
                {relatedMovies.map((movie) => {
                  if(movie){
                    return(
                      <SwiperSlide key={movie.id}>
                          <Link to={'/details/'+movie.id} onClick={() => {window.scrollTo(0, 0)}}  className="movie-link" >
                          <div className="movie-container">
                              <img src={`${API_URL}${movie.attributes.MoviePoster.data.attributes.url}`} alt="Img" id={movie.id}/>
                          <div className="overlay">
                              <p className="movie-name">{movie.attributes.MovieName}</p>
                          </div>
                          </div>
                          </Link>
                      </SwiperSlide>
                    )
                  }else{
                    return null;
                  }
                    })
                }
                 </Swiper>
        </Container>
    )
}

export default YouMayLike;

const Container = styled.div`
padding: 10px 30px;
margin-top:5%;
h1{
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  @media(max-width:768px){
    font-size:16px;
  }
}
`;

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