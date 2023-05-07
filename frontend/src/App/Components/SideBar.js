import Box from '@mui/material/Box'
import './Portal.css'
import { Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '../Assets/logout.svg';
import LogoutClosedIcon from '../Assets/logout_closed.svg';
import ProfileIcon from '../Assets/empty_profile.svg';
import ProfileFilledIcon from '../Assets/filled_profile.svg';
import Home from '../Assets/home.svg';

export const SideBar = () => {

    const [hoverLogout, setHoverLogout] = useState(false);
    const [hoverProfile, setHoverProfile] = useState(false);
    const { setAuth, user } = useContext(AuthContext);
    const nav = useNavigate();

    const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem('jwt');
        nav('/');
    };

    const handleProfile = () => {
        nav(`/profile/${user.username}`);
    };

    const handleHome = () => {
        nav('/');
    };

    return(
        <div className="SideBar">
             <Grid 
                container
                // justify='center' 
                // direction='column'
                // alignItems="center"
                >
             <Grid item
                style={{
                    height: "10%",
                    width: "100%",
                    cursor: 'pointer',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onClick={handleHome}
            >
                <img src={Home} alt='Home'/>
            </Grid>

            {/* <Grid item
                onClick={handleProfile}
                style={{
                    height: "10%",
                    width: "100%",
                    cursor: 'pointer',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onMouseOver={() => setHoverProfile(true)}
                onMouseLeave={() => setHoverProfile(false)}
            >
                {!hoverProfile ? (
                    <img src={ProfileIcon} alt='Profile' />
                ) : (
                    <img src={ProfileFilledIcon} alt='Profile' />
                )}
            </Grid> */}
            <Grid item
                onClick={handleLogout}
                style={{    
                    height: "10%",
                    width: "100%",
                    cursor: 'pointer',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onMouseOver={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
            >
                {!hoverLogout ? (
                    <img src={LogoutClosedIcon} alt='Logout' />
                ) : (
                    <img src={LogoutIcon} alt='Logout' />
                )}
            </Grid>
            <div
                style={{
                    flex: 0,
                }}
            />
        </Grid>
    </div>
    )
}




// import { Grid } from '@mui/material';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../App';
// import { useNavigate } from 'react-router-dom';

// import LogoutIcon from '../assets/logout.svg';
// import LogoutClosedIcon from '../assets/logout_closed.svg';
// import ProfileIcon from '../assets/empty_profile.svg';
// import ProfileFilledIcon from '../assets/filled_profile.svg';
// import Home from '../assets/home.svg';

// export const Header = () => {
//     const [hoverLogout, setHoverLogout] = useState(false);
//     const [hoverProfile, setHoverProfile] = useState(false);
//     const { setAuth, user } = useContext(AuthContext);
//     const nav = useNavigate();

//     const handleLogout = () => {
//         setAuth(null);
//         localStorage.removeItem('jwt');
//         nav('/');
//     };

//     const handleProfile = () => {
//         nav(`/profile/${user.username}`);
//     };

//     const handleHome = () => {
//         nav('/portal');
//     };

//     return (
//         <Grid container justifyContent='flex-end'>
//             <div
//                 style={{
//                     paddingLeft: 10,
//                     paddingTop: 10,
//                     cursor: 'pointer',
//                 }}
//                 onClick={handleHome}
//             >
//                 <img src={Home} alt='Home' />
//             </div>
            // <div
            //     style={{
            //         flex: 1,
            //     }}
            // />
//             <div
//                 onClick={handleProfile}
//                 style={{
//                     paddingRight: 10,
//                     paddingTop: 10,
//                     cursor: 'pointer',
//                 }}
//                 onMouseOver={() => setHoverProfile(true)}
//                 onMouseLeave={() => setHoverProfile(false)}
//             >
//                 {!hoverProfile ? (
//                     <img src={ProfileIcon} alt='Profile' />
//                 ) : (
//                     <img src={ProfileFilledIcon} alt='Profile' />
//                 )}
//             </div>
//             <div
//                 onClick={handleLogout}
//                 style={{
//                     paddingRight: 10,
//                     paddingTop: 10,
//                     cursor: 'pointer',
//                 }}
//                 onMouseOver={() => setHoverLogout(true)}
//                 onMouseLeave={() => setHoverLogout(false)}
//             >
//                 {!hoverLogout ? (
//                     <img src={LogoutClosedIcon} alt='Logout' />
//                 ) : (
//                     <img src={LogoutIcon} alt='Logout' />
//                 )}
//             </div>
//         </Grid>
//     );
// };