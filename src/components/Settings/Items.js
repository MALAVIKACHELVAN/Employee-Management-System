import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,TextField,Stack,Button} from '@mui/material';
import Swal from 'sweetalert2';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Items() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick=()=>{
  Swal.fire(
    'Success!',
    'Password has changed!',
    'success'
  )
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Change password " {...a11yProps(0)} />
          <Tab label="Add Department" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack spacing={3}>
      <TextField id="standard-basic" label="Old Password" variant="standard" />
      <TextField id="standard-basic" label="New Password" variant="standard" />
      <TextField id="standard-basic" label="Confirm Password" variant="standard" />
      <Button variant="contained" color="success" onClick={handleClick}>
  Change
</Button>
      </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography gutterBottom variant="h5" component="div">Add Departments</Typography><br/>
      <TextField label="department" color="primary" focused /><br/><br/>
      <Button variant="contained" href="#contained-buttons">
Save
</Button>
      </CustomTabPanel>
     
    </Box>
  );
}



