import React from "react"
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3, 2),
    },
    header: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0, 1),
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 700,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '&:hover': {
            transform: 'scale(1.1)',
            borderColor: theme.palette.primary.main,
        }
    },
    active: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#f0f4ff',
        color: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
    attempted: {
        backgroundColor: '#10b981', // Green
        borderColor: '#10b981',
        color: '#fff',
    },
    unattempted: {
        borderColor: '#ef4444', // Red
        color: '#ef4444',
    }
}))

function ShowNoOfQuestions(props){
    const classes = useStyles()

    return(
        <div className={classes.container}>
            <Box className={classes.header}>
                <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Questions Progress
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {props.questionsStatus.filter(s => s !== 0).length} of {props.questionsLength} answered
                </Typography>
            </Box>
            
            <div className={classes.grid}>
                {props.questions.map((q, index) => {
                    const isActive = props.quesNum === index;
                    const status = props.questionsStatus[index]; // 1 or -1 means answered, 0 means not

                    let customClass = classes.circle;
                    if (isActive) customClass += ` ${classes.active}`;
                    if (status !== 0) customClass += ` ${classes.attempted}`;
                    else if (!isActive) customClass += ` ${classes.unattempted}`;

                    return (
                        <div 
                            key={index} 
                            className={customClass}
                            onClick={() => props.setQuesNum(index)}
                            title={status !== 0 ? 'Answered' : 'Unanswered'}
                        >
                            {index + 1}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowNoOfQuestions
