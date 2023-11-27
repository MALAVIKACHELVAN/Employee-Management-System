import React from 'react'
import Sidebar from '../NewCom/Sidebar';
import Navbar from '../NewCom/Navbar';
import '../Dash.css'

import { Box, Card, CardContent, Typography,Avatar,Divider,Stack} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const About = () => {
    return (
        <>
            <div className='profile'>
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Sidebar />

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Card sx={{ maxWidth: 700 ,minHeight: 250}}>
                             <div className='avatar'>

                        <Avatar
  alt="Remy Sharp"
  src=""
  sx={{ width: 56, height: 56 ,marginLeft: 3,marginTop:3}}
/>
                             </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Madhulekha
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                   About me
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                               I am a sales executive at MMM Private Ltd., a leading company in the software industry.
                                 I have over 10 years of experience in selling software solutions to various clients across India and abroad.
                                 I have skilled in negotiating, closing deals, and building long-term relationships with customers.
                                </Typography>
                            </CardContent>

                        </Card>
                        <Box height={20} />
                        <Card sx={{ minWidth: 545  ,minHeight: 350}}>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   Details
                                </Typography><br/>
                                <Stack spacing={1}>
                                <Typography gutterBottom variant="h7" component="div"><pre>Fullname            Madhulekha</pre></Typography><Divider/>
                                <Typography gutterBottom variant="h7" component="div"><pre>User status         Active Employee</pre></Typography><Divider/>
                                <Typography gutterBottom variant="h7" component="div"><pre>Employee Type       Full Time</pre></Typography><Divider/>
                                <Typography gutterBottom variant="h7" component="div"><pre>Start date          27/11/2023</pre></Typography><Divider/>
                                <Stack direction="row" spacing={2}>
                                <EmailIcon/><h4>madhulekha@gmail.com</h4>
                                <CallIcon/><h4>+91 9988776655</h4>
                                </Stack>
                                
                                </Stack>
                            </CardContent>

                        </Card>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default About