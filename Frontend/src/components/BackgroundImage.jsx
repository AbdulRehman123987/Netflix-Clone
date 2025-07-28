import React from 'react'
import background from '../assets/login.jpg'
import Styled from 'styled-components'

function BackgroundImage() {
  return (
    <>
    <Container>
        <img src={background} alt="background"/>
    </Container>
    </>
  )
}


const Container=Styled.div`
height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
}
`

export default BackgroundImage
