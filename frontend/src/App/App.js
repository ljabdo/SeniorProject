import './App.css';
import SignUp from "./Pages/SignUp"
import { Home } from "./Pages/Home"
import { Portal } from "./Pages/Portal"
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from "./Themes/Theme"
import {BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path = '/signup'
            element={<SignUp/>}
          />
          <Route
            path = '/portal'
            element={<Portal/>}
          />
        </Routes>  
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
