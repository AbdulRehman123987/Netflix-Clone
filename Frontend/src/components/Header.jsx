import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import logo from '../assets/logo.png'

function Header(props) {
    const navigate=useNavigate()
  return (
    <>
    <Container className='flex a-center j-between'>
    <div className="logo">
        <img src={logo} alt="logo"/>
    </div>
    <button onClick={()=>navigate(props.login ? "/login":"/signup")}>{props.login ? "Log In" : "Signup"}</button>
    </Container>
    </>
  )
}


const Container=Styled.div`
padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    cursor:pointer;
  }
`

export default Header
