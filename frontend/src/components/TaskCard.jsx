import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`bg-white shadow rounded-lg p-6 border-l-4 ${isCompleted ? 'border-green-500' : 'border-blue-500'} hover:shadow-md transition-shadow flex flex-col h-full`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {task.status}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{task.description}</p>

            <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span className={new Date(task.deadline) < new Date() && !isCompleted ? 'text-red-500 font-medium' : ''}>
                    {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                <Button
                    variant={isCompleted ? "secondary" : "success"}
                    className="flex-1 text-xs py-1.5 px-2"
                    onClick={() => onStatusChange(task._id, isCompleted ? 'Pending' : 'Completed')}
                >
                    {isCompleted ? <><XCircle className="h-3.5 w-3.5 mr-1" /> Reopen</> : <><CheckCircle className="h-3.5 w-3.5 mr-1" /> Complete</>}
                </Button>
                <Button
                    variant="secondary"
                    className="flex-1 text-xs py-1.5 px-2"
                    onClick={() => onEdit(task)}
                >
                    <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button
                    variant="danger"
                    className="flex-none px-3 py-1.5"
                    onClick={() => onDelete(task._id)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
};

export default TaskCard;
