import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom'

import AdminNavbar from '../../components/AdminNavbar'
import styled from 'styled-components'

import {Face,Class,MailOutline,Phone,PhoneIphone,SupervisorAccount,CalendarToday,} from '@material-ui/icons'
import { adminAddFaculty } from '../../redux/actions/adminAction'

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
width:50vw;
height:90vh;
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
width:70%;
>div{
    display:flex;
    align-items:center;
    width:100%;
    margin-bottom:10px;
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
  margin-top:15px;
`

const AdminAddFaculty = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [department,setDepartment] = useState("");
    const [designation,setDesignation] = useState("");
    const [facultyMobileNumber, setFacultyMobileNumber] = useState('')
    const [error, setError] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const admin = useSelector((store) => store.admin);


    const formHandler = (e) => {
        e.preventDefault();
    
        dispatch(adminAddFaculty({name,designation,department,facultyMobileNumber,email}));
        alert.success("Faculty Registration Successful");
        navigate('/admin/faculties');
    }
   
    return(
        <>
        {
          admin.isAuthenticated?(
            <>
            <AdminNavbar/>
            <Container>
             <ProfileBox>
                 <ProfileHeader>
                    Add Faculty
                 </ProfileHeader>
                 <ProfileForm encType='multiform/form-data' onSubmit={formHandler}>
                   <ProfileName>
                         <Face/>
                         <ProfileInput type="text" onChange = {(e) => setName(e.target.value)} placeholder="Faculty Name" required name="name" value={name}/>
                     </ProfileName>
                     <ProfileEmail>
                     <MailOutline/>
                         <ProfileInput type="text" onChange = {(e) => setEmail(e.target.value)} placeholder="Email" required name="email" value={email}/>
                     </ProfileEmail>
                     <ProfilePhone>
                         <Phone/>
                         <ProfileInput type="text" placeholder="Mobile" onChange = {(e) => setFacultyMobileNumber(e.target.value)}  required name="facultyMobileNumber" value={facultyMobileNumber}/>
                     </ProfilePhone>
                     <ProfileName>
                         <Class/>
                         <select onChange = {(e) => setDepartment(e.target.value)}>
                             <option>Department</option>
                             <option value="C.S.E">C.S.E</option>
                             <option value="I.T">I.T</option>
                             <option value="Mechanical">Mechanical</option>
                             <option value="Civil">Civil</option>
                             <option value="E.C.E">E.C.E</option>
                         </select>
                     </ProfileName>
                     <ProfileName>
                         <SupervisorAccount/>
                         <ProfileInput onChange = {(e) => setDesignation(e.target.value)} type="text" placeholder="Designation" required name="designation" value={designation}/>
                     </ProfileName>
                     <ProfileButton type="submit">
                         Add Faculty
                     </ProfileButton>
                 </ProfileForm>
             </ProfileBox>
         </Container>
            </>
          ):(
              navigate('/admin/login')
          )
        }
        </>
          
    )
}

export default AdminAddFaculty;