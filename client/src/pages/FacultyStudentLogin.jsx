import React,{useEffect, useState} from 'react'
import {CircularProgress} from '@material-ui/core'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

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

const LoginInfo = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color: tomato;
color: white;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
`



const FacultyStudentLogin = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const {isAuthenticated} = useSelector((state) => state.student);
    const {isAuthenticated:facultyAuthenticated} = useSelector((state) => state.faculty)

    const [isStudent,setIsStudent] = useState(true);
    const [facultyRegNum, setFacultyRegNum] = useState('')
    const [facultyPassword, setFacultyPassword] = useState('')
    const [studentRegNum, setStudentRegNum] = useState('')
    const [studentPassword, setStudentPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [errorsHelper, setErrorsHelper] = useState({})
    const [isFacultyLoading, setIsFacultyLoading] = useState(false)
    const [isStudentLoading, setIsStudentLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if(facultyAuthenticated)
        {
            navigate('/faculty')
        }
    },[facultyAuthenticated])

    useEffect(() => {
        if(isAuthenticated)
        {
            navigate('/home')
        }
    },[isAuthenticated])

    useEffect(() => {
        if(store.error)
        {
            setErrors(store.error)
        }
    },[store.error])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorsHelper(store.errorHelper)
        }
    }, [store.errorHelper])

    const isLogin = true;

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>Smart ERP</Logo>
                <Desc>Track your academics and stay connected with your peers</Desc>
            </Left>
            <Right>
                {
                   isLogin? (
                       <LoginBox>
                           <LoginInput placeholder="Student GR Number" type="text" required/>
                           <LoginInput placeholder="Password" type="password" required/>
                           <LoginButton type="submit">
                               Log In
                           </LoginButton>
                       <LoginInfo>
                           Login as Faculty?
                       </LoginInfo>
                       <LoginInfo style={{backgroundColor:"#03045e"}}>
                           Forgot Password?
                       </LoginInfo>
                       </LoginBox>
                   ):(
                      <LoginBox>
                           <LoginInput placeholder="Faculty GR Number" type="text" required/>
                           <LoginInput placeholder="Password" type="password" required/>
                           <LoginButton type="submit">
                               Log In
                           </LoginButton>
                       <LoginInfo>
                           Login as Student?
                       </LoginInfo>
                       <LoginInfo style={{backgroundColor:"green"}}>
                           Forgot Password?
                       </LoginInfo>
                      </LoginBox>
                   )
                }
            </Right>
        </Wrapper>
    </Container>
  )
}

export default FacultyStudentLogin
