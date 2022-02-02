import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import StudentNavbar from '../../components/StudentNavbar'
import {Link,useNavigate} from 'react-router-dom'

import styled from 'styled-components'
import {Message,Inbox} from '@material-ui/icons'

const Container = styled.div` 
display:flex;
align-items:center;
justify-content:center;
width:100vw;
`
const Wrapper = styled.div` 
width:100%;
box-sizing:border-box;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

const Header = styled.h1` 
font:400 2rem;
padding:0.5vmax;
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;
border-bottom: 1px solid rgba(0, 0, 0, 0.158);
`

const ChatContainer = styled.div` 
display:flex;
align-items: center;
justify-content:space-between;
width:50%;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  border-bottom: 1px solid #0077b6;
`

const ChatButton = styled.button` 
margin-left:20px;
width:70px;
height:40px;
border:none;
border-radius:5px;
cursor:pointer;
background-color:#0077b6;
color:white;
`

const ChatImg = styled.img` 
width:40px;
height:40px;
border-radius:50%;
object-fit:cover;
margin-right:20px;
`
const ChatName = styled.span` 
font-weight: 500;
`



const StudentChats = () => {
    const student = useSelector((store) => store.student)
    //const navigate = useNavigate();
    
    return(
        <>
        <StudentNavbar/>
        <Container>
              <Wrapper>
              <Header>Messages</Header>
                  {
                      student.newerChats.map((res,index) => (
                          <ChatContainer key={index}>
                              <Message style={{height:"40px",width:"40px",color:"#0077b6",marginRight:"20px"}}/>
                              <ChatName>{res.senderName}</ChatName>
                              <Link to ={`/chat/${res.receiverRegistrationNumber}.${res.senderRegistrationNumber}`}>
                               <ChatButton>Chat</ChatButton>
                              </Link> 
                          </ChatContainer>
                      ))
                  }

                  {
student.previousChats.map((res,index) => (
    <ChatContainer key={index}>
        <Inbox style={{height:"40px",width:"40px",color:"#0077b6",marginRight:"20px"}}/>
        <ChatName>{res.receiverName}</ChatName>
        <Link to ={`/chat/${res.senderRegistrationNumber}.${res.receiverRegistrationNumber}`}>
            <ChatButton>Chat</ChatButton>
        </Link> 
    </ChatContainer>
))
                  }

                      
                  
              </Wrapper>
        </Container>
        </>
    )

}

export default StudentChats; 
