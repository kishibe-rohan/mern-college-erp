import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {DataGrid} from '@material-ui/data-grid'
import {useNavigate} from 'react-router-dom'

import styled from 'styled-components'
import FacultyNavbar from '../../components/FacultyNavbar'
import {fetchStudents,uploadMarks} from '../../redux/actions/facultyAction'

import {Person,CalendarToday,Search,Class} from '@material-ui/icons'
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


const FacultyUploadMarks = () => {
    const alert = useAlert();

    const handleInputChange = (value,_id) => {
        const newMarks = [...marks];
        let index = newMarks.findIndex(m => m._id === _id);
        if(index === -1)
        {
            newMarks.push({_id,value})
        }else{
            newMarks[index].value = value;
        }
 
        setMarks(newMarks);
 
     }

    const columns = [
        {field:"id",headerName:"No.",flex:0.2},
        {field:"code",headerName:"Registration Number",flex:0.5},
        {field:"name",headerName:"Name",flex:0.5},
        {field:"year",headerName:"Marks",flex:0.3,type:"number",sortable:false,
        renderCell:(params) => {
           // console.log(params);
            return(
                <>
                <input required onChange={(e) => handleInputChange(e.target.value,params.getValue(params.id,"id"))} type="number" style={{outline:"none",border:"none"}} placeholder="Enter marks"/>
                </>
            )
        }},
    ]

    const store = useSelector((store) => store)
    const faculty = useSelector((store) => store.faculty);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [marks, setMarks] = useState([])
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [totalMarks, setTotalMarks] = useState()
    const [exam ,setExam] = useState("")
    const [error, setError] = useState({})
    const [errorHelper, setErrorHelper] = useState({})
    const [isFetchingStudents,setIsFetchingStudents] = useState(true);

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])


    const formHandler = (e) => {
        e.preventDefault();
        //console.log(year,section);
       dispatch(fetchStudents(department, year,  section));
       setIsFetchingStudents(prev => !prev);
    }



    const secondFormHandler = (e) => {
        e.preventDefault();
       // console.log(subjectCode, exam, totalMarks, marks, department, section);
        dispatch(uploadMarks(subjectCode, exam, totalMarks, marks, department, section
        ));
        alert.success("Marks uploaded successfully");
    }

    const rows = [];
    faculty.fetchedStudents.forEach((item) => {
        rows.push({
            id:item._id,
            code:item.registrationNumber,
            name:item.name,
        })
    })


  return (
    <>
    {
        faculty.isAuthenticated?(
            <>
 <FacultyNavbar/>
    <Container>
    <Form>
    <Heading>Upload Marks</Heading>
   
        {
            isFetchingStudents?(
                <>
                <FormItemContainer>
                <FormItem>
                    <Class/>
                    <select required onChange={(e) => setSection(e.target.value)}>
                        <option>Section</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                    </select>
                </FormItem>
                <FormItem>
                    <Class/>
                    <select onChange={(e) => setExam(e.target.value)}>
                        <option>Exam</option>
                        <option>Unit Test 1</option>
                        <option>Unit Test 2</option>
                        <option>Semester</option>
                    </select>
                </FormItem>
    
                </FormItemContainer>
                <FormItemContainer>
                <FormItem>
                    <Person/>
                    <select required onChange={(e) => setDepartment(e.target.value)}>
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
                    <select  required onChange={(e) => setYear(e.target.value)}>
                        <option>Year</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </FormItem>
                </FormItemContainer>
                
                <Button type="submit" onClick={formHandler}>
                   Search Students
                 </Button>
                </>
            ):( <>
                <FormItemContainer>
        <FormItem>
          <Search/>
          <select required onChange={(e) => setSubjectCode(e.target.value)}>
                        <option>Subject</option>
                        {
                            faculty.allSubjectCodeList.map(subjectCodeName => 
                                <option>{subjectCodeName}</option>
                            )
                        }
         </select>
        </FormItem>
        <FormItem>
                  <Class/>
                  <input type="number" placeholder="Enter total marks" required onChange={(e) => setTotalMarks(e.target.value)}/>
        </FormItem>
       </FormItemContainer>
                <Button type="submit" onClick={secondFormHandler}>
                   Submit Marks
                 </Button>
       </>
            )
        }
     </Form>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight/>
    </Container>
            </>
        ):(
            navigate('/')
        )
    }
   
    </>
  )
}

export default FacultyUploadMarks
