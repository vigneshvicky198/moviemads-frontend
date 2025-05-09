import React, { useState, useEffect } from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import VideoModal from '../VideoModal';
const API_URL = process.env.REACT_APP_API_URL;
const Footer = () => {
  const navigate = useNavigate();
  const [footers, setFooters] = useState(null);
  const [Logo, setLogo] = useState(null);

  const homePage = () => {
    navigate("/")
    window.scrollTo(0, 0);
  }
  const movieTrailer = () => {
    navigate("/movieTrailer")
    window.scrollTo(0, 0);
  }
  const shortFilms = () => {
    navigate("/shortFilms")
    window.scrollTo(0, 0);
  }
  const Blogs = () => {
    navigate("/blogs")
    window.scrollTo(0, 0);
  }
  const Reviews = () => {
    navigate("/reviews")
    window.scrollTo(0, 0);
  }
  const TandC = () => {
    navigate("/terms-and-conditions")
    window.scrollTo(0, 0);
  }
  const Contact = () => {
    navigate("/contact")
    window.scrollTo(0, 0);
  }


 useEffect(() => {
  const getFooter = async () => {
    try {
      // const res = await axios(`${API_URL}/api/footer?populate[0]=footer&populate[1]=footer.FooterLogo`);
      const res = await axios(`${API_URL}/api/footer?populate=footer.FooterLogo`);
      // console.log("Footer CHECK", res.data);
      setFooters(res.data.data.attributes.footer);
       setLogo(res.data.data.attributes.footer.FooterLogo.data.attributes.url);
    } catch (error) {
      console.error("Error fetching footer:", error);
    }
  };
  // console.log(footers,"footers")

  getFooter();
}, []);

  return (
    <>
<footer class="footer">
{footers && (
          <>
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About Moviemads</span> 
      {footers.About}
    </p>
    <div class="icons">
      <a href={footers.Facebook}><i class="fa fa-facebook"></i></a>
      <a href={footers.Instagram}><i class="fa fa-instagram"></i></a>
      <a href={footers.Youtube}><i class="fa-brands fa-youtube"></i></a>
      <a href={footers.Twitter}><i class="fa-brands fa-x-twitter"></i></a>
      <a href={footers.LinkiedIn}><i class="fa fa-linkedin"></i></a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
      <span className='contactInfo'>Contact Info</span> 
    <div style={{marginTop:'15px'}}>
      <i class="fa fa-map-marker"></i>
      <p><span> {footers.Address1}</span> {footers.Address2}</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+91) {footers.phone}</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p><a href="#"> {footers.Email}</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <img class="Footer-logo" src={`${API_URL}${Logo}`}/>
    <p class="menu">
      <a onClick={homePage}> Home</a>|<a onClick={movieTrailer}>Movie Trailers</a>|<a onClick={shortFilms}> Short Films</a>|<a onClick={Blogs}> Blogs</a>|<a onclick={Reviews}>Reviews</a>|<a onClick={TandC}> Terms and conditions</a>|<a onClick={Contact}>Contact</a>
    </p>
    <p class="name" >  &copy; 2024 All rights reserved by{' '}<span style={{fontWeight: "bold"}}><a style={{color: "#e50914",textDecoration: "none",fontWeight: "bold"}} href='https://dreamzmedia.in/'>DREAMZMEDIA</a></span></p>
    <br/>
    <p class="name">  Designed By{' '}<span ><a style={{color: "#e50914", textDecoration: "none",fontWeight: "bold"}} href='http://www.jgntechnologies.com/'>JGN TECHNOLOGIES</a></span></p>
  </div>
  </>)}
</footer>
    </>
  )
}

export default Footer;