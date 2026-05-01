import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Plus, Calendar, AlertCircle, User } from 'lucide-react';

const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', assignedTo: '' });

    const fetchData = async () => {
        try {
            const [pRes, tRes] = await Promise.all([
                api.get(`/projects`),
                api.get(`/tasks?project=${projectId}`)
            ]);
            const currentProject = pRes.data.find(p => p._id === projectId);
            setProject(currentProject);
            setTasks(tRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [projectId]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { ...newTask, project: projectId });
            setShowModal(false);
            setNewTask({ title: '', description: '', priority: 'medium', assignedTo: '' });
            fetchData();
        } catch (err) {
            alert('Failed to create task');
        }
    };

    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'completed', title: 'Completed' }
    ];

    const getPriorityColor = (p) => {
        switch(p) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#f59e0b';
            default: return '#10b981';
        }
    };

    return (
        <div className="main-content animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1>{project?.name || 'Project Board'}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{project?.description}</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Add Task
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {columns.map(col => (
                    <div key={col.id} className="glass" style={{ borderRadius: '16px', padding: '16px', minHeight: '600px', background: 'rgba(255,255,255,0.02)' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            {col.title}
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{tasks.filter(t => t.status === col.id).length}</span>
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {tasks.filter(t => t.status === col.id).map(task => (
                                <div key={task._id} className="glass card" style={{ padding: '16px', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: getPriorityColor(task.priority), border: `1px solid ${getPriorityColor(task.priority)}`, padding: '2px 8px', borderRadius: '4px' }}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <h4 style={{ marginBottom: '8px' }}>{task.title}</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{task.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                            <User size={12} /> {task.assignedTo?.name || 'Unassigned'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div className="glass card" style={{ width: '450px' }}>
                        <h2>Create New Task</h2>
                        <form onSubmit={handleCreateTask} style={{ marginTop: '20px' }}>
                            <label>Task Title</label>
                            <input type="text" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} required />
                            
                            <label>Description</label>
                            <textarea 
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '16px', height: '100px' }}
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label>Priority</label>
                                    <select 
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'white' }}
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                                    >
                                        <option value="low" style={{background: '#1a1d23'}}>Low</option>
                                        <option value="medium" style={{background: '#1a1d23'}}>Medium</option>
                                        <option value="high" style={{background: '#1a1d23'}}>High</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Assign To</label>
                                    <select 
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'white' }}
                                        value={newTask.assignedTo}
                                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                                    >
                                        <option value="" style={{background: '#1a1d23'}}>Unassigned</option>
                                        {project?.members?.map(m => (
                                            <option key={m._id} value={m._id} style={{background: '#1a1d23'}}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Task</button>
                                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskBoard;
