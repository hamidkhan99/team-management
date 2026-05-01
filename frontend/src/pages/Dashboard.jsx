import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Clock, CheckCircle, Layout, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ pendingTasks: 0, completedTasks: 0, activeProjects: 0 });
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, projectsRes] = await Promise.all([
                    api.get('/dashboard/stats'),
                    api.get('/projects')
                ]);
                setStats(statsRes.data);
                setRecentProjects(projectsRes.data.slice(0, 3));
            } catch (err) {
                console.error('Failed to fetch dashboard data');
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="main-content animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Welcome, {user?.name}</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Here's what's happening today.</p>
                </div>
                {user?.role === 'admin' && (
                    <button onClick={() => navigate('/projects')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> New Project
                    </button>
                )}
            </header>

            <div className="stat-grid">
                <div className="glass card">
                    <Clock color="var(--primary)" style={{ marginBottom: '16px' }} />
                    <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{stats.pendingTasks}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Pending Tasks</p>
                </div>
                <div className="glass card">
                    <CheckCircle color="#10b981" style={{ marginBottom: '16px' }} />
                    <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{stats.completedTasks}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Completed</p>
                </div>
                <div className="glass card">
                    <Layout color="#f59e0b" style={{ marginBottom: '16px' }} />
                    <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{stats.activeProjects}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Active Projects</p>
                </div>
            </div>

            <section style={{ marginTop: '48px' }}>
                <h2 style={{ marginBottom: '24px' }}>Recent Projects</h2>
                <div className="project-grid">
                    {recentProjects.length > 0 ? recentProjects.map(project => (
                        <div key={project._id} className="glass card">
                            <h3>{project.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '12px 0' }}>{project.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                                    {project.members?.length || 0} Members
                                </span>
                                <button onClick={() => navigate(`/projects/${project._id}`)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                                    View Board
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p style={{ color: 'var(--text-muted)' }}>No projects found. Create one to get started!</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
