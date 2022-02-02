import React from 'react'
import styled,{keyframes} from 'styled-components'

const Wrapper = styled.div`
width:100vw;
height:100vh;
background-color:white;
display:grid;
place-items:center;
max-width:100%
`

const loading = keyframes` 
to{
    transform:rotateZ(-360deg);
}`

const Spinner = styled.div` 
width:10vmax;
height:10vmax; 
border-bottom:5px solid rgba(0,0,0,0.719);
border-radius:50%;
animation:${loading} 800ms linear infinite;
`

const Loader = () => {
    return(
        <Wrapper>
            <Spinner/>
        </Wrapper>
    )
}

export default Loader;