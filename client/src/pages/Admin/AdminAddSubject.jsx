import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'

import {Class,Face,MailOutline,Phone,PhoneIphone,SupervisorAccount,CalendarToday,} from '@material-ui/icons'

const Container = styled.div`
width:100vw;
height:100vh;
max-width:100%;
display:flex;
justify-content:center;
align-items: center;
background-color:rgb(231,231,231);
`

const ProfileBox = styled.div` 
background-color:white;
width:25vw;
height:70vh;
box-sizing:border-box;
`

const ProfileHeader = styled.h1` 
text-align:center;
color:#0077b6;
font:400 1.3vmax;
padding:1.3vmax;
border-bottom:1px solid #0077b6;
width:50%;
margin:auto;
`

const ProfileForm = styled.form` 
display:flex;
flex-direction: column;
align-items:center;
justify-content:space-evenly;
margin: auto;
padding: 2vmax;
height: 70%;
>div{
    display:flex;
    align-items:center;
    width:100%;
}
`
const ProfileName = styled.div` 
>select{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width:100%;
    box-sizing:border-box;
    border:1px solid rgba(0,0,0,0.267);
    border-radius:4px;
    font:300 0.9vmax;
    outline:none;
};
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax;
}
`
const ProfileEmail = styled.div` 
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax;
}
`
const ProfilePhone = styled.div` 
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax;
}
`

const ProfileImage = styled.div` 
>img{
    width:3vmax;
    border-radius:100%;
    margin:1vmax;
}
>input{
    display:flex;
    padding:0%;
}
`
const ProfileInput = styled.input` 
padding:1vmax 4vmax;
padding-right:1vmax;
width:100%;
box-sizing:border-box;
border:1px solid #0077b6;
border-radius:4px;
font:300 0.9vmax;
outline:none;
`
const ProfileButton = styled.button` 
border:none;
background-color: #0077b6;
color:white;
font:300 0.9vmax;
width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  box-shadow:0 2px 5px rgba(0,0,0,0.219);
`

const AdminAddSubject = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [department,setDepartment] = useState("");
    const [year,setYear] = useState("");
    const [section,setSection] = useState("");
    const [studentMobileNumber, setMobileNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherMobileNumber] = useState('')
    const [error, setError] = useState({})

    return(
           <>
           <StudentNavbar/>
           <Container>
            <ProfileBox>
                <ProfileHeader>
                    Add Subject
                </ProfileHeader>
                <ProfileForm encType='multiform/form-data'>
                    <ProfileEmail>
                    <MailOutline/>
                        <ProfileInput type="text" placeholder="Subject Name" required name="email" value={email}/>
                    </ProfileEmail>
                    <ProfilePhone>
                        <Phone/>
                        <ProfileInput type="text" placeholder="Subject Code" required name="studentMobileNumber" value={studentMobileNumber}/>
                    </ProfilePhone>
                    <ProfileName>
                        <SupervisorAccount/>
                        <ProfileInput type="text" placeholder="Total Lectures" required name="fatherName" value={fatherName}/>
                    </ProfileName>
                    <ProfileName>
                        <Class/>
                        <select>
                            <option>C.S.E</option>
                            <option>I.T</option>
                            <option>Mechanical</option>
                            <option>Civil</option>
                            <option>E.C.E</option>
                        </select>
                    </ProfileName>
                    <ProfileButton type="submit">
                        Add Subject
                    </ProfileButton>
                </ProfileForm>
            </ProfileBox>
        </Container>
           </>
    )
}

export default AdminAddSubject;