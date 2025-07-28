import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Netflix from "./pages/Netflix.jsx";
import Signup from "./pages/Signup.jsx";
import Player from "./pages/Player.jsx";
import Movie from "./pages/Movies.jsx";
import TvShows from "./pages/TvShows.jsx";
import UserLiked from "./pages/UserLiked.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/player" element={<Player />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/tvShows" element={<TvShows />} />
          <Route path="/mylist" element={<UserLiked />} />
          <Route path="/" element={<Netflix />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
