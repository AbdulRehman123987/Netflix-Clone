import React from 'react'
import Styled from 'styled-components'
import { fetchDataByGenre } from '../store'
import { useDispatch } from 'react-redux'

function SelectGenre({genres,type}) {

    const dispatch=useDispatch()
  return (
    <>
    <Container className='flex' onChange={e=>{
        dispatch(fetchDataByGenre({genre:e.target.value,type}))
    }}>
        {
            genres.map((genre)=>{
                return(
                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                )
            })
        }
    </Container>
    </>
  )
}


const Container=Styled.select`
 margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`

export default SelectGenre