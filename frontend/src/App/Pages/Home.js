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

export const Home = () => {
    const nav = useNavigate();

    return (
        <div>
            <TopNav />
            <div className="grid">
                <img src={pic} alt="paper background" className="pic"></img>
                <div className="info">
                    <p className="mainFont">Meet Notro</p>
                    <p className="secondFont">
                        Your new diary and to do list...
                    </p>
                </div>
                <div className="infoTwo">
                    <p>
                        Daily notes, journals, and to do's have never been
                        easier.
                    </p>
                </div>
                <div className="signUpButton">
                    <Button
                        variant="contained"
                        size="large"
                        // color="success"
                        onClick={() => nav('/signup')}
                    >
                        Sign Up
                    </Button>
                </div>
                <div className="signUpButton">
                    <Button
                        variant='contained'
                        size="large"
                        onClick={() => nav('/login')}
                    >
                            Log In
                    </Button>
                </div>
            </div>
        </div>
    );
};
