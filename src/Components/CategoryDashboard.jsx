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
        padding: theme.spacing(8, 6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
    },
    header: {
        marginBottom: theme.spacing(8),
        textAlign: 'center',
    },
    categoryCard: {
        padding: theme.spacing(5),
        borderRadius: 32,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: theme.palette.type === 'dark' ? '0 30px 60px rgba(0,0,0,0.5)' : '0 30px 60px rgba(99, 102, 241, 0.08)',
            borderColor: props => props.color || theme.palette.primary.main,
        },
    },
    iconBox: {
        width: 100,
        height: 100,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        margin: '0 auto 32px',
        backgroundColor: props => `${props.color}15` || 'rgba(99, 102, 241, 0.1)',
        color: props => props.color || theme.palette.primary.main,
        boxShadow: props => `0 12px 24px -8px ${props.color}40` || 'none',
    },
    startButton: {
        marginTop: 'auto',
        borderRadius: 16,
        textTransform: 'none',
        fontWeight: 800,
        padding: '12px 32px',
        fontSize: '0.9rem',
        boxShadow: props => `0 8px 20px -6px ${props.color}80` || 'none',
        '&:hover': {
            boxShadow: props => `0 12px 28px -6px ${props.color}A0` || 'none',
            transform: 'scale(1.02)',
        }
    },
    addCard: {
        border: `2px dashed ${theme.palette.divider}`,
        backgroundColor: 'transparent',
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(99, 102, 241, 0.05)' : '#f0f4ff',
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
