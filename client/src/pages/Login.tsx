import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchApi('/login', { // [cite: 31]
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-6 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Ingresar
        </button>
      </form>
    </div>
  );
}