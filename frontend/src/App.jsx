import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TaskBoard from './pages/TaskBoard';
import Members from './pages/Members';
import Sidebar from './components/Sidebar';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            {children}
        </div>
    ) : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                    <Route path="/projects/:projectId" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
                    <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
