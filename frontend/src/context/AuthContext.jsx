import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        if (res.data && res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setUser(res.data.data);
            return res.data.data;
        }
    };

    const login = async (userData) => {
        const res = await api.post('/auth/login', userData);
        if (res.data && res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setUser(res.data.data);
            return res.data.data;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
