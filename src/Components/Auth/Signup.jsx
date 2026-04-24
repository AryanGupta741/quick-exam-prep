import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await signup(username, email, password);
        if (result.success) {
            history.push('/');
        } else {
            setError(result.message || 'Signup failed');
        }
    };

    return (
        <AuthLayout 
            title="Create Account" 
            subtitle="Start your quiz journey with us"
        >
            <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        placeholder="johndoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
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
                <Box mb={3}>
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
                    Sign Up
                </Button>

                <Box mt={3} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        Already have an account? <Link onClick={() => history.push('/login')} style={{ cursor: 'pointer', color: '#ff5c5c', fontWeight: 600 }}>Login</Link>
                    </Typography>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default Signup;
