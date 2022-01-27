import React from 'react'
import {useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import StudentNavbar from '../components/StudentNavbar'

import styled from 'styled-components'


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
align-items:center;
padding:1.5vmax;
box-sizing:border-box;
border-bottom:0.5px solid #0077b6;
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


const StudentDashboard = () => {
    const student = useSelector((store) => store.student)
    const navigate = useNavigate();
  return (
    <>
    {
        student.isAuthenticated ? (
<>
<StudentNavbar/>
    <Container>
      <Header>
          <h1>Student Profile</h1>
          <img src={student.student.student.avatar.url} />
          <h3>{student.student.student.name}</h3>
          <h3>{student.student.student.registrationNumber}</h3>
          <Link to="/student/update">Update Profile</Link>
      </Header>
      <ProfileInfo>
          <ProfileInfoItem>
              <h4>Email</h4>
              <p>{student.student.student.email}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Department</h4>
              <p>{student.student.student.department}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Year</h4>
              <p>{student.student.student.year}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Mobile Number</h4>
              <p>{student.student.student.studentMobileNumber}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Father Name</h4>
              <p>{student.student.student.fatherName}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Parent Number</h4>
              <p>{student.student.student.fatherMobileNumber}</p>
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

export default StudentDashboard
