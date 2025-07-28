import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/Firebase.config.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getGenres, getUsersLikedMovies } from '../store/index.js'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card';

function UserLiked() {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const movies = useSelector((state) => state.netflix.movies)

    const dispatch = useDispatch()

    useEffect(() => {
        if (email) {
            dispatch(getUsersLikedMovies(email))
        }
    }, [email])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email)
        else navigate("/login")
    })
    return (
        <>
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {
                        movies.map((movie,index)=>{
                            return <Card movieData={movie} index={index} key={movie.id} isliked={true}/>
                        })
                    }
                </div>
            </div>
        </Container>
        </>
    )
}

const Container = Styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`

export default UserLiked
