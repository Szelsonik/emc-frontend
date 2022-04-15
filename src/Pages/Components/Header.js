import React, { useEffect } from "react";
import axios from 'axios'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Context from '../../Contexts/context'

const Header = (props) => {
    const [context, setContext] = React.useContext(Context)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [allUsers, setAllUsers] = React.useState([])
    let userInfo = []
    let avatarName = ''

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/info').then(res => {
            setAllUsers(res.data)
        })
    }, [])

    allUsers.map((user, key) => {
        if(user.id.toString() === context.userUsername) {
            userInfo = user
            //console.log(user)
            avatarName = user.username[0]
        }
    })

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    
    const toProfile = () => { window.location='/emc/profile' }
    const toAdminPanel = () => { window.location='/acp' }
    const toKartoteki = () => { window.location='/emc/records' }
    const toPatients = () => { window.location='/emc/patients' }
    const toVisits = () => { window.location='/emc/profile/my-visits' } 
    const toSettings = () => { window.location='/emc/profile/settings' }  
    const toMainPage = () => { window.location = '/emc' }
    const toAddVisit = () => { window.location = '/emc/add-new-visit' }
    
    const logOut = () => {
        setContext({
            isUserLogged: 'false'
        })
        localStorage.setItem('isUserLogged', 'false')
        window.location = '/'
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        EMC
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left", }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left", }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" }, }} >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" onClick={() => toMainPage()}>Strona główna</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" onClick={() => toAddVisit()}>Dodaj wizytę</Typography>
                            </MenuItem>
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >= 10 || userInfo.admin === 1) ? (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => toKartoteki()}>Kartoteki</Typography>
                                    </MenuItem>
                                ) : ''
                            }
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >= 10 || userInfo.admin === 1) ? (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => toPatients()}>Pacjenci</Typography>
                                    </MenuItem>
                                ) : ''
                            }
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} >
                        {props.site ? props.site : 'EMC'}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Button onClick={() => toMainPage()} sx={{ my: 2, color: "white", display: "block" }} >Strona główna</Button>
                            <Button onClick={() => toAddVisit()} sx={{ my: 2, color: "white", display: "block" }} >Dodaj wizytę</Button>
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >= 10 || userInfo.admin === 1) ? (
                                    <Button onClick={() => toKartoteki()} sx={{ my: 2, color: "white", display: "block" }} >Kartoteki</Button>
                                ) : ''
                            }
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >= 10 || userInfo.admin === 1) ? (
                                    <Button onClick={() => toPatients()} sx={{ my: 2, color: "white", display: "block" }} >Pacjenci</Button>
                                ) : ''
                            }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Użytkownik">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: userInfo.rcolor }}>
                                    {avatarName}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right", }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                            <Typography margin={2} variant="h7">
                                Cześć {userInfo.username}
                            </Typography>
                            <MenuItem onClick={() => toProfile()}>
                                <Typography textAlign="center">Profil</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => toVisits()}>
                                <Typography textAlign="center">Wizyty</Typography>
                            </MenuItem>
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >=99 || userInfo.admin === 1) ? (
                                    <MenuItem onClick={() => toKartoteki()}>
                                        <Typography textAlign="center">Kartoteki</Typography>
                                    </MenuItem>
                                ) : ''
                            }
                            {
                                (userInfo.doctor === 1 || userInfo.rpriv >=99 || userInfo.admin === 1) ? (
                                    <MenuItem onClick={() => toPatients()}>
                                        <Typography textAlign="center">Pacjenci</Typography>
                                    </MenuItem>
                                ) : ''
                            }
                            <MenuItem onClick={() => toSettings()}>
                                <Typography textAlign="center">Ustawienia konta</Typography>
                            </MenuItem>
                            {
                                (userInfo.admin === 1 || userInfo.rpriv >=99) ? (
                                    <MenuItem onClick={() => toAdminPanel()}>
                                        <Typography textAlign="center">Admin panel</Typography>
                                    </MenuItem>
                                ) : ''
                            }
                            <MenuItem onClick={() => logOut()}>
                                <Typography textAlign="center">Wyloguj</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
