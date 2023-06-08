import * as React from 'react';
import TopNav from '../Components/TopNav';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { display } from '@mui/system';
import pic from '../images/paperBackground.jpg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { SideBar } from '../Components/SideBar';
import { Notes } from '../Components/Notes'
import '../Components/Notes.css'

export const Portal = () => {
    const nav = useNavigate();

    return (
        <div>
            <TopNav/>
            <div className='PortalBox'>
                <SideBar/>
                {/* <Notes/> */}
                {/* <div style={{
                    display: 'flex',
                    alignItems: 'vertical',
                    width: '100%',
                }}>
                    <p>Test</p> */}
                <Notes/>
                {/* </div> */}
            </div>
        </div>
    );
};
