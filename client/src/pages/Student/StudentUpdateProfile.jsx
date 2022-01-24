import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import styled from 'styled-components'

import {MailOutline,Phone,PhoneIphone,SupervisorAccount} from '@material-ui/icons'

import StudentNavbar from '../../components/StudentNavbar'

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
const StudentUpdateProfile = () => {
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [fatherName,setFatherName] = useState("");
    const [fatherMobile,setFatherMobile] = useState("");
    const [avatar,setAvatar] = useState("/Profile.png");
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const imageHandler = (e) => {
        if(e.target.files && e.target.files[0])
        {
            let img = e.target.files[0];
            setAvatar(img);
            setAvatarPreview(img);
        }
    }

    const fileHandler = async(e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("studentMobileNumber",mobile);
        myForm.append("email",email);
        myForm.append("fatherName",fatherName);
        myForm.append("fatherMobileNumber",fatherMobile);
        myForm.append("avatar",avatar);
    }

    return(
        <>
        <StudentNavbar/>
        <Container>
            <ProfileBox>
                <ProfileHeader>
                    Update Profile
                </ProfileHeader>
                <ProfileForm encType='multiform/form-data'>
                    <ProfileEmail>
                    <MailOutline/>
                        <ProfileInput type="text" placeholder="Email" required name="email" value={email}/>
                    </ProfileEmail>
                    <ProfilePhone>
                        <Phone/>
                        <ProfileInput type="text" placeholder="Student Mobile" required name="studentMobileNumber" value={mobile}/>
                    </ProfilePhone>
                    <ProfileName>
                        <SupervisorAccount/>
                        <ProfileInput type="text" placeholder="Father Name" required name="fatherName" value={fatherName}/>
                    </ProfileName>
                    <ProfilePhone>
                        <PhoneIphone/>
                        <ProfileInput type="text" placeholder="Father Mobile" required name="fatherMobileNumber" value={fatherMobile}/>
                    </ProfilePhone>
                    <ProfileImage>
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input type="file" name="avatar" accept="image/*" onChange={imageHandler}/> 
                    </ProfileImage>
                    <ProfileButton type="submit">
                        Update Profile
                    </ProfileButton>
                </ProfileForm>
            </ProfileBox>
        </Container>
        </>
    )
}

export default StudentUpdateProfile;