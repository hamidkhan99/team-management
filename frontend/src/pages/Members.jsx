import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { User, Mail, Shield } from 'lucide-react';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await api.get('/users');
                setMembers(res.data);
            } catch (err) {
                console.error('Failed to fetch members');
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) return <div className="main-content">Loading...</div>;

    return (
        <div className="main-content animate-fade">
            <header style={{ marginBottom: '32px' }}>
                <h1>Team Members</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your organization's team and roles.</p>
            </header>

            <div className="project-grid">
                {members.map((member) => (
                    <div key={member._id} className="glass card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px' }}>
                        <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                            <User size={32} color="white" />
                        </div>
                        <h3 style={{ margin: '8px 0' }}>{member.name}</h3>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
                            <Mail size={14} /> {member.email}
                        </p>
                        <span style={{ 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            background: member.role === 'admin' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(81, 92, 230, 0.1)',
                            color: member.role === 'admin' ? '#ff6b6b' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Shield size={12} /> {member.role?.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;
