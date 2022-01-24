import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'

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

const StudentSubjectList = ({history}) => {
    const columns = [
        {field:"id",headerName:"Subject No.",flex:0.3},
        {field:"code",headerName:"Subject Code",flex:1},
        {field:"name",headerName:"Subject Name",flex:1},
        {field:"year",headerName:"Year",flex:0.3},
        {field:"total",headerName:"Total Lectures",flex:0.4}
    ]

    const subjects = [
        {no:1,code:12345,name:"Data Structures",year:2,total:24},
        {no:2,code:12345,name:"Algorithms",year:2,total:28},
        {no:3,code:12345,name:"Operating Systems",year:2,total:36},
        {no:4,code:12345,name:"Database Management",year:2,total:36},
        {no:5,code:12345,name:"Machine Learning",year:2,total:24},
    ]

    const rows = [];
    subjects.forEach((item) => {
        rows.push({
            id:item.no,
            code:item.code,
            name:item.name,
            year:item.year,
            total:item.total
        })
    })

    //console.log(rows);

    return(
        <>
        <StudentNavbar/>
        <Container>
            <Header>SUBJECTS LIST</Header>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
        </Container>
        </>
    )
}

export default StudentSubjectList;