
import * as React from 'react';
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Addemp from './Addemp';
// import '../../Dash.css';

import {dbb} from '../../firebase/Config'
import{
  collection,getDocs,addDoc,updateDocs,deleteDoc,doc,
} from "firebase/firestore";


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography,Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Swal from 'sweetalert2';




export default function Emplist() {
  const navigate=useNavigate();


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  
  const empCollectionRef = collection(dbb,"details");

  useEffect(()=>{
    getUsers();
  },[]);

  const getUsers=async ()=>{
    const data =await getDocs(empCollectionRef);
    setRows(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser=(id)=>{
    Swal.fire({
      title:"Are you sure?",
      text:"You won't be able to revert this!",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"dodgerblue",
      confirmButtonText:"Delete",
      cancelButtonColor:"darkred",
    }).then((result)=>{
      if(result.value){
          deleteApi(id);
      }
    })
  }
    
  const deleteApi=async (id)=>{
    const userDoc =doc(dbb, "details",id);
    await deleteDoc(userDoc);
    getUsers();

  }

  const filterData = (v) => {
    if (v) {
      
      setRows([v]);
    } else {
      setRows(['']);
      getUsers();
    }
  };

  return (
    
      
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
      <Typography gutterBottom variant="h5" component="div" sx={{padding:"20px"}}>
        Employees List
      </Typography>
      <Divider/>
      <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Employee" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={()=>{navigate('/addemp')}}>
              Add
            </Button>
          </Stack>
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
                <TableCell align="left" style={{ minWidth: "100px" }}>Name</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Email</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Department</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Salary</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    
                        <TableCell key={row.id} align="left">
                         {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                         {row.email}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                         {row.department}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                         {row.salary}
                        </TableCell>
                     <TableCell align='left'>
                        <Stack direction="row" spacing={2}>
                        
                          <EditIcon
                             style={{
                              fontSize: "20px",
                              color:'dodgerblue',
                              cursor:'pointer',
                             }}
                             onClick={()=>{deleteUser(row.id)}}
                          />
                          
                          <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color:'darkred',
                            cursor:'pointer',
                           }}
                           onClick={()=>{deleteUser(row.id)}}
                          />
                         
                          
                        </Stack>

                     </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  
  );
}








