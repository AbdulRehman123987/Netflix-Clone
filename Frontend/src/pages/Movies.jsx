import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/Firebase.config.js'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getGenres } from '../store/index.js'
import Navbar from '../components/Navbar.jsx';
import NotAvailable from '../components/NotAvailable.jsx';
import SelectGenre from '../components/SelectGenre.jsx';
import Slider from '../components/Slider.jsx'

function Movies() {

    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false);

    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const movies = useSelector((state) => state.netflix.movies)
    const genres = useSelector((state) => state.netflix.genres)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "movies" }))
    }, [genresLoaded, dispatch])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (currentUser) navigate("/")
    })

    return (
        <>
            <Container>
                <div className="navbar">
                    <Navbar isScrolled={isScrolled} />
                </div>
                <div className="data">
                    <SelectGenre genres={genres} type="movie" />
                    {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
                </div>
            </Container>
        </>
    )
}


const Container = Styled.div`
.data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`

export default Movies