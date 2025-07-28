import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase.config.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { removeMovieFromLiked } from "../store/index.js";
import { API_KEY, TMDB_BASE_URL } from "../utils/Constants.js";
import Player from "../pages/Player.jsx";

function Card({ movieData, isliked = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [movieUrl, setMovieUrl] = useState("");
  const [selectedMovieUrl, setSelectedMovieUrl] = useState("");

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("/api/auth/user/add", { email, data: movieData });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovieUrl = async (movieId) => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const video = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setMovieUrl(`https://www.youtube.com/watch?v=${video.key}`);
    return `https://www.youtube.com/watch?v=${video.key}`;
  };

  console.log(movieUrl);

  const handleMovieSelect = (movieUrl) => {
    setSelectedMovieUrl(movieUrl);
  };
  const handleMovieClick = async (movieId) => {
    const movieUrl = await fetchMovieUrl(movieId);
    handleMovieSelect(movieUrl);
    navigate("/player", { state: { movieUrl } });
  };

  return (
    <>
      <Container
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie"
        />
        {isHovered && (
          <div className="hover">
            <div className="image-video-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="movie"
                onClick={() => navigate("/player", { state: { movieUrl } })}
              />

              <video
                src={selectedMovieUrl}
                autoPlay
                loop
                muted
                onClick={() => navigate("/player", { state: { movieUrl } })}
              />
            </div>
            <div className="info-container flex column">
              <h3
                className="name"
                onClick={() => navigate("/player", { state: { movieUrl } })}
              >
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="play"
                    onClick={() => handleMovieClick(movieData.id)}
                  />
                  <RiThumbUpFill title="like" />
                  <RiThumbDownFill title="dislike" />
                  {isliked ? (
                    <BsCheck
                      title="Remove from list"
                      onClick={() =>
                        dispatch(
                          removeMovieFromLiked({ movieId: movieData.id, email })
                        )
                      }
                    />
                  ) : (
                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* {selectedMovieUrl && <Player url={selectedMovieUrl} />} */}
      </Container>
    </>
  );
}

const Container = Styled.div`
 max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;

export default Card;
