import React, {useState, useEffect} from "react"
import {Grid, makeStyles, Box, Button, Typography, IconButton} from "@material-ui/core"
import { useParams, useHistory } from "react-router-dom"
import Template from "./Quiztemplate/Template"
import ShowNoOfQuestions from "./ShowNoOfQuestions"
import Hint from "./Hint"
import { useAuth } from "../context/AuthContext"
import { useThemeContext } from "../context/ThemeContext"
import PerformanceBoard from "./PerformanceBoard"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const  pageStyle = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
    },
    sidebar: {
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
    },
    mainContent: {
        padding: theme.spacing(4),
    },
    searchBar: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 12,
        padding: theme.spacing(1, 2),
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        marginBottom: theme.spacing(4),
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
    },
}))


const Quizs = () => {
    const classes = pageStyle()
    const { user, logout, categories, questions: allQuestions } = useAuth()
    const { darkMode, toggleDarkMode } = useThemeContext()
    const { category: categoryId } = useParams()
    const history = useHistory()

    const categoryData = categories.find(c => c.id === categoryId)
    const categoryQuestions = allQuestions[categoryId] || []
    
    let [quesNum, setQuesNum] = useState(0)
    let questions = categoryQuestions[quesNum]
    let questionsLength = categoryQuestions.length

    let [questionsStatus, setQuestionsStatus] = useState(Array(questionsLength).fill(0))
    let [selectedOptions, setSelectedOptions] = useState(Array(questionsLength).fill(null))
    let [submitted, setSubmitted] = useState(false)
    let [results, setResults] = useState(null)

    useEffect(() => {
        setQuesNum(0);
        setQuestionsStatus(Array(categoryQuestions.length).fill(0));
        setSelectedOptions(Array(categoryQuestions.length).fill(null));
        setSubmitted(false);
        setResults(null);
    }, [categoryId, categoryQuestions.length]);

    const handleSubmit = () => {
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        questionsStatus.forEach(status => {
            if (status === 1) correct++;
            else if (status === -1) incorrect++;
            else unanswered++;
        });

        setResults({ correct, incorrect, unanswered, total: questionsLength });
        setSubmitted(true);
    };

    const checkAnswer = (questionNumber, correctAnswer, chosenValue, index) => {
        if (selectedOptions[questionNumber] !== null) return;

        setSelectedOptions(prev => {
            let next = [...prev];
            next[questionNumber] = index;
            return next;
        });

        setQuestionsStatus(() => {
            let newArrayValues =  questionsStatus.map((val, idx) => {
                if (questionNumber === idx) {
                    if (correctAnswer === chosenValue) {
                        return 1
                    } else {
                        return -1
                    }
                } else {
                    return val
                }
            })
            return newArrayValues
        })
    }

    const nextQuestion = () => {
        setQuesNum(quesNum + 1)
    }

    const prevQuestion = () => {
        setQuesNum(quesNum - 1)
    }

    if (submitted && results) {
        return <PerformanceBoard results={results} user={user} />;
    }

    if (!categoryQuestions.length) {
        return (
            <Box p={4} textAlign="center">
                <Typography variant="h5">No questions found for this category.</Typography>
                <Button onClick={() => history.push('/dashboard')}>Back to Dashboard</Button>
            </Box>
        )
    }

    return (
            <div className={classes.root}>
                <Box p={2} display="flex" justifyContent="space-between" alignItems="center" bgcolor="background.paper" borderBottom={`1px solid ${darkMode ? '#334155' : '#eef2f6'}`}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Button 
                            startIcon={<ArrowBackIcon />} 
                            onClick={() => history.push('/dashboard')}
                            style={{ textTransform: 'none', fontWeight: 700 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h6" style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Box bgcolor={categoryData?.color || "#4a72ff"} color="#fff" p={0.5} borderRadius={4} display="flex">
                                <span style={{ fontSize: '0.8rem' }}>{categoryData?.icon || 'Q'}</span>
                            </Box>
                            {categoryData?.name} Exam
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton onClick={toggleDarkMode} color="inherit">
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <Typography variant="body2">Welcome, <strong>{user?.username}</strong></Typography>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            size="small" 
                            onClick={logout}
                            style={{ borderRadius: 8, textTransform: 'none' }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
                <Grid container>
                    <Grid item xs={12} sm={3} className={classes.sidebar}>
                        <ShowNoOfQuestions
                            quesNum={quesNum}
                            questionsLength={questionsLength}
                            questionsStatus={questionsStatus}
                            setQuesNum={setQuesNum}
                            questions={categoryQuestions}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} className={classes.mainContent}>
                        <Box className={classes.searchBar}>
                            <Typography color="textSecondary" style={{ marginRight: 12 }}>
                                <span role="img" aria-label="search">🔍</span>
                            </Typography>
                            <Typography color="textSecondary" variant="body2">Search for questions in {categoryData?.name}...</Typography>
                        </Box>
                        <Template
                            quesNum={quesNum}
                            questions={questions}
                            questionsLength={questionsLength}
                            nextQuestion={nextQuestion}
                            prevQuestion={prevQuestion}
                            questionsStatus={questionsStatus}
                            checkAnswer={checkAnswer}
                            selectedOption={selectedOptions[quesNum]}
                            handleSubmit={handleSubmit}
                        />
                        <Hint />
                    </Grid>
                </Grid>
            </div>
        )
}

export default Quizs
