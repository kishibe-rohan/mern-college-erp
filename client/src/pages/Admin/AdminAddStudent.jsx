import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'

import AdminNavbar from '../../components/AdminNavbar'
import styled from 'styled-components'

import {Face,MailOutline,Class,Phone,PhoneIphone,SupervisorAccount,CalendarToday,} from '@material-ui/icons'
import {adminAddStudent} from '../../redux/actions/adminAction'

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
width:70vw;
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
height: auto;
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
`

const AdminAddStudent = () => {
    const dispatch = useDispatch();
    const admin = useSelector((store) => store.admin);
    const navigate = useNavigate();
    const alert = useAlert();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [department,setDepartment] = useState("");
    const [year,setYear] = useState("");
    const [section,setSection] = useState("");
    const [studentMobileNumber, setStudentMobileNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherMobileNumber] = useState('')
    const [error, setError] = useState({})

    const formHandler = (e) => {
        e.preventDefault();
        /*
        const myForm = new FormData();
        myForm.append("name",name);
        myForm.append("year",year);
        myForm.append("section",section);
        myForm.append("department",department);
        myForm.append("studentMobileNumber",studentMobileNumber);
        myForm.append("email",email);
        myForm.append("fatherName",fatherName);
        myForm.append("fatherMobileNumber",fatherMobileNumber);        
        myForm.append("avatar",avatar);
        console.log(myForm);
        */
        

        dispatch(adminAddStudent({name,year,section,department,studentMobileNumber,email,fatherName,fatherMobileNumber}));
        alert.success("Student Registration Successful");
        navigate('/admin/students');
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
                    Add Student
                </ProfileHeader>
                <ProfileForm encType='multiform/form-data' onSubmit={formHandler}>
                   <ProfileName>
                        <Face/>
                        <ProfileInput type="text" onChange = {(e) => setName(e.target.value)} placeholder="Name" required name="name" value={name}/>
                    </ProfileName>
                    <ProfileEmail>
                    <MailOutline/>
                        <ProfileInput type="text" onChange = {(e) => setEmail(e.target.value)} placeholder="Email" required name="email" value={email}/>
                    </ProfileEmail>
                    <ProfilePhone>
                        <Phone/>
                        <ProfileInput type="text" onChange = {(e) => setStudentMobileNumber(e.target.value)} placeholder="Student Mobile" required name="studentMobileNumber" value={studentMobileNumber}/>
                    </ProfilePhone>
                    <ProfileName>
                        <Class/>
                        <select onChange = {(e) => setDepartment(e.target.value)}>
                            <option>Department</option>
                            <option>C.S.E</option>
                            <option>I.T</option>
                            <option>Mechanical</option>
                            <option>Civil</option>
                            <option>E.C.E</option>
                        </select>
                    </ProfileName>
                    <ProfileName>
                        <Class/>
                        <select onChange = {(e) => setSection(e.target.value)}>
                            <option>Section</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </ProfileName>
                    <ProfileName>
                        <CalendarToday/>
                        <select onChange = {(e) => setYear(e.target.value)}>
                            <option>Year</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </ProfileName>
                    <ProfileName>
                        <SupervisorAccount/>
                        <ProfileInput onChange = {(e) => setFatherName(e.target.value)} type="text" placeholder="Father Name" required name="fatherName" value={fatherName}/>
                    </ProfileName>
                    <ProfilePhone>
                        <PhoneIphone/>
                        <ProfileInput onChange = {(e) => setFatherMobileNumber(e.target.value)} type="text" placeholder="Father Mobile" required name="fatherMobileNumber" value={fatherMobileNumber}/>
                    </ProfilePhone>
                
                    <ProfileButton type="submit">
                        Register 
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

export default AdminAddStudent;