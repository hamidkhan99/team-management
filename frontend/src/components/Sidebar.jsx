import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, Users, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FolderKanban /> TeamFlow
                </h2>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <NavLink to="/dashboard" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <FolderKanban size={20} /> Projects
                </NavLink>
                <NavLink to="/members" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <Users size={20} /> Team Members
                </NavLink>
                <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
                    <button onClick={handleLogout} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left', background: 'none', color: '#ef4444' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
