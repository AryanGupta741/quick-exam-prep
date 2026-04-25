import React from "react"
import { Typography, Box, Paper, Button, Switch } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ImageIcon from '@material-ui/icons/Image';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TimerIcon from '@material-ui/icons/Timer';
import StarIcon from '@material-ui/icons/Star';

import { pageStyle } from "./Style"


const Template = (props) => {
    let classes = pageStyle()

    return (
        <Paper className={classes.card} elevation={0}>
            {/* Header */}
            <Box className={classes.header}>
                <Box className={classes.badge}>
                    <ListIcon style={{ fontSize: 16 }} />
                    Multiple choice
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption" style={{ fontWeight: 700, color: '#64748b' }}>Required</Typography>
                        <Switch checked={true} size="small" color="primary" />
                    </Box>
                    <MoreHorizIcon style={{ color: '#94a3b8', cursor: 'pointer' }} />
                </Box>
            </Box>

            {/* Question Section */}
            <div className={classes.questionSection}>
                <div className={classes.questionTextContainer}>
                    <Typography variant="caption" style={{ color: '#4a72ff', fontWeight: 800, marginBottom: 8, display: 'block' }}>
                        QUESTION {props.quesNum + 1}*
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 700, color: '#1a202c', lineHeight: 1.5 }}>
                        {props.questions.Q}
                    </Typography>
                </div>
                <div className={classes.imagePlaceholder}>
                    <ImageIcon style={{ fontSize: 40, color: '#cbd5e1' }} />
                    <Box position="absolute" top={8} right={8} display="flex" gap={1}>
                        <Box bgcolor="#fff" p={0.5} borderRadius={4} display="flex" style={{ cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <ImageIcon style={{ fontSize: 16, color: '#64748b' }} />
                        </Box>
                        <Box bgcolor="#fff" p={0.5} borderRadius={4} display="flex" style={{ cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <DeleteOutlineIcon style={{ fontSize: 16, color: '#64748b' }} />
                        </Box>
                    </Box>
                </div>
            </div>

            {/* Options List */}
            <Box mb={4}>
                <Typography variant="caption" style={{ fontWeight: 800, color: '#94a3b8', marginBottom: 16, display: 'block' }}>
                    CHOICES*
                </Typography>
                <div className={classes.optionsContainer}>
                    {props.questions.O.map((option, index) => {
                        const isSelected = props.selectedOption === index;
                        const status = props.questionsStatus[props.quesNum];
                        
                        let customClass = classes.optionItem;
                        if (isSelected) {
                            if (status === 1) customClass += ` ${classes.correctOption}`;
                            else if (status === -1) customClass += ` ${classes.wrongOption}`;
                            else customClass += ` ${classes.selectedOption}`;
                        }

                        return (
                            <div 
                                key={index} 
                                className={customClass}
                                onClick={() => props.checkAnswer(props.quesNum, props.questions.A, option.value, index)}
                            >
                                <div className={`${classes.radio} ${isSelected ? classes.radioSelected : ''}`}>
                                    {isSelected && <div className={classes.radioInner} />}
                                </div>
                                <Typography variant="body2" style={{ fontWeight: 600, color: isSelected ? '#4a72ff' : '#475569', flex: 1 }}>
                                    {option.value}
                                </Typography>
                                <MoreHorizIcon style={{ color: '#cbd5e1', fontSize: 18 }} />
                            </div>
                        )
                    })}
                </div>
                <Box mt={2}>
                    <Button size="small" style={{ textTransform: 'none', color: '#4a72ff', fontWeight: 700, border: '1px dashed #4a72ff', borderRadius: 8, padding: '4px 16px' }}>
                        + Add answers
                    </Button>
                </Box>
            </Box>

            {/* Footer */}
            <div className={classes.footer}>
                <Box display="flex" gap={4}>
                    <Box>
                        <Typography variant="caption" style={{ color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Randomize Order</Typography>
                        <Typography variant="body2" style={{ fontWeight: 700, color: '#475569' }}>Keep choices in current order</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" style={{ color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Estimation time</Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" style={{ fontWeight: 700, color: '#475569' }}>2 Mins</Typography>
                            <TimerIcon style={{ fontSize: 16, color: '#94a3b8' }} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="caption" style={{ color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>Mark as point</Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" style={{ fontWeight: 700, color: '#475569' }}>1 Points</Typography>
                            <StarIcon style={{ fontSize: 16, color: '#f59e0b' }} />
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" gap={2}>
                    <Button 
                        variant="outlined" 
                        className={classes.navButton}
                        onClick={() => props.prevQuestion()} 
                        disabled={props.quesNum === 0}
                    >
                        Prev
                    </Button>
                    {props.quesNum === props.questionsLength - 1 ? (
                        <Button 
                            variant="contained" 
                            className={`${classes.navButton} ${classes.submitButton}`}
                            onClick={() => props.handleSubmit()}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.navButton}
                            onClick={() => props.nextQuestion()}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </div>
        </Paper>
    )

}

export default Template