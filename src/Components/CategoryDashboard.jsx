import React from 'react';
import { Grid, Paper, Typography, Box, makeStyles, Button, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
    },
    header: {
        marginBottom: theme.spacing(6),
        textAlign: 'center',
    },
    categoryCard: {
        padding: theme.spacing(4),
        borderRadius: 24,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: theme.palette.type === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.08)',
            borderColor: props => props.color || '#4a72ff',
        },
    },
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        margin: '0 auto 24px',
        backgroundColor: props => `${props.color}20` || '#f0f4ff',
        color: props => props.color || '#4a72ff',
    },
    startButton: {
        marginTop: 'auto',
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 700,
        padding: '8px 24px',
    },
    addCard: {
        border: `2px dashed ${theme.palette.type === 'dark' ? '#475569' : '#cbd5e1'}`,
        backgroundColor: 'transparent',
        '&:hover': {
            borderColor: '#4a72ff',
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(74, 114, 255, 0.1)' : '#f0f4ff',
        }
    }
}));

const CategoryCard = ({ category }) => {
    const classes = useStyles({ color: category.color });
    const history = useHistory();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper 
                className={classes.categoryCard} 
                elevation={0}
                onClick={() => history.push(`/quiz/${category.id}`)}
            >
                <div className={classes.iconBox}>
                    {category.icon}
                </div>
                <Typography variant="h5" style={{ fontWeight: 800, marginBottom: 8 }}>
                    {category.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: 20 }}>
                    Test your knowledge in {category.name} with our curated questions.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.startButton}
                    style={{ backgroundColor: category.color, color: '#fff' }}
                >
                    Start Exam
                </Button>
            </Paper>
        </Grid>
    );
};

const CategoryDashboard = () => {
    const classes = useStyles({ color: '#4a72ff' });
    const history = useHistory();
    const { user, logout, categories } = useAuth();
    const { darkMode, toggleDarkMode } = useThemeContext();

    return (
        <div className={classes.root}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
                <Typography variant="h4" style={{ fontWeight: 800 }}>
                    Exam Dashboard
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={toggleDarkMode} color="inherit">
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Typography variant="body1">Hello, <strong>{user?.username}</strong></Typography>
                    <Button variant="outlined" color="secondary" onClick={logout} style={{ borderRadius: 10 }}>Logout</Button>
                </Box>
            </Box>

            <div className={classes.header}>
                <Typography variant="h3" style={{ fontWeight: 900, marginBottom: 16 }}>
                    Select Your Category
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Choose a subject or create your own custom exam
                </Typography>
            </div>

            <Grid container spacing={4}>
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
                
                {/* Add More Category Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper 
                        className={`${classes.categoryCard} ${classes.addCard}`} 
                        elevation={0}
                        onClick={() => history.push('/create-category')}
                    >
                        <AddCircleOutlineIcon style={{ fontSize: 60, color: '#4a72ff', margin: '0 auto 16px' }} />
                        <Typography variant="h5" style={{ fontWeight: 800, color: '#4a72ff', marginBottom: 8 }}>
                            Add More Category
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Generate a custom exam based on your specific needs using AI.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default CategoryDashboard;
