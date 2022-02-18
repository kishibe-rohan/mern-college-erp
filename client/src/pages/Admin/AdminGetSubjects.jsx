import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {DataGrid} from '@material-ui/data-grid'

import styled from 'styled-components'
import AdminNavbar from '../../components/AdminNavbar'
import Loader from '../../components/Loader'

import {adminGetAllSubject} from '../../redux/actions/adminAction'
import {Person,CalendarToday} from '@material-ui/icons'
import {useNavigate} from 'react-router-dom'

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
width:20rem;
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 3vmax;
background-color: white;
`

const FormItem = styled.div` 
display: flex;
width: 100%;
align-items: center;
margin: 2rem;
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



const AdminGetSubjects = () => {

    const dispatch = useDispatch();
    const admin = useSelector((store) => store.admin);

    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(department,year);
        dispatch(adminGetAllSubject({department,year}));
    }

    useEffect(() => {
        if (admin.allSubject.length !== 0) {
            setIsLoading(false)
        }

    }, [admin.allSubject])

    const columns = [
        {field:"id",headerName:"Subject No.",flex:0.2},
        {field:"code",headerName:"Subject Code",flex:1},
        {field:"name",headerName:"Subject Name",flex:1},
        {field:"total",headerName:"Total Lectures",flex:0.3}
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Data Structures",year:2,total:24},
        {no:2,code:12345,name:"Algorithms",year:2,total:28},
        {no:3,code:12345,name:"Operating Systems",year:2,total:36},
        {no:4,code:12345,name:"Database Management",year:2,total:36},
        {no:5,code:12345,name:"Machine Learning",year:2,total:24},
    ]
    */

    const rows = [];
    admin.allSubject.forEach((item,index) => {
        rows.push({
            id:index + 1,
            code:item.subjectCode,
            name:item.subjectName,
            total:item.totalLectures
        })
    })


  return (
    <>
    {
        admin.isAuthenticated?(
          <>
 <AdminNavbar/>
    <Container>
        <Form onSubmit={formHandler}>
            <Heading>Search Subjects</Heading>
            <FormItem>
                <Person/>
                <select onChange= {(e) => setDepartment(e.target.value)}>
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
                <select onChange= {(e) => setYear(e.target.value)}>
                    <option>Year</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </FormItem>
            <Button type="submit">
                Search
            </Button>
        </Form>
        {
            isLoading?(
                <Loader/>
            ):(
                <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
            )
        }
       
    </Container>
          </>
        ):(
            navigate('/admin/login')
        )
    }
    </>
  )
}

export default AdminGetSubjects
