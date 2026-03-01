import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type{ Task, TaskStatus } from '../types';
import { fetchApi } from '../services/api';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | TaskStatus>('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  
  const navigate = useNavigate(); // <-- Inicializamos el hook de navegación

  const loadTasks = async (statusFilter: 'All' | TaskStatus) => {
    try {
      const query = statusFilter !== 'All' ? `?status=${statusFilter}` : '';
      const data = await fetchApi(`/tasks${query}`);
      setTasks(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => { loadTasks(filter); }, [filter]);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await fetchApi(`/tasks/${id}`, { method: 'DELETE' });
        loadTasks(filter);
      } catch (error) {
        alert('Error al eliminar la tarea');
      }
    }
  };

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // <-- Función para Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Borramos el JWT
    navigate('/login'); // Redirigimos al login
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera, Botón Nueva Tarea y Botón Cerrar Sesión */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Tareas</h1>
          <div className="flex gap-4">
            <button 
              onClick={handleOpenCreate}
              className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
            >
              + Nueva Tarea
            </button>
            {/* <-- Botón de Logout */}
            <button 
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Filtros de estado */}
        <div className="flex gap-2 mb-6">
          {(['All', 'pending', 'in_progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors
                ${filter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-200'}`}
            >
              {status === 'All' ? 'Todas' : status.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Lista de Tareas */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border-l-4 border-blue-500">
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                {task.description && <p className="text-gray-500 text-sm mt-1">{task.description}</p>}
                
                <div className="mt-3 flex gap-2">
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase tracking-wide">
                    Prioridad: {task.priority}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded uppercase tracking-wide">
                    Estado: {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => handleOpenEdit(task)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </div>

            </div>
          ))}
          
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No hay tareas creadas. ¡Crea una nueva!</p>
          )}
        </div>
      </div>

      <TaskForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => loadTasks(filter)} 
        taskToEdit={taskToEdit} 
      />
    </div>
  );
}