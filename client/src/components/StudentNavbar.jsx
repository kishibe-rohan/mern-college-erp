import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {Person,Dashboard,Ballot,VpnKey,ExitToApp,Group,ChatBubble,Chat} from '@material-ui/icons'
import styled from 'styled-components'

import {studentLogout,newerChats,previousChats} from '../redux/actions/studentAction'

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
};
`


const StudentNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const alert = useAlert();
  
    const student = useSelector((store) => store.student)
    
    useEffect(() => {
      if(student.student.student.name)
      {
        nameHandler();
      }
    },[student.student.student.name])

    useEffect(() => {
      dispatch(newerChats(student.student.student.name));
      dispatch(previousChats(student.student.student.name));
    },[student.newerChats.length])

    const logoutHandler = () => {
      dispatch(studentLogout());
      navigate('/');
      alert.success("Student Logout Successful");
    }

    const nameHandler = () => {
      setName(student.student.student.name)
    }

    const home = () => {
      navigate('/home')
    }

    const updateProfile = () => {
      navigate('/student/update')
    }

    const updatePassword = () => {
      navigate('/student/updatePassword')
    }

    const subjectList = () => {
      navigate('/student/subjects')
    }

    const marksList = () => {
      navigate('/student/performance')
    }

    const attendance = () => {
      navigate('/student/attendance')
    }

    const chatList = () => {
      navigate('/student/search')
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
                     {student && <img onClick={home} src={student.student.student.avatar.url} style={{height:"28px",width:"28px",borderRadius:"50%"}}/> }
                     </MenuItem>
                     <MenuItem>
                       <Person onClick={updateProfile} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Dashboard onClick={marksList} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <VpnKey onClick={updatePassword} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Group onClick={attendance} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       <Ballot onClick={subjectList} style={{color:"#0077b6"}}/>
                     </MenuItem>
                     <MenuItem>
                       {
                         student.newerChats.length > 0 ? (
                          <Chat onClick={chatList} style={{color:"#0077b6"}}/>
                         ):(
                          <ChatBubble onClick={chatList} style={{color:"#0077b6"}}/>
                         )
                       }
                     </MenuItem>
                     <MenuItem>
                       <ExitToApp onClick={logoutHandler} style={{color:"#0077b6"}}/>
                     </MenuItem>
                 </Right>
             </Wrapper>
         </Container>
    )
}

export default StudentNavbar;