import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {Person,Dashboard,Ballot,VpnKey,ExitToApp,Group} from '@material-ui/icons'
import styled from 'styled-components'
import {facultyLogout} from '../redux/actions/facultyAction'

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


const FacultyNavbar = () => {
    const faculty = useSelector((store) => store.faculty) 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const logoutHandler = () => {
      dispatch(facultyLogout());
      alert.success("Logged Out");
      navigate('/');
    }

    const home = () => {
      navigate('/faculty')
    }

    const updateProfile = () => {
      navigate('/faculty/update')
    }

    const updatePassword = () => {
      navigate('/faculty/updatePassword')
    }

    const marksList = () => {
      navigate('/faculty/marks')
    }

    const attendance = () => {
      navigate('/faculty/attendance')
    }



    return(
         <Container>
             <Wrapper>
                 <Left>
                     <Link to="/">
                         <Logo>ERP</Logo>
                     </Link>
                 </Left>
                 <Right>
                 <MenuItem>
                     {faculty && <img onClick={home} src={faculty.faculty.faculty.avatar.url} style={{height:"28px",width:"28px",borderRadius:"50%"}}/> }
                     </MenuItem>
                     <MenuItem>
                       <Person onClick={updateProfile} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Dashboard onClick={home} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <VpnKey onClick={updatePassword} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Group onClick={attendance} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Ballot onClick={marksList} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <ExitToApp onClick={logoutHandler} style={{color:"#0077b6"}}/>
                     </MenuItem>
                 </Right>
             </Wrapper>
         </Container>
    )
}

export default FacultyNavbar;