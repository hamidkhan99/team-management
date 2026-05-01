import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.user, res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass card animate-fade" style={{ width: '400px' }}>
                <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
