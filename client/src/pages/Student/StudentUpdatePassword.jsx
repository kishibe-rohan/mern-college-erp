import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'
import {VpnKey,Lock,LockOpen} from '@material-ui/icons'
import { studentUpdatePassword,studentLogout } from '../../redux/actions/studentAction'


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
const ProfilePass = styled.div` 
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax;
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

const StudentUpdatePassword = () => {
    const student = useSelector((store) => store.student)
    const store = useSelector((store) => store);
    const navigate = useNavigate('/');
    const dispatch = useDispatch();
    const alert = useAlert();

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const [error, setError] = useState({})

    const formHandler = async(e) => {
        e.preventDefault();
        dispatch(studentUpdatePassword({oldPassword,newPassword,confirmNewPassword,registrationNumber:student.student.student.registrationNumber}))
        alert.success("Password Updated Successfully..Please Login Again");
        dispatch(studentLogout());
    }

   
    return(
        <>
        {
            student.isAuthenticated?(
                <>
                <StudentNavbar/>
                <Container>
                    <ProfileBox>
                        <ProfileHeader>
                            Update Password
                        </ProfileHeader>
                        <ProfileForm encType='multiform/form-data' onSubmit={formHandler}>
                            <ProfilePass>
                                <VpnKey/>
                                <ProfileInput type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} required name="oldPassword" value={oldPassword}/>
                            </ProfilePass>
                            <ProfilePass>
                                <Lock/>
                                <ProfileInput type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} required name="newPassword" value={newPassword}/>
                            </ProfilePass>
                            <ProfilePass>
                                <LockOpen/>
                                <ProfileInput type="password" placeholder="Confirm Password" onChange={(e) => setConfirmNewPassword(e.target.value)} required name="confirmNewPassword" value={confirmNewPassword}/>
                            </ProfilePass>
                            <ProfileButton type="submit">
                                Update Password
                            </ProfileButton>
                        </ProfileForm>
                    </ProfileBox>
                </Container>
                </>
            ):(
                navigate("/")
            )
        }
     </>  
    )
}

export default StudentUpdatePassword;
