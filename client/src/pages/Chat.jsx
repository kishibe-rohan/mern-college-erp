import React,{useRef,useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {sendMessage,getPrivateConversation,getPrivateConversation2} from '../redux/actions/studentAction'

import io from 'socket.io-client'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import StudentNavbar from '../components/StudentNavbar'
import Message from '../components/Message'

const Container = styled.div` 
display:flex;
width:100vw;
height:100vh;
`
const ChatContainer = styled.div` 
display:flex;
width:100%;
align-items:center;
justify-content:center;
background-color:lightgrey;
`

const Wrapper = styled.div` 
padding: 10px;
height: 95%;
display:flex;
flex-direction: column;
  justify-content: space-between;
  width:80%;
  border-radius:10px;
  background-color:white;
`

const ChatMessages = styled.div`
height:100%;
overflow-y:scroll;
padding-right:10px;
`

const ChatBottom = styled.div` 
margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ChatMessageInput = styled.textarea`
width:80%;
height:70px;
padding:10px;
border-radius:20px;
`
const ChatSubmitButton = styled.button`
width:100px;
height:40px;
border:none;
border-radius:5px;
cursor:pointer;
background-color:#0077b6;
color:white;
`



//Swap utility function
function swap(input,a,b){
    var temp = input[a];
    input[a] = input[b];
    input[b] = temp;
}

let socket;

const Chat = (props) => {

    const student = useSelector((store) => store.student)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const [room1, setRoom1] = useState("")
    const [room2, setRoom2] = useState("")
    const [receiverRegistrationNumber, setReceiverRegistrationNumber] = useState("")
    const [message, setMessage] = useState("")
    const [messageArray, setMessageArray] = useState([])
    const [olderMessages, setOlderMessages] = useState([])

    const socketUrl = "http://localhost:5000"

    /*
    useEffect(() => {
        console.log(props);
        let temp = props.match.params.room;
        socket = io(socketUrl);
        let tempArr = temp.split(".");
        setReceiverRegistrationNumber(tempArr[0]);
        setRoom1(temp)
        swap(tempArr, 0, 1)
        let tempRoom2 = tempArr[0] + '.' + tempArr[1];
        setRoom2(tempRoom2);
       // setReceiverRegistrationNumber
    },[socketUrl,props.match.params.room])

    useEffect(() => {
        dispatch(getPrivateConversation(room1));
        dispatch(getPrivateConversation2(room2));
        socket = io(socketUrl);
        socket.emit('join room',{
            room1,
            room2
        })

        socket.on('new Message',(data) => {
            setMessageArray([...messageArray,data])
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[room1,room2])

    useEffect(() => {
        socket.on("new Message", (data) => {
            setOlderMessages(student.privateChat)
            setMessageArray([...messageArray, data])
        })
        
    },[messageArray,olderMessages])
    */

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messageArray])

    const messages = [
        {message:"New Message",senderRegistrationNumber:"STU202205001"},
        {message:"New Message",senderRegistrationNumber:"STU202205000"},
        {message:"New Message",senderRegistrationNumber:"STU202205001"},
        {message:"New Message",senderRegistrationNumber:"STU202205000"},
    ]

    return(
        <>
        {
            student.isAuthenticated?(
                <>
  <StudentNavbar/>
        <Container>
            <ChatContainer>
                <Wrapper>
                    <ChatMessages>
                  {
                    messages.map((obj,index) => (
                        <div ref={scrollRef}>
                           <Message message={obj} own={obj.senderRegistrationNumber === student.student.student.registrationNumber}/>
                        </div>
                    ))
                  }
                    </ChatMessages>
                    <ChatBottom>
                        <ChatMessageInput placeholder="Write a message..." />
                        <ChatSubmitButton>Send</ChatSubmitButton>
                    </ChatBottom>
                </Wrapper>
            </ChatContainer>
            </Container>
                </>
            ):(
                navigate('/')
            )
        }
        </>
    )
}

export default Chat;