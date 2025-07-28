import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import Styled from 'styled-components'
import { firebaseAuth } from '../utils/Firebase.config.js'
import BackgroundImage from '../components/BackgroundImage.jsx';
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [formValue, setFormValues] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    setFormValues({
      ...formValue, [e.target.name]: e.target.value
    })
  }

  const handleLogIn = async () => {
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err) {
      console.log(err)
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")
  })

  return (
    <>
      <Container>
        <BackgroundImage />
        <div className="content">
          <Header />
          <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">
                <input type="email" name="email" placeholder='Email Address' value={formValue.email} onChange={(e) => handleChange(e)} />
                <input type="password" name="password" placeholder='Password' value={formValue.password} onChange={(e) => handleChange(e)} />
                <button onClick={handleLogIn}>Log In</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}


const Container = Styled.div`
position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`

export default Login

