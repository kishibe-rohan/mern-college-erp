import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {DataGrid} from '@material-ui/data-grid'
import {Link,useNavigate} from 'react-router-dom';

import axios from 'axios';

import styled from 'styled-components'
import StudentNavbar from '../../components/StudentNavbar'

import {Person,CalendarToday,Search,Class,Explore} from '@material-ui/icons'

const Container = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`
const Heading = styled.h1` 
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;
border-bottom:1px solid #0077b6;
`
const Form = styled.form` 
width:100%;
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 3vmax;
background-color: white;
`

const FormItemContainer  = styled.div` 
display:flex;
justify-content:center;
width: 100%;
`
const FormItem = styled.div` 
display: flex;
align-items: center;
margin: 2rem;
>input{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax;
    outline: none;
}
>select{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax;
    outline: none;
}
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax; 
    color:rgba(0,0,0,0.623)
}
`

const Button = styled.button` 
    border-radius: 10px;
    border:none;
    background-color: #0077b6;
    font: 400 1vmax;
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    width: 30%;
    margin: 4vmax;
    text-align: center;
    cursor:pointer;
`


const StudentSearch = () => {

    const student = useSelector((store) => store.student);
    const navigate = useNavigate();
    

    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [result, setResult] = useState([])

    const fetchStudents = async() => {
        try{
            const {data} = await axios.post('http://localhost:3000/api/student/getAllStudents',{
                department,year,section
            })

            setResult(data.result);

        }catch(err)
        {
            alert("Something went wrong..");
        }
    }

    const columns = [
        {field:"num",headerName:"S.R No.",flex:0.1},
        {field:"id",headerName:"G.R Number",flex:0.5},
        {field:"name",headerName:"Name",flex:0.5},
        {field:"email",headerName:"Email",flex:0.3},
        {field:"section",headerName:"Section",flex:0.4},
        {field:"visit",headerName:"Visit",flex:0.2,type:"number",sortable:"false",renderCell:(params) => {
            return(
                <>
                <Link to={`/profile/${params.getValue(params.id,"id")}`}>
                 <Explore style={{color:"#0077b6"}}/>
                </Link>
                </>
            )
        }}
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Shifon Shaikh",email:"abc123@gmail.com",year:"A"},
        {no:2,code:12345,name:"Rahul Yadav",email:"abc123@gmail.com",year:"B"},
        {no:3,code:12345,name:"Disha Patani",email:"abc123@gmail.com",year:"C"},
        {no:4,code:12345,name:"Rakesh Mali",email:"abc123@gmail.com",year:"C"},
        {no:5,code:12345,name:"Raj Aryan",email:"abc123@gmail.com",year:"D"},
    ]
    */

    const rows = [];
    result && result.forEach((item,index) => {
        rows.push({
            num:index + 1,
            id:item.registrationNumber,
            name:item.name,
            email:item.email,
            section:item.section
        })
    })

    const formHandler = (e) => {
        e.preventDefault();
        fetchStudents();
    }

  return (
    <>
    <StudentNavbar/>
    <Container>
        <Form onSubmit={formHandler}>
            <Heading>Search Students</Heading>
            <FormItemContainer>
            <FormItem>
                <Person/>
                <select onChange={(e) => setDepartment(e.target.value)}>
                    <option>Department</option>
                    <option>C.S.E</option>
                    <option>E.C.E</option>
                    <option>I.T</option>
                    <option>Civil</option>
                    <option>Mechanical</option>
                </select>
            </FormItem>
            <FormItem>
                <CalendarToday/>
                <select onChange={(e) => setYear(e.target.value)}>
                    <option>Year</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </FormItem>
            <FormItem>
                <Class/>
                <select onChange={(e) => setSection(e.target.value)}>
                    <option>Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                </select>
            </FormItem>
            </FormItemContainer>
            <Button type="submit">
                Search
            </Button>
        </Form>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight/>
    </Container>
    </>
  )
}

export default StudentSearch
