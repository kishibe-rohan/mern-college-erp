import React from 'react'
import AdminNavbar from '../components/AdminNavbar'

import styled from 'styled-components'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

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

    const admin = useSelector((state) => state.admin);
    const navigate = useNavigate();
    
  return (
      
    <>
    {
        admin.isAuthenticated?(
            <>
 <AdminNavbar/>
    <Container>
      <Header>
          <h1>Admin Profile</h1>
          <img src={admin.admin.avatar} />
          <h3>{admin.admin.name}</h3>
          <h3>{admin.admin.registrationNumber}</h3>
          <Link to="/admin">Welcome</Link>
      </Header>
      <ProfileInfo>
          <ProfileInfoItem>
              <h4>Email</h4>
              <p>{admin.admin.email}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Department</h4>
              <p>{admin.admin.department}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Contact Number</h4>
              <p>{admin.admin.contactNumber}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Joining Year</h4>
              <p>{admin.admin.joiningYear}</p>
          </ProfileInfoItem>
      </ProfileInfo>
    </Container>
            </>
        ):(
            navigate('/admin/login')
        )
    }
   
    </>
  )
}

export default AdminDashboard
