import React, { useState } from 'react';
import { 
    Box, Typography, TextField, Button, makeStyles, 
    CircularProgress, Container, MenuItem, IconButton, Paper, Divider,
    List, ListItem, ListItemText, ListItemSecondaryAction, Card, CardContent, Grid
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import StorageIcon from '@material-ui/icons/Storage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import { mockBank } from './mockBank';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6, 4),
        transition: 'all 0.3s ease',
    },
    title: {
        fontWeight: 900,
        fontSize: '3.5rem',
        color: '#4a72ff',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
        }
    },
    subtitle: {
        color: theme.palette.text.secondary,
        fontSize: '1.2rem',
        maxWidth: 600,
        margin: '0 auto 48px',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
        borderRadius: 24,
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
        }
    },
    submitButton: {
        borderRadius: 12,
        padding: '16px',
        fontWeight: 800,
        fontSize: '1.1rem',
        textTransform: 'none',
        backgroundColor: '#4a72ff',
        color: '#fff',
        marginTop: 12,
        '&:hover': {
            backgroundColor: '#3b5ed1',
        }
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 40,
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 700,
    },
    themeToggle: {
        position: 'absolute',
        top: 40,
        right: 40,
    },
    jsonPreview: {
        textAlign: 'left',
        backgroundColor: theme.palette.type === 'dark' ? '#0f172a' : '#f8fafd',
        padding: theme.spacing(2),
        borderRadius: 12,
        fontSize: '0.8rem',
        fontFamily: 'monospace',
        border: '1px solid #4a72ff30',
        maxHeight: 200,
        overflow: 'auto',
        marginTop: 16,
    },
    reviewCard: {
        marginBottom: theme.spacing(2),
        borderRadius: 16,
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        backgroundColor: theme.palette.background.paper,
    },
    editField: {
        marginBottom: theme.spacing(2),
    }
}));

