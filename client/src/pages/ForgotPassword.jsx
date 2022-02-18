import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import {useAlert} from 'react-alert'

import { getOTPStudent, submitOTPStudent } from '../redux/actions/studentAction'
import { getOTPFaculty, submitOTPFaculty } from '../redux/actions/facultyAction'

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

const ForgotPassword = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();

    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    
   
    const [error, setErrors] = useState({})
    const [helper,setHelper] = useState(false);

    useEffect(() => {
      setUser(params.user);
    },[user])


    useEffect(() => {
        if (store.student.flag) {
            setHelper(true)
        }
    },[store.student.flag])

    const sendOtpHandler = (e) => {
        e.preventDefault();
        if(user === "student")
        {
            dispatch(getOTPStudent({email}))
        }

        else if (user === "faculty") {
            dispatch(getOTPFaculty({email}))
         }
    }
    
    const submitOtpHandler = (e) => {
        e.preventDefault();  
        if (user === "student") {
            dispatch(submitOTPStudent({ email, otp, newPassword, confirmNewPassword }));
            alert.success("Please login with New Password");
            navigate('/');
        }
        else if (user === "faculty")
        {
            dispatch(submitOTPFaculty({ email, otp, newPassword, confirmNewPassword }));
            alert.success("Please login with New Password");
            navigate('/')
        }

    }

    return(
           <>
           {
               !helper?(
      <Container>
            <ProfileBox>
                <ProfileHeader>
                     Forgot Password
                </ProfileHeader>
                <ProfileForm encType='multiform/form-data' onSubmit={sendOtpHandler}>
                    <ProfileEmail>
                    <MailOutline/>
                        <ProfileInput type="text" placeholder="Email"  onChange = {(e) => setEmail(e.target.value)} required name="email" value={email}/>
                    </ProfileEmail>
                    <ProfileButton type="submit">
                        Submit
                    </ProfileButton>
                </ProfileForm>
            </ProfileBox>
        </Container>
               ):(
        <Container>
            <ProfileBox>
                <ProfileHeader>
                     Forgot Password
                </ProfileHeader>
                <ProfileForm encType='multiform/form-data' onSubmit={submitOtpHandler}>
                    <ProfilePhone>
                        <Phone/>
                        <ProfileInput type="text" placeholder="OTP" required  value={otp} onChange={(e) => setOtp(e.target.value)}/>
                    </ProfilePhone>
                    <ProfileName>
                        <SupervisorAccount/>
                        <ProfileInput type="password" placeholder="New Password" required  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </ProfileName>
                    <ProfileName>
                        <SupervisorAccount/>
                        <ProfileInput type="password" placeholder="Confirm New Password" required  value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </ProfileName>
                    <ProfileButton type="submit">
                        Submit
                    </ProfileButton>
                </ProfileForm>
            </ProfileBox>
        </Container>
               )
           }
           
           </>
    )
}

export default ForgotPassword;