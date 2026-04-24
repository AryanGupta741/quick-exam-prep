import React from 'react';
import { Grid, Paper, makeStyles, Typography, Box, IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
    '@global': {
        'input:-webkit-autofill': {
            '-webkit-box-shadow': `0 0 0 100px ${theme.palette.type === 'dark' ? '#1e293b' : '#fff'} inset !important`,
            '-webkit-text-fill-color': `${theme.palette.text.primary} !important`,
            'transition': 'background-color 5000s ease-in-out 0s',
        },
    },
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        transition: 'background-color 0.3s ease',
        position: 'relative',
    },
    container: {
        maxWidth: 1100,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: theme.palette.type === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'row',
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    formSection: {
        flex: 1,
        padding: theme.spacing(6, 8),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 3),
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent',
            '& fieldset': {
                borderColor: theme.palette.type === 'dark' ? '#334155' : '#eef2f6',
            },
            '&:hover fieldset': {
                borderColor: '#4a72ff',
            },
        },
        '& .MuiInputLabel-outlined': {
            color: theme.palette.text.secondary,
        },
        '& .MuiOutlinedInput-input': {
            color: theme.palette.text.primary,
        }
    },
    imageSection: {
        flex: 1,
        backgroundColor: theme.palette.type === 'dark' ? '#1e293b' : '#f0f4ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    illustration: {
        width: '80%',
        maxWidth: 400,
        marginBottom: theme.spacing(4),
        filter: theme.palette.type === 'dark' ? 'brightness(0.8) contrast(1.2)' : 'none',
    },
    dots: {
        display: 'flex',
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: theme.palette.type === 'dark' ? '#475569' : '#d1d9e6',
    },
    activeDot: {
        width: 24,
        backgroundColor: '#4a72ff',
        borderRadius: 10,
    },
    themeToggle: {
        position: 'absolute',
        top: 24,
        right: 24,
    }
}));

const AuthLayout = ({ children, title, subtitle }) => {
    const classes = useStyles();
    const { darkMode, toggleDarkMode } = useThemeContext();

    return (
        <div className={classes.root}>
            <IconButton onClick={toggleDarkMode} className={classes.themeToggle} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <div className={classes.container}>
                <div className={classes.formSection}>
                    <Box mb={4}>
                        <Typography variant="h4" style={{ fontWeight: 800, marginBottom: 8 }}>
                            {title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {subtitle}
                        </Typography>
                    </Box>
                    {children}
                </div>
                <div className={classes.imageSection}>
                    <img 
                        src="/assets/login_illustration.png" 
                        alt="Security Illustration" 
                        className={classes.illustration}
                    />
                    <div className={classes.dots}>
                        <div className={`${classes.dot} ${classes.activeDot}`}></div>
                        <div className={classes.dot}></div>
                        <div className={classes.dot}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
