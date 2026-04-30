import {makeStyles} from "@material-ui/core";

export const pageStyle = makeStyles( theme =>({
    card: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 24,
        padding: theme.spacing(5),
        boxShadow: theme.palette.type === 'dark' ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(99, 102, 241, 0.05)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
    },
    badge: {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(99, 102, 241, 0.15)' : '#f0f4ff',
        color: theme.palette.primary.main,
        padding: '6px 16px',
        borderRadius: 12,
        fontSize: '0.8rem',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    },
    questionSection: {
        display: 'flex',
        gap: theme.spacing(5),
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    questionTextContainer: {
        flex: 1,
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc',
        padding: theme.spacing(4),
        borderRadius: 20,
        border: `1px solid ${theme.palette.divider}`,
    },
    imagePlaceholder: {
        width: 320,
        height: 200,
        backgroundColor: theme.palette.type === 'dark' ? '#1e293b' : '#f1f5f9',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    optionItem: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2.5),
        borderRadius: 16,
        border: `2px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(99, 102, 241, 0.05)' : '#f0f4ff',
            transform: 'translateX(4px)',
        }
    },
    selectedOption: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#f0f4ff',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
    },
    correctOption: {
        borderColor: '#10b981',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5',
    },
    wrongOption: {
        borderColor: '#ef4444',
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
    },
    radio: {
        marginRight: theme.spacing(2.5),
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.type === 'dark' ? '#475569' : '#cbd5e1'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    },
    radioSelected: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#fff',
    },
    footer: {
        marginTop: theme.spacing(5),
        paddingTop: theme.spacing(4),
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        borderRadius: 14,
        padding: '12px 32px',
        textTransform: 'none',
        fontWeight: 700,
        boxShadow: 'none',
        fontSize: '0.95rem',
    },
    submitButton: {
        backgroundColor: '#10b981',
        color: '#fff',
        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
        '&:hover': {
            backgroundColor: '#059669',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.2)',
            transform: 'translateY(-1px)',
        }
    }
}))