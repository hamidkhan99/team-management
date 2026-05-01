import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signup', formData);
            alert('Account created! Please login.');
            navigate('/login');
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Signup failed';
            alert(errorMsg);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass card animate-fade" style={{ width: '400px' }}>
                <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <label>Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    <label>Password</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    <label>Role</label>
                    <select 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', color: 'white', width: '100%', marginBottom: '16px' }}
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="member" style={{background: 'var(--bg-dark)'}}>Member</option>
                        <option value="admin" style={{background: 'var(--bg-dark)'}}>Admin</option>
                    </select>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
                </form>
                <p style={{ marginTop: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
