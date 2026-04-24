import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Link, Box, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            history.push('/');
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <AuthLayout 
            title="Login" 
            subtitle="Login to access your quiz account"
        >
            <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="john.doe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                
                {error && <Typography color="error" variant="body2" style={{ marginBottom: 16 }}>{error}</Typography>}

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={<Typography variant="body2">Remember me</Typography>}
                    />
                    <Link href="#" color="secondary" variant="body2" style={{ fontWeight: 600 }}>
                        Forgot Password
                    </Link>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    style={{ 
                        borderRadius: 12, 
                        padding: '12px', 
                        fontWeight: 700,
                        backgroundColor: '#4a72ff',
                        textTransform: 'none',
                        fontSize: '1rem'
                    }}
                >
                    Login
                </Button>

                <Box mt={3} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account? <Link onClick={() => history.push('/signup')} style={{ cursor: 'pointer', color: '#ff5c5c', fontWeight: 600 }}>Sign up</Link>
                    </Typography>
                </Box>

                <Box mt={4} textAlign="center" position="relative">
                    <Box display="flex" alignItems="center" mb={3}>
                        <Box flex={1} height="1px" bgcolor="divider" />
                        <Typography variant="body2" color="textSecondary" style={{ margin: '0 16px' }}>Or login with</Typography>
                        <Box flex={1} height="1px" bgcolor="divider" />
                    </Box>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                        <Button fullWidth variant="outlined" style={{ borderRadius: 12, borderColor: 'rgba(128,128,128,0.2)' }}>
                             <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
                        </Button>
                        <Button fullWidth variant="outlined" style={{ borderRadius: 12, borderColor: 'rgba(128,128,128,0.2)' }}>
                             <img src="https://img.icons8.com/ios-filled/24/000000/facebook-new.png" alt="Facebook" style={{ filter: 'invert(0.5)' }} />
                        </Button>
                        <Button fullWidth variant="outlined" style={{ borderRadius: 12, borderColor: 'rgba(128,128,128,0.2)' }}>
                             <img src="https://img.icons8.com/ios-filled/24/000000/mac-os.png" alt="Apple" style={{ filter: 'invert(0.5)' }} />
                        </Button>
                    </Box>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default Login;