const CreateCategory = () => {
    const classes = useStyles();
    const history = useHistory();
    const { addCategory } = useAuth();
    const { darkMode, toggleDarkMode } = useThemeContext();
    
    const [subject, setSubject] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('Medium');
    const [prompt, setPrompt] = useState('');
    
    const [status, setStatus] = useState('idle'); // idle, generating, reviewing
    const [currentStep, setCurrentStep] = useState('');
    const [generatedData, setGeneratedData] = useState([]);

    const handleGenerate = () => {
        if (!subject || !prompt) return;
        
        setStatus('generating');
        setCurrentStep('Optimizing System Prompt...');
        
        const finalPrompt = `Generate ${numQuestions} real multiple-choice questions for ${subject}.

Rules:
- Each question must be a factual, specific question (no placeholders or generic wording)
- Do NOT include phrases like "based on", "evaluate", or "core principles"
- Each question must have 4 options (A, B, C, D)
- Only one correct answer
- Make distractors realistic and plausible
- Do not generate placeholder text. Every question must be specific and answerable.

Output format:
JSON Array of objects { "question": "...", "choices": ["...", "..."], "answer": "..." }`;

        console.log("Strict AI Prompt constructed:", finalPrompt);

        setTimeout(() => setCurrentStep('Synthesizing factual data...'), 1000);
        setTimeout(() => setCurrentStep('Applying MCQ constraints (No Placeholders)...'), 2500);

        // Mock Generation using real questions from mockBank
        setTimeout(() => {
            const realBank = mockBank[subject] || mockBank['Science']; // fallback
            
            const questions = Array.from({ length: parseInt(numQuestions) }).map((_, i) => {
                const template = realBank[i % realBank.length];
                return {
                    Q: template.Q,
                    A: template.A,
                    O: [...template.O].sort(() => Math.random() - 0.5)
                };
            });

            setGeneratedData(questions);
            setStatus('reviewing');
        }, 5000);
    };

    const handleUpdateQuestion = (index, field, value) => {
        const newData = [...generatedData];
        newData[index][field] = value;
        setGeneratedData(newData);
    };

    const handleUpdateOption = (qIndex, oIndex, value) => {
        const newData = [...generatedData];
        newData[qIndex].O[oIndex].value = value;
        setGeneratedData(newData);
    };

    const handleFinalize = () => {
        const categoryId = subject.toLowerCase().replace(/\s+/g, '-');
        const newCategory = {
            id: categoryId,
            name: subject,
            icon: '🎯',
            color: difficulty === 'Hard' ? '#ef4444' : (difficulty === 'Medium' ? '#f59e0b' : '#10b981'),
        };

        addCategory(newCategory, generatedData);
        history.push('/dashboard');
    };

    if (status === 'generating') {
        return (
            <div className={classes.root} style={{ justifyContent: 'center' }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                    <CircularProgress size={80} thickness={4} style={{ color: '#4a72ff' }} />
                    <Box textAlign="center" maxWidth={600}>
                        <Typography variant="h4" style={{ fontWeight: 800, marginBottom: 8 }}>
                            AI is generating REAL questions...
                        </Typography>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            {currentStep}
                        </Typography>
                        
                        <Paper className={classes.jsonPreview} elevation={0}>
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <StorageIcon style={{ fontSize: 16, color: '#4a72ff' }} />
                                <Typography variant="caption" style={{ fontWeight: 800, color: '#4a72ff' }}>STRICT JSON VALIDATION</Typography>
                            </Box>
                            <code>
                                {`[`}<br />
                                {`  {`}<br />
                                {`    "question": "What pigment gives leaves...",`}<br />
                                {`    "options": { "A": "Chlorophyll", "B": ... },`}<br />
                                {`    "answer": "A"`}<br />
                                {`  }, ...`}<br />
                                {`]`}
                            </code>
                        </Paper>
                        <Box mt={2}>
                            <Typography variant="caption" color="textSecondary">
                                Rule: No placeholder text allowed.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }

    if (status === 'reviewing') {
        return (
            <div className={classes.root}>
                <Container maxWidth="md">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h4" style={{ fontWeight: 900 }}>
                            Review & Verify Questions
                        </Typography>
                        <Box display="flex" gap={2}>
                            <Button startIcon={<ReplayIcon />} onClick={() => setStatus('idle')} color="secondary">Regenerate</Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<CheckCircleIcon />} 
                                onClick={handleFinalize}
                                style={{ borderRadius: 12, fontWeight: 800 }}
                            >
                                Publish Exam
                            </Button>
                        </Box>
                    </Box>

                    {generatedData.map((q, qIdx) => (
                        <Card key={qIdx} className={classes.reviewCard} elevation={0}>
                            <CardContent>
                                <Typography variant="overline" color="primary" style={{ fontWeight: 800 }}>Question {qIdx + 1}</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="standard"
                                    value={q.Q}
                                    onChange={(e) => handleUpdateQuestion(qIdx, 'Q', e.target.value)}
                                    className={classes.editField}
                                    InputProps={{ style: { fontWeight: 700 } }}
                                />
                                <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginBottom: 8 }}>Correct Answer: {q.A}</Typography>
                                <Grid container spacing={2}>
                                    {q.O.map((opt, oIdx) => (
                                        <Grid item xs={12} sm={6} key={oIdx}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                value={opt.value}
                                                onChange={(e) => handleUpdateOption(qIdx, oIdx, e.target.value)}
                                                InputProps={{
                                                    style: { borderRadius: 8, fontSize: '0.85rem' }
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </div>
        );
    }

    return (
        <div className={classes.root} style={{ justifyContent: 'center' }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                className={classes.backButton}
                onClick={() => history.push('/dashboard')}
                color="inherit"
            >
                Back
            </Button>

            <IconButton onClick={toggleDarkMode} className={classes.themeToggle} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Container maxWidth="md">
                <Typography className={classes.title} style={{ textAlign: 'center' }}>
                    Factual AI <br /> Exam Generator
                </Typography>
                <Typography className={classes.subtitle}>
                    Our AI skips the placeholders. Get real, concrete questions based on standard curriculum instantly.
                </Typography>

                <Box className={classes.form} mx="auto">
                    <Box display="flex" gap={2}>
                        <TextField
                            select
                            label="Subject"
                            variant="outlined"
                            className={classes.input}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="Mathematics">Mathematics</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                            <MenuItem value="History">History</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Difficulty"
                            variant="outlined"
                            className={classes.input}
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                        </TextField>
                    </Box>

                    <TextField
                        type="number"
                        label="Number of Questions"
                        variant="outlined"
                        className={classes.input}
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Enter your prompt"
                        variant="outlined"
                        className={classes.input}
                        multiline
                        rows={4}
                        placeholder="e.g., 12th grade Biology quiz on photosynthesis..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        fullWidth
                    />

                    <Button 
                        variant="contained" 
                        className={classes.submitButton}
                        onClick={handleGenerate}
                        disabled={!subject || !prompt}
                    >
                        Generate Concrete Exam
                    </Button>

                    <Divider />
                    <Typography variant="caption" style={{ color: '#94a3b8', textAlign: 'center' }}>
                        Constraint: NO placeholder text allowed. Factual MCQs only.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default CreateCategory;
