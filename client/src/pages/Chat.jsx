import React,{useRef,useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useAlert} from 'react-alert'


import {sendMessage,getPrivateConversation,getPrivateConversation2} from '../redux/actions/studentAction'

import io from 'socket.io-client'
import {useNavigate,useParams} from 'react-router-dom'
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

const Chat = ({match}) => {

    const student = useSelector((store) => store.student)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const scrollRef = useRef();
    const alert = useAlert();

    const [room1, setRoom1] = useState("")
    const [room2, setRoom2] = useState("")
    const [receiverRegistrationNumber, setReceiverRegistrationNumber] = useState("")
    const [message, setMessage] = useState("")
    const [messageArray, setMessageArray] = useState([])
    const [olderMessages, setOlderMessages] = useState([])

    const socketUrl = "http://localhost:3000"

    
    useEffect(() => {
       // console.log(params);
        let temp = params.room;
        socket = io(socketUrl);
        let tempArr = temp.split(".");
        setReceiverRegistrationNumber(tempArr[1]);
        setRoom1(temp)
        swap(tempArr, 0, 1)
        let tempRoom2 = tempArr[0] + '.' + tempArr[1];
        setRoom2(tempRoom2);
      
    },[socketUrl,params.room])

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
            socket.disconnect();
            socket.off();
        }
    },[room1,room2])

    useEffect(() => {
        socket.on("new Message", (data) => {
            setOlderMessages(student.privateChat)
            setMessageArray([...messageArray, data])
        })
        
    },[messageArray,olderMessages]);

    const formHandler = (e) => {
        e.preventDefault();
        if(message.trim().length > 0)
        {
            socket.emit("private message",{
                sender:student.student.student.name,
                message,
                room:room1
            })
            setMessage("");
            let messageObj = {
                roomId:room1,
                senderName:student.student.student.name,
                senderId:student.student.student._id,
                message,
                senderRegistrationNumber: student.student.student.registrationNumber,
                receiverRegistrationNumber
            }
            dispatch(sendMessage(room1,messageObj))
        }else
        {
            alert.error("Message cannot be empty")
        }
    }
    

    /*
    const messages = [
        {message:"New Message",senderRegistrationNumber:"STU202205001"},
        {message:"New Message",senderRegistrationNumber:"STU202205000"},
        {message:"New Message",senderRegistrationNumber:"STU202205001"},
        {message:"New Message",senderRegistrationNumber:"STU202205000"},
    ]
    */

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
                    student.privateChat.map((obj,index) => (
                       
                           <Message key={index} message={obj} own={obj.senderRegistrationNumber === student.student.student.registrationNumber}/>
                        
                    ))
                  }
                  {
                      messageArray.map((obj,index) => (
                          <Message key={index} message={obj} own/>
                      ))
                  }
                    </ChatMessages>
                    <ChatBottom>
                        <ChatMessageInput type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message..." />
                        <ChatSubmitButton onClick={formHandler}>Send</ChatSubmitButton>
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