import React, { createContext, useState, useEffect, useContext } from 'react';
import { categories as initialCategories, values as initialValues } from '../Components/values';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(initialCategories);
    const [questions, setQuestions] = useState(initialValues);

    const addCategory = (newCategory, newQuestions) => {
        setCategories(prev => [...prev, newCategory]);
        setQuestions(prev => ({
            ...prev,
            [newCategory.id]: newQuestions
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Server connection failed. Please ensure the backend is running." };
        }
    };

    const signup = async (username, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error("Signup Error:", error);
            return { success: false, message: "Server connection failed. Please ensure the backend is running." };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, categories, questions, addCategory }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
