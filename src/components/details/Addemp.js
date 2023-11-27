import React from 'react'
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import {collection,addDoc,getDocs} from "firebase/firestore";
import {dbb} from '../../firebase/Config'

import Sidebar from '../../NewCom/Sidebar';
import Navbar from '../../NewCom/Navbar';
import '../../Dash.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Swal from 'sweetalert2';



// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );


export default function Addemp() {
  const navigate=useNavigate();

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [dept, setDept]=useState("");
  const [sal, setSal]=useState("");

  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(dbb,"details");

  const handleNameChange=(e)=>{
    setName(e.target.value);
  }
  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
  }
  const handleDeptChange=(e)=>{
    setDept(e.target.value);
  }
  const handleSalaryChange=(e)=>{
    setSal(e.target.value);
  }

  const createUser = async()=>{
    await addDoc(empCollectionRef,{
      name: name,
      email: email,
      department:dept,
      salary:Number(sal),
    });
    getUsers();
    Swal.fire(
      'Success!',
      'Details has been added!',
      'success'
    )
  };

  const getUsers=async ()=>{
    const data =await getDocs(empCollectionRef);
    setRows(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
  };



  return (
    <>
    <div className='profile'> 
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Card sx={{ minWidth: 275 ,paddingBottom: 5}} elevation={4}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%',
                }}
                className="field"
                >
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} gutterBottom color="dodgerblue" >
                    ADD NEW EMLOYEE
                  </Typography><Divider/>
                  <Stack spacing={2}>
                <h4>Name</h4>
                <TextField id="outlined-basic" label="Employee Name" variant="outlined" onChange={handleNameChange} />
                <h4>Email</h4>
                <TextField id="outlined-basic" label="Employee Email" variant="outlined" onChange={handleEmailChange}/>
                <h4>Department</h4>
                <TextField id="outlined-basic" label="Employee Department" variant="outlined" onChange={handleDeptChange}/>
                
                <h4>Salary</h4>
                <TextField id="outlined-basic" label="Employee salary" variant="outlined" onChange={handleSalaryChange}/>
                </Stack>
            </CardContent>
            <CardActions>
            <Button variant="contained" onClick={createUser}>Add</Button>
            <Button variant="contained" onClick={()=>{navigate('/Emplist')}}style={{backgroundColor:"darkred"}}>Cancel</Button>
            </CardActions>
                </Box>
          </Card>

        </Box>
      </Box>
      </div>
    </>
  )
}










// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 450,
//     },
//   },
// };

// const names = [
//   'Engineering',
//   'Production',
//   'Sales Executive',
//   'Marketing',
//   'Administration',
//   'IT',
  
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }


// function Departments() {
//   const theme = useTheme();
//   const [personName, setPersonName] = useState([]);
//   const [dept, setDept]=useState("");
  
//   const handleDeptChange=(e)=>{
//     setDept(e.target.value);
//   }
 
//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };
 
//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 570 }} style={{marginLeft:'0px',}}>
//         <InputLabel className='input'  id="demo-multiple-name-label">Employee Department</InputLabel>
//         <Select
//           labelId="demo-multiple-name-label"
//           id="demo-multiple-name"
//           multiple
//           value={personName}
//           onChange={()=>{handleChange();handleDeptChange()}}
//           input={<OutlinedInput label="Employee Department" />}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
//  }


