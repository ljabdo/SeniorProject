import './App.css';
import React, { useEffect, useState} from 'react'
import SignUp from './Pages/SignUp';
import { Home } from './Pages/Home';
import { Portal } from './Pages/Portal';
import { NotFound } from './Pages/NotFound'
import Login from './Pages/Login'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './Themes/Theme';
import jwtDecode from 'jwt-decode'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export const AuthContext = React.createContext();

function App() { 

    const [accessToken, setAccessToken] = useState(localStorage.getItem('jwt'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(parseJwt(accessToken))
    }, [accessToken])

    const loginRequired = (component) => {
        return accessToken ? component : <Navigate to='/login' />;
    };

    const loggedInRedirect = (component) => {
        return accessToken ? <Navigate to='/portal' /> : component;
    };

    
    return (
        <AuthContext.Provider
            value={{
                auth: accessToken,
                setAuth: setAccessToken,
                user,
            }}
        >
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={loggedInRedirect(<SignUp />)} />
                        <Route path="/portal" element={loginRequired(<Portal />)} />
                        <Route path="/login" element={loggedInRedirect(<Login />)} />
                        <Route exact path="/404" element={<NotFound/>} />
                        <Route path ='*' element = {<Navigate to='/404'/>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

function parseJwt(token) {
    if (!token)
        return null;
    var decoded = jwtDecode(token)
    return decoded
}

export default App;
