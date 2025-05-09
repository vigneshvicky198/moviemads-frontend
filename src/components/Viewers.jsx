import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";

const Viewers = (props) => {
  const vidRef = useRef();
  useEffect(() => {
    vidRef.current.play();
  }, []);
  return (
    <Container2>
      {/* <h1>SHORT FILM AWARDS <span>&#8702;</span> </h1> */}
    <Container>
      <Wrap>
        <h1>BEST DIRECTOR</h1>
        <video
          src="https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
          />
      </Wrap>
      <Wrap>
      <h1>BEST ACTOR</h1>
        <video
          src="https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
      <h1>BEST SCREENPLAY</h1>
        <video
          src="https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
        <h1>BEST STORY</h1>
        <video
          src="https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
      <h1>BEST ACTRESS</h1>
        <video
          src="https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
    </Container>
    </Container2>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    
  }

  h1{
    padding: 10px 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    @media(max-width:768px){
      font-size:16px;
    }
`;
const Container2 = styled.div`
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
    transform: translateX(-5px);
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

export default Viewers;
