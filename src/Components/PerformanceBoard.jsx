import React from 'react';
import { 
    Grid, Paper, Typography, Box, makeStyles, Avatar, 
    LinearProgress, Divider, Button, IconButton 
} from '@material-ui/core';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    AreaChart, Area
} from 'recharts';
import { useHistory } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useThemeContext } from '../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
    },
    card: {
        padding: theme.spacing(4),
        borderRadius: 24,
        boxShadow: theme.palette.type === 'dark' ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(99, 102, 241, 0.05)',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
    },
    statCard: {
        padding: theme.spacing(2.5),
        borderRadius: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.type === 'dark' ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        border: `1px solid ${theme.palette.divider}`,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        border: `4px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    chartContainer: {
        height: 320,
        width: '100%',
        marginTop: theme.spacing(2),
    },
    donutCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
}));

const PerformanceBoard = ({ results, user }) => {
    const classes = useStyles();
    const history = useHistory();
    const { darkMode, toggleDarkMode } = useThemeContext();
    const { correct, incorrect, unanswered, total } = results;
    const score = Math.round((correct / total) * 100);

    const axisColor = darkMode ? '#94a3b8' : '#64748b';
    const gridColor = darkMode ? '#334155' : '#f0f0f0';

    const pieData = [
        { name: 'Correct', value: correct, color: '#4caf50' },
        { name: 'Incorrect', value: incorrect, color: '#f44336' },
        { name: 'Unanswered', value: unanswered, color: darkMode ? '#475569' : '#9e9e9e' },
    ];

    const barData = [
        { name: 'Algebra', score: 85 },
        { name: 'Geometry', score: 65 },
        { name: 'Logic', score: 90 },
        { name: 'Arithmetic', score: 75 },
    ];

    const areaData = [
        { day: 'Mon', score: 40 },
        { day: 'Tue', score: 55 },
        { day: 'Wed', score: 48 },
        { day: 'Thu', score: 70 },
        { day: 'Fri', score: 85 },
        { day: 'Sat', score: 75 },
        { day: 'Sun', score: score },
    ];

    return (
        <div className={classes.root}>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                   
                    <Box>
                        <Typography variant="h4" style={{ fontWeight: 800 }}>
                            Performance Dashboard
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Great job, {user?.username}! Here is your detailed analysis.
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" gap={2} alignItems="center">
                    <Paper className={classes.statCard}>
                        <div className={classes.iconBox} style={{ backgroundColor: darkMode ? 'rgba(56, 178, 172, 0.1)' : '#e6fffa', color: '#38b2ac' }}>
                            <TrendingUpIcon />
                        </div>
                        <div>
                            <Typography variant="h6" style={{ fontWeight: 700 }}>{score}%</Typography>
                            <Typography variant="caption" color="textSecondary">Overall Score</Typography>
                        </div>
                    </Paper>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {/* Score Overview */}
                        <Grid item xs={12}>
                            <Paper className={classes.card}>
                                <Typography variant="h6" gutterBottom style={{ fontWeight: 700 }}>
                                    Examination Results
                                </Typography>
                                <div className={classes.chartContainer}>
                                     <ResponsiveContainer>
                                         <AreaChart data={areaData}>
                                             <defs>
                                                 <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                     <stop offset="5%" stopColor={darkMode ? '#818cf8' : '#6366f1'} stopOpacity={0.2}/>
                                                     <stop offset="95%" stopColor={darkMode ? '#818cf8' : '#6366f1'} stopOpacity={0}/>
                                                 </linearGradient>
                                             </defs>
                                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                             <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: axisColor}} />
                                             <YAxis hide />
                                             <Tooltip 
                                                 contentStyle={{ 
                                                     backgroundColor: darkMode ? '#1e293b' : '#fff',
                                                     border: `1px solid ${gridColor}`,
                                                     borderRadius: 12,
                                                     boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                                 }} 
                                             />
                                             <Area type="monotone" dataKey="score" stroke={darkMode ? '#818cf8' : '#6366f1'} strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                                         </AreaChart>
                                     </ResponsiveContainer>
                                 </div>
                            </Paper>
                        </Grid>

                        {/* Subject Breakdown */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.card}>
                                <Typography variant="h6" gutterBottom style={{ fontWeight: 700 }}>
                                    Subject Analysis
                                </Typography>
                                <div className={classes.chartContainer}>
                                     <ResponsiveContainer>
                                         <BarChart data={barData} layout="vertical">
                                             <XAxis type="number" hide />
                                             <YAxis 
                                                 dataKey="name" 
                                                 type="category" 
                                                 axisLine={false} 
                                                 tickLine={false} 
                                                 width={80} 
                                                 tick={{fill: axisColor, fontSize: 12, fontWeight: 600}}
                                             />
                                             <Tooltip 
                                                 contentStyle={{ 
                                                     backgroundColor: darkMode ? '#1e293b' : '#fff',
                                                     border: `1px solid ${gridColor}`,
                                                     borderRadius: 12
                                                 }}
                                             />
                                             <Bar dataKey="score" fill={darkMode ? '#818cf8' : '#6366f1'} radius={[0, 6, 6, 0]} barSize={24} />
                                         </BarChart>
                                     </ResponsiveContainer>
                                 </div>
                            </Paper>
                        </Grid>

                        {/* Distribution */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.card}>
                                <Typography variant="h6" gutterBottom style={{ fontWeight: 700 }}>
                                    Question Distribution
                                </Typography>
                                <div style={{ position: 'relative' }}>
                                    <div className={classes.chartContainer}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    innerRadius={80}
                                                    outerRadius={100}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ 
                                                        backgroundColor: darkMode ? '#1e293b' : '#fff',
                                                        border: `1px solid ${gridColor}`,
                                                        borderRadius: 8
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className={classes.donutCenter}>
                                        <Typography variant="h4" style={{ fontWeight: 800 }}>{total}</Typography>
                                        <Typography variant="caption" color="textSecondary">Total Qs</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        {/* Profile Summary */}
                        <Grid item xs={12}>
                            <Paper className={classes.card}>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={3}>
                                    <Avatar src={user?.avatar} className={classes.avatar} />
                                    <Typography variant="h6" style={{ fontWeight: 700, marginTop: 12 }}>
                                        {user?.username}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Student ID: #3457
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box mt={3}>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2" color="textSecondary">Accuracy</Typography>
                                        <Typography variant="body2" style={{ fontWeight: 600 }}>{score}%</Typography>
                                    </Box>
                                    <LinearProgress variant="determinate" value={score} className={classes.progressBar} color="primary" />
                                </Box>
                                <Box mt={3}>
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <CheckCircleIcon style={{ color: '#4caf50' }} />
                                        <Typography variant="body2"><strong>{correct}</strong> Correct Answers</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <CancelIcon style={{ color: '#f44336' }} />
                                        <Typography variant="body2"><strong>{incorrect}</strong> Wrong Answers</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Recommendation */}
                        <Grid item xs={12}>
                            <Paper className={classes.card} style={{ backgroundColor: darkMode ? '#4f46e5' : '#6366f1', color: '#fff', border: 'none', padding: '32px' }}>
                                <Typography variant="h6" gutterBottom style={{ fontWeight: 800 }}>
                                    Next Steps
                                </Typography>
                                <Typography variant="body1" style={{ opacity: 0.9, marginBottom: 24 }}>
                                    Focus more on Geometry and Arithmetic. You're doing great in Logic!
                                </Typography>
                                <Box>
                                    <Button 
                                        variant="contained" 
                                        style={{ backgroundColor: '#fff', color: '#6366f1', fontWeight: 800, borderRadius: 14, textTransform: 'none', padding: '10px 28px' }} 
                                        onClick={() => history.push('/dashboard')}
                                    >
                                        Return to Dashboard
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default PerformanceBoard;
