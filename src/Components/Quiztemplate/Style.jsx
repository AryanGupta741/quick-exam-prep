import {makeStyles} from "@material-ui/core";

export const pageStyle = makeStyles( theme =>({
    card: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 16,
        padding: theme.spacing(4),
        boxShadow: theme.palette.type === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.04)',
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    badge: {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(74, 114, 255, 0.1)' : '#f0f4ff',
        color: '#4a72ff',
        padding: '4px 12px',
        borderRadius: 8,
        fontSize: '0.75rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    questionSection: {
        display: 'flex',
        gap: theme.spacing(4),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    questionTextContainer: {
        flex: 1,
        backgroundColor: theme.palette.type === 'dark' ? '#1e293b' : '#f8fafd',
        padding: theme.spacing(3),
        borderRadius: 12,
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
    },
    imagePlaceholder: {
        width: 300,
        height: 180,
        backgroundColor: theme.palette.type === 'dark' ? '#1e293b' : '#f0f4ff',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5),
    },
    optionItem: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: 12,
        border: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? '#334155' : '#f8fafd',
        }
    },
    selectedOption: {
        borderColor: '#4a72ff',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(74, 114, 255, 0.1)' : '#f0f4ff',
    },
    correctOption: {
        borderColor: '#4caf50',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(76, 175, 80, 0.1)' : '#e6fffa',
    },
    wrongOption: {
        borderColor: '#f44336',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(244, 67, 54, 0.1)' : '#fff5f5',
    },
    radio: {
        marginRight: theme.spacing(2),
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.type === 'dark' ? '#475569' : '#cbd5e1'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: '#4a72ff',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#4a72ff',
    },
    footer: {
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(3),
        borderTop: `1px solid ${theme.palette.type === 'dark' ? '#334155' : '#eef2f6'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        borderRadius: 10,
        padding: '10px 24px',
        textTransform: 'none',
        fontWeight: 700,
        boxShadow: 'none',
    },
    submitButton: {
        backgroundColor: '#4caf50',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#43a047',
        }
    }
}))