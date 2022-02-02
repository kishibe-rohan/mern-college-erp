import React from 'react'
import AdminNavbar from '../components/AdminNavbar'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
padding:2vmax;
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


const AdminDashboard = () => {

   
  return (
    <>
    <AdminNavbar/>
    <Container>
      <Header>
          <h1>Admin Profile</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqxDTr74EAw5NYdyNkhKPo_el_Z8Iu0-yDg&usqp=CAU" />
          <h3>John Doe</h3>
          <h3>21810589</h3>
          <Link to="/faculty/updateProfile">Update Profile</Link>
      </Header>
      <ProfileInfo>
          <ProfileInfoItem>
              <h4>Email</h4>
              <p>abc123@gmail.com</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Department</h4>
              <p>C.S.E</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Contact Number</h4>
              <p>+123456789</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Joining Year</h4>
              <p>2022</p>
          </ProfileInfoItem>
      </ProfileInfo>
    </Container>
    </>
  )
}

export default AdminDashboard
