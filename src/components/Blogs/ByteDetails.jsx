import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Skeleton } from "antd";
import {StarOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import Footer from "../Footer/Footer";
function ByteDetails() {
const [details, setDetails] = useState(null); // Initialize details state as null
const [loading, setLoading] = useState(true); // Initialize loading state as true
const [showModal, setShowModal] = useState(false); // State to toggle modal
const [videoId, setVideoId] = useState(null); // State to store YouTube video ID
const { id } = useParams();
const [liked, setLiked] = useState(false);
const [likes, setLikes] = useState(0);
const [views, setViews] = useState(0);
const [rating, setRating] = useState(0);
const [movies, setMovies] = useState([]);
const API_URL = process.env.REACT_APP_API_URL;
const JWT = localStorage.getItem("User");
const Token = localStorage.getItem("JwtToken");
const UserId = localStorage.getItem("UserId");
const [refreshIsMovieLiked, setRefreshIsMovieLiked] = useState(false);

const option1 = {
headers: {
'Authorization':`Bearer ${Token}`
},
// httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
};




const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/reviews/${id}?populate=*`);
const responseData = response.data.data;
setDetails(responseData);
// console.log("response data", responseData);
setLikes(responseData.attributes.likes)
setLoading(false); // Set loading to false after data is fetched
} catch (err) {
console.error(err);
setLoading(false); // Set loading to false in case of error
}
};

useEffect(() => {
  fetchData();
}, [id]);



return (
<>
<Container>
{loading ? (
<Skeleton
avatar
paragraph={{
rows: 4,
}}
/>
) : (
<>
<Backdrop>
<img alt="Backdrop" src={`${API_URL}${details?.attributes.MovieThumbnail.data.attributes.url}`} />
<PlayButton onClick={handlePlayButtonClick}>
<img src="/images/play-icon-black.png" alt="" />
{/* <span>PLAY</span> */}
</PlayButton>
</Backdrop>

<DetailsContainer>
<Title>{details.attributes.MovieName} </Title>
<Lang>{details.attributes.Genres} | {details.attributes.Language}</Lang>
<ActorName><span ><StarOutlined /> Actors: </span> {details.attributes.Actors}</ActorName>
<ActorName><span><VideoCameraAddOutlined /> Director: </span>{details.attributes.Directors} </ActorName>
<Description>{details.attributes.Description} </Description>
</DetailsContainer>
</>
)}
</Container>
{showModal && < CustomModal API_URL={API_URL} details={details} onClose={closeModal} />}
<Footer/>
</>
);
}
export default ByteDetails;

const Container = styled.div`
display: flex;
justify-content: space-between;
padding: 5px 30px;
@media (max-width: 768px) {
flex-direction: column;
}
`;

const Backdrop = styled.div`
position: relative;
flex: 0 0 60%; /* Adjust as needed */
margin-right: 20px; /* Add some space between backdrop and details */
max-width: 60%;
max-height: 50vh;
@media (max-width: 768px) {
max-width: 100%;
max-height: 100%;
margin-right: 0px;
}
img {
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 12px;
}
`;

const PlayButton = styled.button`

position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
cursor: pointer;
background: rgba(255, 255, 255, 0.8);;
color: white;
border: none;
padding: 25px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 18px;

&:hover {
background: #ffffff;
}

@media (max-width: 768px) {
font-size: 12px;
padding: 12px;
}
&::after {
content: '';
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 0;
height: 0;
background-color: rgba(255, 255, 255, 0.3);
border-radius: 50%;
transition: width 0.3s, height 0.3s;
z-index: -1;
}

&:hover::after {
width: 200%;
height: 200%;
}

`;

const DetailsContainer = styled.div`
flex: 0 0 40%; /* Adjust as needed */
@media (max-width: 768px) {
margin-top: 20px;
font-size: 12px;
}
`;

const Title = styled.h2`
margin-bottom: 20px;
`;

const Description = styled.p`
line-height: 1.4;
`;
const ActorName = styled.p`
line-height: 1.4;
span {
font-weight: bold;
text-transform: uppercase;
color: #e50914;
}
`;
const Lang = styled.p`

font-weight: bold;
span {
font-weight: bold;
text-transform: uppercase;
}
`;

const ModalBackdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 10;
`;

const ModalContent = styled.div`
// width: 70%;
// z-index: 10;
@media (max-width: 768px) {
padding: 3px;
}
iframe {
width:750px;
height: 422px;
border-color: #e50914;
@media (max-width: 768px) {
width: 90vw;
height: 30vh;
object-fit: cover;
}
}
`;

const CloseButton = styled.button`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`;


const CustomModal = ({ onClose, API_URL, details }) => {

  const [loading, setLoading] = useState(false);
  
  const handleLoad = () => {
  setLoading(false);
  };
  
  return (
    <ModalBackdrop>
    <ModalContent>
    <Modal
    visible={true} // Ensure the modal is visible
    onCancel={onClose}
    style={{ objectFit: 'cover', justifyContent: 'center',alignItems: 'center'}}
    footer={null}
    width={800} // Adjust width as needed
    className="custom-modal"
    >
 {loading ? (
    <Skeleton active />
    ) : (
      <>
      {details?.attributes.VideoFile.data !== null && details?.attributes.VideoFile.data !== undefined ? (
        <video style={{ height: '100%', width: '100%' }} controls autoPlay loop>
          <source src={`${API_URL}${details?.attributes.VideoFile.data.attributes.url}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
      <iframe  src={details?.attributes.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      )}
      </>
    )}
    </Modal>
    </ModalContent>
    </ModalBackdrop>
  );
  };