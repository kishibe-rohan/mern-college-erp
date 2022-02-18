import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import {PersonAdd,LibraryAdd, HowToReg,Person,ExitToApp,Group,LibraryBooks} from '@material-ui/icons'
import styled from 'styled-components'

import {adminLogout} from '../redux/actions/adminAction'

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


const AdminNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const logoutHandler = () => {
      dispatch(adminLogout());
      alert.success("Logged Out");
      navigate('/admin/login');
    }

    const home = () => {
      navigate('/admin')
    }

    const AddStudent = () => {
      navigate('/admin/add/students')
    }

    const AddFaculty = () => {
      navigate('/admin/add/faculties')
    }

    const AddSubject = () => {
      navigate('/admin/add/subjects')
    }

    const GetStudent = () => {
      navigate('/admin/students')
    }

    const GetFaculty = () => {
      navigate('/admin/faculties')
    }

    const GetSubject = () => {
      navigate('/admin/subjects')
    }

    


    return(
         <Container>
             <Wrapper>
                 <Left>
                     <Link to="/admin">
                         <Logo>ERP</Logo>
                     </Link>
                 </Left>
                 <Right>
                     <MenuItem onClick={AddStudent}>
                       <PersonAdd style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={AddFaculty}>
                       <HowToReg style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={AddSubject}>
                       <LibraryAdd style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={GetStudent}>
                       <Person style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={GetFaculty}>
                       <Group style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={GetSubject}>
                       <LibraryBooks style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem onClick={logoutHandler}>
                       <ExitToApp style={{color:"#0077b6"}}/>
                     </MenuItem>
                 </Right>
             </Wrapper>
         </Container>
    )
}

export default AdminNavbar;