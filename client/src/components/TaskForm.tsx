import React, { useState, useEffect } from 'react';
import type  {Task, TaskStatus, TaskPriority } from '../types';
import { fetchApi } from '../services/api';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // Función para recargar la lista en el Dashboard
  taskToEdit: Task | null; // Si es null, es una tarea nueva; si tiene datos, es edición
}

export default function TaskForm({ isOpen, onClose, onSave, taskToEdit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  // Efecto para llenar el formulario si estamos editando
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      // Formatear fecha para el input type="date"
      setDueDate(taskToEdit.due_date ? taskToEdit.due_date.split('T')[0] : '');
    } else {
      // Limpiar formulario para nueva tarea
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setDueDate('');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      title, 
      description, 
      status, 
      priority, 
      due_date: dueDate || undefined 
    };

    try {
      if (taskToEdit) {
        // Consumo de la API REST para edición (PUT)
        await fetchApi(`/tasks/${taskToEdit.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        // Consumo de la API REST para creación (POST)
        await fetchApi('/tasks', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      onSave(); // Actualizar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      alert('Hubo un error al guardar la tarea');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título *</label>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="mt-1 w-full p-2 border rounded bg-white"
              >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completada</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Prioridad</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="mt-1 w-full p-2 border rounded bg-white"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}