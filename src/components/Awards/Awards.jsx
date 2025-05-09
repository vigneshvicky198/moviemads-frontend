import Footer from '../Footer/Footer';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import './Awards.css'
import Topnav from '../TopNav/Topnav';
import Header from '../Header';



const Awards = () => {

  const [elements, setElements] = useState([]);
  const [elements1, setElements1] = useState([]);
  const [elements2, setElements2] = useState([]);
  const [elements3, setElements3] = useState([]);
  useEffect(() => {
    // Define your elements
    const originalElements = [
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196870/Awards/VISUAL_EFFECTS_fybhgo.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196869/Awards/SUPPORTING_ACTRESS_tijn5p.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196869/Awards/SUPPORTING_ACTOR_l0odjp.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196866/Awards/SOUND_DESIGN_bljlol.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196866/Awards/SCREEN_PLAY_zy6e9x.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196864/Awards/SCI-FI_ndzha0.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196863/Awards/PRODUCTION_TEAM_yqs3vh.jpg" alt="Img" />
            </a>
        </div>,
    ]

    // Duplicate the original elements and append them to the end
    const duplicatedElements = [...originalElements, ...originalElements];
    setElements(duplicatedElements);
}, []);

  useEffect(() => {
    // Define your elements
    const originalElements1 = [
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196863/Awards/ORIGINAL_SCORE_p3iqxr.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196834/Awards/NARATION_jfhbih.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196832/Awards/Makeup_Artist_ks1xfh.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196831/Awards/Female_Film_clye3f.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196829/Awards/Environmental_Film_dppebr.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196828/Awards/DRAMASHOT_lvnk94.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196825/Awards/DOCUMENTARY_wffmu6.jpg" alt="Img" />
            </a>
        </div>,
    ]

    // Duplicate the original elements and append them to the end
    const duplicatedElements1 = [...originalElements1, ...originalElements1];
    setElements1(duplicatedElements1);
}, []);

useEffect(() => {
    // Define your elements
    const originalElements1 = [
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196824/Awards/DIRECTOR_qsd5xo.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196824/Awards/CREW_ca2pkv.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196824/Awards/COSTUME_DESIGNER_qmpxaw.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/COMEDIAN_dkvt1l.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196829/Awards/Environmental_Film_dppebr.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/art_qvuqmq.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/Co-Actor_rclhks.jpg" alt="Img" />
            </a>
        </div>,
    ]

    // Duplicate the original elements and append them to the end
    const duplicatedElements1 = [...originalElements1, ...originalElements1];
    setElements2(duplicatedElements1);
}, []);


useEffect(() => {
    // Define your elements
    const originalElements1 = [
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/cinematography_bu19y4.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/Animation_xkr4zo.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/Child_Artist_dxher7.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196819/Awards/CASTING_fnsixl.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196818/Awards/Actor_br7smh.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196818/Awards/ACTRESS_lzef5o.jpg" alt="Img" />
            </a>
        </div>,
        <div className="partnerSlider">
            <a>
                <img src="https://res.cloudinary.com/dx78kzenz/image/upload/v1714196867/Awards/STUNT_wwwt2l.jpg" alt="Img" />
            </a>
        </div>,
    ]

    // Duplicate the original elements and append them to the end
    const duplicatedElements1 = [...originalElements1, ...originalElements1];
    setElements3(duplicatedElements1);
}, []);


  return (
    <>
    <Topnav/>
    <Header/>
   <Container>
   <h1 className='contest-heading'>CATEGORIES OF AWARD</h1>
   <div className="marquee-container">
            <div className="marquee">
                {elements3.map((element, index) => (
                    <React.Fragment key={index}>
                        {element}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div style={{marginBottom:'20px'}}> </div>
   <div className="marquee-container1">
            <div className="marquee1">
                {elements2.map((element, index) => (
                    <React.Fragment key={index}>
                        {element}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div style={{marginBottom:'20px'}}> </div>
   <div className="marquee-container">
            <div className="marquee">
                {elements1.map((element, index) => (
                    <React.Fragment key={index}>
                        {element}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div style={{marginBottom:'20px'}}> </div>
   <div className="marquee-container1">
            <div className="marquee1">
                {elements.map((element, index) => (
                    <React.Fragment key={index}>
                        {element}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div style={{marginBottom:'20px'}}> </div>

   </Container>
<Footer/>
   </>
  )
}

export default Awards

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
  h1{
  }
  @media (max-width: 768px){
    min-height: 100%;
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
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

  h1{
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    text-align: center;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    padding:0;
    text-align:center;
    margin:0;
    color:#daa520 ;
    bottom: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -20%);
   font-size:28px;

   text-shadow: 0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e;

   font-weight:bold;
    @media (max-width: 1250px) {
      font-size: 45px;
      @media (max-width: 468px) {
        font-size: 18px;
      }
    }
  }
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    h1{
      display: none;
    }
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    video {
      opacity: 1;
    }
  }
`;