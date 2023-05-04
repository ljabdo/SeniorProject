import './App.css';
import React, { useEffect, useState} from 'react'
import SignUp from './Pages/SignUp';
import { Home } from './Pages/Home';
import { Portal } from './Pages/Portal';
import Login from './Pages/Login'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './Themes/Theme';
// import { verify } from 'jsonwebtoken'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

    const [accessToken, setAccessToken] = useState(localStorage.getItem('jwt'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(parseJwt(accessToken))
    })

    
    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/portal" element={<Portal />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

function parseJwt(token) {
    if (!token)
        return null;
    // var decoded = verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
}

export default App;
