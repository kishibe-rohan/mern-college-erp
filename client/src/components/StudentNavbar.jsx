import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import {Person,Dashboard,Ballot,VpnKey,ExitToApp,Group} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
 width:100vw;
 display:flex;
 border-bottom:0.5px solid #0077b6;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 20px;
background-color:white;
width:100%;
`

const Left = styled.div` 
flex:1;
display:flex;
align-items:center;
>a{
  text-decoration:none;
}
`

const Logo = styled.h1`
font-weight:bold;
color:#0077b6;
cursor:pointer;
`

const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
`

const MenuItem = styled.div` 
font-size:14px;
cursor:pointer;
margin-left:25px;
a{
    text-decoration:none;
    color:white;
}
`


const StudentNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    return(
         <Container>
             <Wrapper>
                 <Left>
                     <Link to="/">
                         <Logo>STUDENT</Logo>
                     </Link>
                 </Left>
                 <Right>
                     <MenuItem>
                       <Person style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Dashboard style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <VpnKey style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Group style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Ballot style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <ExitToApp style={{color:"#0077b6"}}/>
                     </MenuItem>
                 </Right>
             </Wrapper>
         </Container>
    )
}

export default StudentNavbar;