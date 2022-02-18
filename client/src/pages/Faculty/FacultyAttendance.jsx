import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {DataGrid} from '@material-ui/data-grid'

import styled from 'styled-components'
import FacultyNavbar from '../../components/FacultyNavbar'

import {Person,CalendarToday,Search,Class} from '@material-ui/icons'
import {fetchStudents,markAttendance} from '../../redux/actions/facultyAction'
import { useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'

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

const SubmitContainer = styled.div`
display:flex;
align-itmes:center;
justify-content:center;
`


const FacultyAttendance = () => {
    const store = useSelector((store) => store);
    const faculty = useSelector((store) => store.faculty);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const department = faculty.faculty.faculty.department;
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [checkedValue, setCheckedValue] = useState([]);
    const [students,setStudents] = useState([]);
    const [error, setError] = useState({})
    const [flag, setFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)

    const columns = [
        {field:"_id",headerName:"No.",flex:0.3},
        {field:"code",headerName:"Registration Number",flex:0.1},
        {field:"name",headerName:"Name",flex:0.5},
        {field:"email",headerName:"Email",flex:0.3},
    ]

    const rows = [];
    faculty.fetchedStudents.forEach((item,index) => {
        rows.push({
            id:index + 1,
            _id:item._id,
            code:item.registrationNumber,
            name:item.name,
            email:item.email
        })
    })

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])


    const getStudents = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(fetchStudents(department,year,section))
    }

    const setAttendance = (e) => {
        e.preventDefault();
        console.log(checkedValue);
        dispatch(markAttendance(checkedValue,subjectCode,department,year,section))
        setCheckedValue([])
        alert.success("Attendance Marked!")
    }


  return (
    <>
    {
        faculty.isAuthenticated?(
            <>
            <FacultyNavbar/>
    <Container>
        <Form>
            <Heading>Mark Attendance</Heading>
            <FormItemContainer>
            <FormItem>
            <CalendarToday/>
                <select required onChange={(e) => setYear(e.target.value)}>
                    <option>Year</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </FormItem>
            <FormItem>
                <Person/>
                <select required onChange={(e) => setSection(e.target.value)}>
                    <option>Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                </select>
            </FormItem>

            </FormItemContainer>
            <FormItemContainer>
        
            {
                !isLoading &&  <Button type="submit" onClick={getStudents}>
                Search
            </Button>
            }
            </FormItemContainer>

          <FormItemContainer>
            
            
                
                {
                    faculty.allSubjectCodeList.length > 0 && (
                        <FormItem>
                        <Class/>
                        <select required onChange={(e) => setSubjectCode(e.target.value)}>
                        <option>Subject</option>
                        {
                            faculty.allSubjectCodeList.map(subjectCodeName => 
                                <option>{subjectCodeName}</option>
                            )
                        }
                        </select>
                        </FormItem>
                    ) 
                }
            
            
          </FormItemContainer>
           
           
        </Form>
        <DataGrid checkboxSelection onSelectionModelChange = {(ids) => {
            // setIsLoading2(true);
             setCheckedValue([]);
             const selectedRows = new Set(ids);
             const selectedStudents = rows.filter((row) => selectedRows.has(row.id) )
            // console.log(selectedStudents);
             const checkedArr = [];
             selectedStudents.forEach((item,index) => {
                 checkedArr.push(item._id);
             })
             setCheckedValue(checkedArr);
             //console.log(checkedValue);
        }} rows={rows} columns={columns} pageSize={5} autoHeight/>
        <SubmitContainer>
           <Button type="submit" onClick={setAttendance}>
                Submit
            </Button>
        </SubmitContainer>
        
           
    </Container>
            </>
        ):(
            navigate('/')
        )
    }
    
    </>
  )
}

export default FacultyAttendance
