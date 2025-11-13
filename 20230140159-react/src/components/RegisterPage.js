import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  // State untuk semua field input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa'); // Default role: mahasiswa
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Kirim data ke endpoint POST /api/auth/register
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name: name, // Kirim field nama
        email: email,
        password: password,
        role: role // Kirim field role
      });

      // Tangani pesan sukses
      setSuccess(response.data.message || 'Registrasi berhasil! Mengarahkan ke Login...');
      
      // Arahkan pengguna ke halaman /login setelah sukses
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 

    } catch (err) {
      // Tangani error dari server
      setError(err.response ? err.response.data.message : 'Registrasi gagal. Server tidak merespons.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">
          Daftar Akun Baru
        </h2>
        
        {/* Pesan Sukses/Error */}
        {success && ( <p className="p-3 mb-4 bg-green-100 text-green-700 rounded-md text-center font-medium">{success}</p> )}
        {error && ( <p className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-center font-medium">{error}</p> )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input Nama */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Nama Lengkap:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {/* Input Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {/* Input Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {/* Input Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Register
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? 
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;