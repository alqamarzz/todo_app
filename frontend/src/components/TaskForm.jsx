import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { X } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, editingTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || '',
                description: editingTask.description || '',
                deadline: editingTask.deadline ? new Date(editingTask.deadline).toISOString().split('T')[0] : '',
                status: editingTask.status || 'Pending'
            });
        } else {
            setFormData({ title: '', description: '', deadline: '', status: 'Pending' });
        }
    }, [editingTask, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-5 border-b pb-3">
                            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                                {editingTask ? 'Edit Task' : 'Add New Task'}
                            </h3>
                            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Task Title"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g., Complete project report"
                            />

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Outline the key points for Q3..."
                                />
                            </div>

                            <Input
                                label="Deadline"
                                id="deadline"
                                name="deadline"
                                type="date"
                                required
                                value={formData.deadline}
                                onChange={handleChange}
                                min={!editingTask ? new Date().toISOString().split('T')[0] : undefined}
                            />

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                <Button type="button" variant="secondary" onClick={onClose} className="w-full sm:w-auto">
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full sm:w-auto">
                                    {editingTask ? 'Save Changes' : 'Create Task'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
