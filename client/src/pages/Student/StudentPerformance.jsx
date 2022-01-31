import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'

import {getMarks} from '../../redux/actions/studentAction'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'

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

const StudentPerformance = () => {
    const dispatch = useDispatch();
    const student = useSelector((store) => store.student);

    useEffect(() => {
        dispatch(getMarks());
    },[dispatch])

    const columns = [
        {field:"id",headerName:"Subject No.",flex:0.3},
        {field:"code",headerName:"Subject Code",flex:1},
        {field:"name",headerName:"Subject Name",flex:1},
        {field:"marks",headerName:"Marks",flex:0.3},
        {field:"totalMarks",headerName:"Total Marks",flex:0.4}
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Data Structures",marks:20,total:25},
        {no:2,code:12345,name:"Algorithms",marks:25,total:30},
        {no:3,code:12345,name:"Operating Systems",marks:25,total:30},
        {no:4,code:12345,name:"Database Management",marks:25,total:30},
        {no:5,code:12345,name:"Machine Learning",marks:20,total:25},
    ]
    */

    const rows1 = [];
    const rows2 = [];
    const rows3 = [];

    student?.allMarks?.UnitTest1?.forEach((item,index) => {
        rows1.push({
            id:index + 1,
            code:item.subject.subjectCode,
            name:item.subject.subjectName,
            marks:item.marks,
            totalMarks:item.totalMarks
        })
    })

    student?.allMarks?.UnitTest2?.forEach((item,index) => {
        rows2.push({
            id:index + 1,
            code:item.subject.subjectCode,
            name:item.subject.subjectName,
            marks:item.marks,
            totalMarks:item.totalMarks
        })
    })

    student?.allMarks?.Semester?.forEach((item,index) => {
        rows3.push({
            id:index + 1,
            code:item.subject.subjectCode,
            name:item.subject.subjectName,
            marks:item.marks,
            totalMarks:item.totalMarks
        })
    })

    
    return(
        <>
        <StudentNavbar/>
        <Container>
            <Header>UNIT TEST 1</Header>
            <DataGrid rows={rows1} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
            <Header>UNIT TEST 2</Header>
            <DataGrid rows={rows2} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
            <Header>SEMESTER</Header>
            <DataGrid rows={rows3} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
        </Container>
        </>
    )
}

export default StudentPerformance;