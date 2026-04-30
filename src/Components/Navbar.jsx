import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles, Box } from '@material-ui/core';
import { Brightness4, Brightness7, ExitToApp, Dashboard, AddCircle, AccountCircle, ArrowBack } from '@material-ui/icons';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        letterSpacing: '1px',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useThemeContext();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/';

    if (!user) return null;

    return (
        <AppBar position="sticky" color="inherit" elevation={2}>
            <Toolbar>
                {!isDashboard && (
                    <Button 
                        color="inherit" 
                        onClick={() => history.push('/dashboard')}
                        startIcon={<ArrowBack />}
                        style={{ marginRight: '16px', textTransform: 'none', fontWeight: 700 }}
                    >
                        Back
                    </Button>
                )}
                <Typography variant="h6" className={classes.title} component={Link} to="/dashboard">
                    <img 
                        src="/assets/logo.png" 
                        alt="Logo" 
                        style={{ height: '30px', marginRight: '10px', verticalAlign: 'middle', borderRadius: '4px' }} 
                    />
                    QuizMaster
                </Typography>
                <div className={classes.navLinks}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/dashboard" 
                        startIcon={<Dashboard />}
                        className={classes.button}
                    >
                        Dashboard
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/create-category" 
                        startIcon={<AddCircle />}
                        className={classes.button}
                    >
                        New Category
                    </Button>
                    <IconButton color="inherit" onClick={toggleDarkMode} className={classes.button} title="Toggle Theme">
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    
                    <Box display="flex" alignItems="center" px={2} style={{ borderLeft: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', marginLeft: '8px' }}>
                        <AccountCircle style={{ marginRight: '8px', color: '#4a72ff' }} />
                        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                            {user?.username}
                        </Typography>
                    </Box>

                    <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={handleLogout} 
                        startIcon={<ExitToApp />}
                        className={classes.button}
                    >
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
