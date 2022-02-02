import React,{useEffect, useState} from 'react'
import {CircularProgress} from '@material-ui/core'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin } from '../redux/actions/adminAction'


import {useAlert} from 'react-alert'

const Container = styled.div` 
width:100vw;
height:100vh;
background:linear-gradient(75deg,#0077b6 50%,#ffffff 50%);
display:flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div` 
width: 80%;
height: 70%;
display: flex;
background-color:white;
border-radius:10px;
color:#0077b6;
`
const Left = styled.div` 
flex:0.6;
display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:10px;
`

const Logo = styled.h3`
font-size: 50px;
font-weight: 800;
color: #0077b6;
margin-bottom: 10px;
`

const Desc = styled.span` 
font-size:24px; 
`

const Right = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right:10px;
`

const LoginBox = styled.form` 
height:300px;
padding:20px;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const LoginInput = styled.input`
height: 50px;
border-radius: 10px;
border: 1px solid #0077b6;
font-size: 18px;
padding-left: 20px;
:focus{
    outline: 1px solid #03045e;
}`

const LoginButton = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color: #0077b6;
color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`

const LoginInfo = styled.p`
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    >a{
        text-decoration:none;
        color:tomato;
    }
`



const AdminLogin = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const alert = useAlert();

    const [regNum,setRegNum] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState({})
    const [errorsHelper, setErrorsHelper] = useState({})
    const [isLoading, setIsLoading] = useState(false)
   

    const navigate = useNavigate();

    useEffect(() => {
        if(store.admin.isAuthenticated)
        {
            navigate('/admin')
            alert.success("Admin Login Successful");
        }
    },[store.admin.isAuthenticated])

    useEffect(() => {
        if(store.error)
        {
            setErrors(store.error)
        }
    },[store.error])

    const loginHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(adminLogin({registrationNumber:regNum,password}))
    }

    useEffect(() => {
        if(store.error || store.admin.isAuthenticated){
            setIsLoading(false)
        }
        else{
            setIsLoading(true)
        }

    },[store.error,store.admin.isAuthenticated]) 

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>Smart ERP</Logo>
                <Desc>Admin Login</Desc>
            </Left>
            <Right>
               
                       <LoginBox>
                           <LoginInput placeholder="Admin GR Number" type="text" onChange={(e) => setRegNum(e.target.value)} required/>
                           <LoginInput placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                           <LoginButton type="submit" onClick={loginHandler}>
                               Log In
                           </LoginButton>
                       </LoginBox>
                   
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default AdminLogin
