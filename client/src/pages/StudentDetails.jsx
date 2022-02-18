import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StudentNavbar from '../components/StudentNavbar'

import styled from 'styled-components'
import { Link,useParams,useNavigate } from 'react-router-dom'

import {getStudentByRegNum} from '../redux/actions/studentAction'

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


const StudentDetails = () => {
    const student = useSelector((store) => store.student);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const [registrationNumber, setRegistrationNumber] = useState("")

    useEffect(() => {
        setRegistrationNumber(params.registrationNumber);
        console.log(registrationNumber);
        dispatch(getStudentByRegNum(registrationNumber));
    },[registrationNumber])

  return (
    <>
    {
        !student.isAuthenticated || registrationNumber === student.student.student.registrationNumber ?(
            navigate('/')
        ):(
            <>
            <StudentNavbar/>
    <Container>
      <Header>
          <h1>Student Profile</h1>
          <img src={student.regNumStudent?.avatar?.url} />
          <h3>{student.regNumStudent?.name}</h3>
          <h3>{registrationNumber}</h3>
          <Link to={`/chat/${student.student.student.registrationNumber}.${registrationNumber}`}>Message</Link>
      </Header>
      <ProfileInfo>
          <ProfileInfoItem>
              <h4>Email</h4>
              <p>{student.regNumStudent?.email}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Department</h4>
              <p>{student.regNumStudent?.department}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Year</h4>
              <p>{student.regNumStudent?.year}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Section</h4>
              <p>{student.regNumStudent?.section}</p>
          </ProfileInfoItem>
      </ProfileInfo>
    </Container>
            </>
        )
    }
    
    </>
  )
}

export default StudentDetails