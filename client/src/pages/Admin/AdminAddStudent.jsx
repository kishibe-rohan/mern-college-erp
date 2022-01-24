import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'

import {Face,MailOutline,Phone,PhoneIphone,SupervisorAccount,CalendarToday,} from '@material-ui/icons'

const AdminAddStudent = () => {
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