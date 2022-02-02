import React from 'react'
import styled from 'styled-components'
import {format} from 'timeago.js'

const MessageSent = styled.div` 
display: flex;
flex-direction: column;
margin-top: 20px;
align-items:flex-end;
`

const MessageReceived = styled.div` 
display: flex;
flex-direction: column;
margin-top: 20px;
`

const MessageTop = styled.div`
display:flex;
`

const MessageBottom = styled.div`
font-size: 12px;
margin-top: 10px;
`

const MessageText = styled.p` 
padding:10px;
border-radius:20px;
background-color:#0077b6;
color:white;
max-width:300px;
`

const MessageSentText = styled.p`
padding:10px;
border-radius:20px;
background-color:tomato;
color:white;
max-width:300px;
`

export default function({message,own}){
    const MessageFriend = () => {
        return(
            <MessageReceived>
                <MessageTop>
                    <MessageText>{message.message}</MessageText>
                </MessageTop>
                <MessageBottom>
                    {format(message.createdAt)}
                </MessageBottom>
            </MessageReceived>
        )
    }

    const MessageSelf = () => {
        return(
            <MessageSent>
                <MessageTop>
                    <MessageSentText>{message.message}</MessageSentText>
                </MessageTop>
                <MessageBottom>
                    {format(message.createdAt)}
                </MessageBottom>
            </MessageSent>
        )
    }

    return(
        <>
        {
            own?(
                <MessageSelf/>
            ):(
                <MessageFriend/>
            )
        }
        </>
    )
}