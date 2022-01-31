import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'

import StudentNavbar from '../components/StudentNavbar'
import styled from 'styled-components'

import {fetchAttendance} from '../redux/actions/studentAction'

const Container = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`

const Header = styled.h1` 
font:400 2rem;
padding:0.5vmax;
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;
`

const StudentAttendance = () => {

    const student = useSelector(store => store.student)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAttendance())
    },[dispatch])

    const columns = [
        {field:"id",headerName:"Subject No.",flex:0.3},
        {field:"code",headerName:"Subject Code",flex:0.5},
        {field:"name",headerName:"Subject Name",flex:0.5},
        {field:"max",headerName:"Max Hours",flex:0.3},
        {field:"absent",headerName:"Absent Hours",flex:0.3},
        {field:"total",headerName:"Total Hours",flex:0.4},
        {field:"attendance",headerName:"Attendance",flex:0.4},
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Data Structures",max:40,present:32,absent:8,total:40,attendance:80},
        {no:2,code:12345,name:"Algorithms",max:40,present:32,absent:8,total:40,attendance:80},
        {no:3,code:12345,name:"Operating Systems",max:40,present:32,absent:8,total:40,attendance:80},
        {no:4,code:12345,name:"Database Management",max:40,present:32,absent:8,total:40,attendance:80},
        {no:5,code:12345,name:"Machine Learning",max:18,present:12,absent:6,total:20,attendance:66.67},
    ]
    */

    const rows = [];
    student?.attendence?.forEach((item,index) => {
        rows.push({
            id:index+1,
            code:item.subjectCode,
            name:item.subjectName,
            max:item.maxHours,
            absent:item.absentHours,
            total:item.totalLectures,
            attendance:`${item.attendance}%`,
        })
    })

    //console.log(rows);

    return(
        <>
        {
            student.isAuthenticated?(
                <>
                 <StudentNavbar/>
        <Container>
            <Header>STUDENT ATTENDANCE</Header>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
        </Container>
                </>

            ):(
             navigate('/')
            )
        }
       </>  
    )
}

export default StudentAttendance;