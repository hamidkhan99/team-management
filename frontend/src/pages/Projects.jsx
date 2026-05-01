import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Users, Calendar, UserPlus, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [pRes, uRes] = await Promise.allSettled([
                api.get('/projects'),
                api.get('/users')
            ]);
            
            if (pRes.status === 'fulfilled') setProjects(pRes.value.data);
            if (uRes.status === 'fulfilled') setUsers(uRes.value.data);
        } catch (err) {
            console.error('Data fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', { ...newProject, admin: user.id });
            setShowModal(false);
            setNewProject({ name: '', description: '' });
            fetchData();
        } catch (err) {
            alert('Failed to create project');
        }
    };

    const handleAddMember = async (userId) => {
        try {
            await api.post(`/projects/${selectedProject}/members`, { userId });
            setShowMemberModal(false);
            fetchData();
        } catch (err) {
            alert('Failed to add member');
        }
    };

    return (
        <div className="main-content animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1>Projects</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Manage and monitor all your team initiatives.</p>
                </div>
                {user?.role === 'admin' && (
                    <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> New Project
                    </button>
                )}
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-muted)' }}>Loading projects...</div>
            ) : projects.length > 0 ? (
                <div className="project-grid">
                    {projects.map((project) => (
                        <div key={project._id} className="glass card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{project.name}</h3>
                                <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontWeight: '700' }}>
                                    {project.admin?.name || 'Admin'}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '16px 0', minHeight: '42px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {project.description || 'No description provided.'}
                            </p>
                            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                    <Users size={14} /> {project.members?.length || 0} Members
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                    <Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button 
                                    onClick={() => navigate(`/projects/${project._id}`)}
                                    className="btn btn-primary"
                                    style={{ flex: 1, fontSize: '12px', padding: '10px' }}
                                >
                                    View Board
                                </button>
                                {user?.role === 'admin' && (
                                    <button 
                                        onClick={() => { setSelectedProject(project._id); setShowMemberModal(true); }}
                                        className="btn"
                                        style={{ flex: 1, fontSize: '12px', padding: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                    >
                                        <UserPlus size={16} /> Invite
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px', padding: '40px', border: '2px dashed var(--border)', borderRadius: '16px' }}>
                    <FolderOpen size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                    <h3 style={{ color: 'var(--text-main)' }}>No Projects Found</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Create your first project to get started!</p>
                </div>
            )}

            {/* Project Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div className="glass card animate-fade" style={{ width: '400px' }}>
                        <h2 style={{ marginBottom: '24px' }}>Create Project</h2>
                        <form onSubmit={handleCreate}>
                            <label>Project Name</label>
                            <input type="text" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} required />
                            <label>Description</label>
                            <textarea 
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '16px', height: '100px', outline: 'none' }}
                                value={newProject.description}
                                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                            />
                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create</button>
                                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Member Modal */}
            {showMemberModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div className="glass card animate-fade" style={{ width: '400px' }}>
                        <h2 style={{ marginBottom: '16px' }}>Invite Team Members</h2>
                        <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                            {users.length > 0 ? users.filter(u => u._id !== user.id).map(u => (
                                <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{u.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                                    </div>
                                    <button onClick={() => handleAddMember(u._id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>Add</button>
                                </div>
                            )) : <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No other users found.</p>}
                        </div>
                        <button onClick={() => setShowMemberModal(false)} className="btn" style={{ width: '100%', marginTop: '16px', background: 'rgba(255,255,255,0.1)' }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
