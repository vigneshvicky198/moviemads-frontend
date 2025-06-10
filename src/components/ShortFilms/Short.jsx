import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { InfoCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { message, Card, Row, Col } from 'antd';

const { Meta } = Card;

const API_URL = process.env.REACT_APP_API_URL;

function ShortFilmGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const getShortFilms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/shortfilm-uploads?populate=*`);
      setMovies(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching short films:", error);
      message.error("Failed to load short films");
      setLoading(false);
    }
  };

  useEffect(() => {
    getShortFilms();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Short Films</h2>
      <a href="/shortfilmuploadForm">
        <button>Upload</button>
      </a>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row gutter={[16, 16]}>
          {movies.map((movie) => (
            <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
              <div
                onMouseEnter={() => setHoveredCard(movie.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  hoverable
                  cover={
                    hoveredCard === movie.id ? (
                      <video
                        autoPlay
                        muted
                        loop
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      >
                        <source
                          src={
                            movie.attributes.VideoFile?.data?.[0]?.attributes?.url
                              ? `${API_URL}${movie.attributes.VideoFile.data[0].attributes.url}`
                              : ''
                          }
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <img
                        alt={movie.attributes.MovieName}
                        src={
                          movie.attributes.MovieThumbnail?.data?.attributes?.url
                            ? `${API_URL}${movie.attributes.MovieThumbnail.data.attributes.url}`
                            : 'https://via.placeholder.com/300x169'
                        }
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )
                  }
                  actions={[
                    <Link to={`/shortflimDetails/${movie.id}`}>
                      <PlayCircleFilled key="play" /> Play
                    </Link>,
                    <Link to={`/shortflimDetails/${movie.id}`}>
                      <InfoCircleFilled key="info" /> Details
                    </Link>,
                  ]}
                >
                  <Meta
                    title={movie.attributes.MovieName}
                    description={
                      <>
                        <div>Language: {movie.attributes.Language}</div>
                        <div>Genre: {movie.attributes.Genres}</div>
                        <div>Duration: {movie.attributes.Duration} mins</div>
                      </>
                    }
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ShortFilmGrid;