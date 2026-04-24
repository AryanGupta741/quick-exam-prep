import React from "react"
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0, 1),
    },
    questionItem: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        display: 'flex',
        gap: 12,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? '#334155' : '#f8fafd',
            borderColor: '#4a72ff',
        }
    },
    activeItem: {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(74, 114, 255, 0.1)' : '#f0f4ff',
        borderColor: '#4a72ff',
        boxShadow: '0 4px 12px rgba(74, 114, 255, 0.1)',
    },
    indexBox: {
        minWidth: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: theme.palette.type === 'dark' ? '#334155' : '#f0f4ff',
        color: '#4a72ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.85rem',
    },
    activeIndexBox: {
        backgroundColor: '#4a72ff',
        color: '#fff',
    }
}))

function ShowNoOfQuestions(props){
    const classes = useStyles()

    return(
        <div className={classes.container}>
            <Box className={classes.header}>
                <Typography variant="subtitle2" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: props.theme?.palette?.text?.secondary || '#94a3b8' }}>
                    Questions ({props.questionsLength})
                </Typography>
                <Box bgcolor="#f0f4ff" color="#4a72ff" p={0.5} borderRadius={4} display="flex" style={{ cursor: 'pointer' }}>
                    <Typography style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</Typography>
                </Box>
            </Box>
            
            {props.questions.map((q, index) => {
                const isActive = props.quesNum === index;
                const status = props.questionsStatus[index];

                return (
                    <Paper 
                        key={index} 
                        elevation={0}
                        className={`${classes.questionItem} ${isActive ? classes.activeItem : ''}`}
                        onClick={() => props.setQuesNum(index)}
                    >
                        <div className={`${classes.indexBox} ${isActive ? classes.activeIndexBox : ''}`}>
                            {index + 1}
                        </div>
                        <Box flex={1}>
                            <Typography variant="body2" style={{ fontWeight: isActive ? 700 : 500, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {q.Q}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                {status === 1 ? (
                                    <CheckCircleIcon style={{ fontSize: 14, color: '#4caf50' }} />
                                ) : status === -1 ? (
                                    <CancelIcon style={{ fontSize: 14, color: '#f44336' }} />
                                ) : (
                                    <RadioButtonUncheckedIcon style={{ fontSize: 14, color: '#94a3b8' }} />
                                )}
                                <Typography variant="caption" style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>
                                    Multiple choice
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                )
            })}
        </div>
    )
}

export default ShowNoOfQuestions
