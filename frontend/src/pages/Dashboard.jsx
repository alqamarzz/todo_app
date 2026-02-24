import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Filter & Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [user, navigate]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            if (res.data.success) {
                setTasks(res.data.data);
            }
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (taskData) => {
        try {
            if (editingTask) {
                const res = await api.put(`/tasks/${editingTask._id}`, taskData);
                if (res.data.success) {
                    setTasks(tasks.map(t => t._id === editingTask._id ? res.data.data : t));
                }
            } else {
                const res = await api.post('/tasks', taskData);
                if (res.data.success) {
                    setTasks([res.data.data, ...tasks]);
                }
            }
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            alert(err.response?.data?.error || 'An error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await api.put(`/tasks/${id}`, { status: newStatus });
            if (res.data.success) {
                setTasks(tasks.map(t => t._id === id ? res.data.data : t));
            }
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const openFormForEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const openFormForCreate = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    // Derived state
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || task.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        pending: tasks.filter(t => t.status === 'Pending').length
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-l-4 border-blue-500">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Tasks</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-l-4 border-yellow-500">
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Tasks</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.pending}</dd>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-l-4 border-green-500">
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed Tasks</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.completed}</dd>
                    </div>
                </div>

                {/* Actions & Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex-1 w-full max-w-md relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="block w-full py-2 pl-3 pr-8 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md border"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <Button onClick={openFormForCreate} className="flex-shrink-0">
                            <Plus className="h-4 w-4 mr-1.5" /> New Task
                        </Button>
                    </div>
                </div>
            </div>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* Task Grid */}
            {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No tasks found. Try adjusting your filters or create a new task!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={openFormForEdit}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            {/* Reusable Form Modal */}
            <TaskForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateOrUpdate}
                editingTask={editingTask}
            />
        </div>
    );
};

export default Dashboard;
