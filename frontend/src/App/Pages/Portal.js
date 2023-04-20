import * as React from 'react';
import TopNav from '../Components/TopNav';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { display } from '@mui/system';
import pic from '../images/paperBackground.jpg'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export const Portal = () => {

    const nav = useNavigate();

    return(
        <div>
            <h1>Portal page</h1>
        </div>
    )
}