import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import './EventPartners.css';
import { Autoplay, Pagination } from 'swiper/modules';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default function EventPartners() {
  const [partners, setPartners] = useState([]);



  const getSponsors = async () => {
    if(partners){
      try {
        const res = await axios.get(`${API_URL}/api/event-partners?populate=*`);
        setPartners(res.data.data);
        // console.log('Success:', res.data.data);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }else{
      // console.log("No Partners found")
    }
  
  };

  useEffect(() => {
    getSponsors();
  }, []);

  return (
    <Container>
      <h1>
        EVENT PARTNERS <span>&#8702;</span>
      </h1>
      <Swiper
        // slidesPerView={6}
        spaceBetween={30}
        autoplay={{ delay: 500 }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper1"
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <PartnerLink href={partner.attributes.SponsorLink} target="_blank">
              <PartnerImage src={`${API_URL}${partner.attributes.Image.data.attributes.url}`} alt="Partner" />
              <p className="eventText">{partner.attributes.label}</p>
            </PartnerLink>
          </SwiperSlide>
        ))}
      </Swiper>
{/* <div className="marquee-container">
    <div className="marquee">
      {partners.map((partner) => (
        <div className="partnerSlider" key={partner.id}>
          <a href={`${partner.attributes.SponsorLink}`} target="_blank">
            <img src={`${API_URL}${partner.attributes.Image.data.attributes.url}`} alt="Img" id={partner.id}/>
          </a>
          <p className="eventText">{`${partner.attributes.label}`}</p>
        </div>
      ))}
    </div>
  </div> */}
    </Container>
  );
}

const Container = styled.div`
  h1 {
    padding: 10px 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;

    span {
      opacity: 0;
      font-size: 1.5rem;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      display: inline-block;
      transform: translateX(-25px);
    }

    &:hover {
      color: #e50914;
      span {
        opacity: 1;
        transform: translateX(5px);
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const PartnerLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const PartnerImage = styled.img`
  width: 100%;
  height: auto;
`;