import * as React from 'react';
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../Themes/Theme';
import { makePostRequest } from '../Utils/requests';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Login() {
    const [error, setError] = useState();
    const { setAuth } = useContext(AuthContext)
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('email'),
            password: data.get('password')
        };

        if (
            !user.email ||
            !user.password
        ) {
            setError('Cannot include empty fields');
            return;
        }
        try{
            const res = await makePostRequest('http://localhost:3001/login', user);
            if (res.error){
                setError(res.errorMessage);
                return;
            }
            setAuth(res.token)
            localStorage.setItem('jwt', res.token)
        }
        catch(err){
            setError(err.errorMessage)
            console.log("error")
        }
        setError()
        
        // nav('/portal')
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Log In
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography
                                variant="h5"
                                sx={{ mt: 2 }}
                                color="#EC4622"
                            >
                                Error: {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
