// import React from "react";
// import Styled from "styled-components";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import video from "../assets/video.mp4";
// import ReactPlayer from "react-player";
// import { useParams } from "react-router-dom";

// function Player({ url }) {
//   const location = useLocation();
//   const { movieUrl } = location.state || video;
//   const navigate = useNavigate();

//   console.log("Movie url ", movieUrl);

//   return (
//     <>
//       <Container>
//         <div className="player">
//           <div className="back">
//             <BsArrowLeft onClick={() => navigate(-1)} />
//           </div>
//           <video src={movieUrl} autoPlay loop controls muted></video>
//         </div>
//       </Container>
//     </>
//   );
// }

// const Container = Styled.div`
// .player {
//     width: 100vw;
//     height: 100vh;
//     .back {
//       position: absolute;
//       padding: 2rem;
//       z-index: 1;
//       svg {
//         font-size: 3rem;
//         cursor: pointer;
//       }
//     }
//     video {
//       height: 100%;
//       width: 100%;
//       object-fit: cover;
//     }
//   }
//     .player-wrapper {
//   position: relative;
//   padding-top: 56.25%; /* 16:9 Aspect Ratio */
// }

// .react-player {
//   position: absolute;
//   top: 0;
//   left: 0;
// }
// `;

// export default Player;

import React from "react";
import Styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import ReactPlayer from "react-player";

function Player() {
  const location = useLocation();
  const { movieUrl } = location.state || {};

  const navigate = useNavigate();

  console.log("Movie url", movieUrl);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            url={movieUrl}
            className="react-player"
            width="100%"
            height="100%"
            controls={true}
            playing={true}
          />
        </div>
      </div>
    </Container>
  );
}

const Container = Styled.div`
.player {
  width: 100vw;
  height: 100vh;
  position: relative;

  .back {
    position: absolute;
    padding: 2rem;
    z-index: 1;
    svg {
      font-size: 3rem;
      cursor: pointer;
    }
  }

  .player-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
}
`;

export default Player;
