import React from 'react'
import {useSelector} from 'react-redux'
import FacultyNavbar from '../components/FacultyNavbar'

import styled from 'styled-components'
import { Link,useNavigate } from 'react-router-dom'

const Container = styled.div`
display:flex;
height:100vh;
width:100vw;
max-width:100%;
background-color:white;
`

const Header = styled.div` 
display:flex;
height:100vh;
width:100vw;
max-width:100%;
flex-direction: column;
justify-content: center;
align-items: center;
>h1{
    font:500 2.2vmax;
    color:#0077b6;
    transform:translateX(-10vmax) translateY(-2vmax)
}
>img{
    width:20vmax;
    object-fit:contain;
    border-radius:100%;
    transition:all 0.5s;
}
>a{
    border-radius: 10px;
    background-color: #0077b6;
    font: 400 1vmax;
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    width: 30%;
    margin: 4vmax;
    text-align: center;
    transition: all 0.5s;
}
`

const ProfileInfo = styled.div` 
display:flex;
height:100vh;
width:100vw;
max-width:100%;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ProfileInfoItem = styled.div` 
justify-content:space-evenly;
align-items:flex-start;
padding:5vmax;
box-sizing:border-box;
>h4{
    color:#0077b6;
    font:400 1.2vmax;
    text-align:center;
};
>p{
    color:black;
    font:400 1vmax;
    margin:0.2vmax;
}
`


const FacultyDashboard = () => {
    const navigate = useNavigate();
    const faculty = useSelector((store) => store.faculty);

  return (
      <>
      {
          faculty.isAuthenticated?(
            <>
            <FacultyNavbar/>
            <Container>
              <Header>
                  <h1>Faculty Profile</h1>
                  <img src={faculty.faculty.faculty.avatar.url} />
                  <h3>{faculty.faculty.faculty.name}</h3>
                  <h3>{faculty.faculty.faculty.registrationNumber}</h3>
                  <Link to="/faculty/update">Update Profile</Link>
              </Header>
              <ProfileInfo>
                  <ProfileInfoItem>
                      <h4>Email</h4>
                      <p>{faculty.faculty.faculty.email}</p>
                  </ProfileInfoItem>
                  <ProfileInfoItem>
                      <h4>Designation</h4>
                      <p>{faculty.faculty.faculty.designation}</p>
                  </ProfileInfoItem>
                  <ProfileInfoItem>
                      <h4>Mobile Number</h4>
                      <p>{faculty.faculty.faculty.facultyMobileNumber}</p>
                  </ProfileInfoItem>
              </ProfileInfo>
            </Container>
            </>
          ):(
              navigate('/')
          )
      }
      </>
   
  )
}

export default FacultyDashboard
