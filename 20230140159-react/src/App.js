import React, { useState, useReducer, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, Settings, Zap, UserPlus } from 'lucide-react'; 
// Pastikan Anda sudah menjalankan: npm install lucide-react react-router-dom

// --- Reducer for Authentication State ---
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

// --- Komponen RegisterPage (Halaman Pendaftaran) ---
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Fungsi Mock untuk menggantikan axios.post (untuk demonstrasi di sini)
  const mockRegister = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Asumsi registrasi sukses
        if (data.email && data.name && data.password) {
          resolve({ data: { message: 'Registrasi berhasil! Silakan Login.' } });
        } else {
          reject({ response: { data: { message: 'Semua field wajib diisi.' } } });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Menggunakan mockRegister sebagai pengganti axios.post
      const response = await mockRegister({ name, email, password, role }); 

      setSuccess(response.data.message || 'Registrasi berhasil! Mengarahkan ke Login...');
      
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Registrasi gagal. Server tidak merespons.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 hover:shadow-indigo-500/50">
        <div className="text-center mb-6">
            <UserPlus className="w-10 h-10 mx-auto text-indigo-400 mb-2" />
            <h2 className="text-3xl font-extrabold text-white">Buat Akun Baru</h2>
        </div>
        
        {/* Pesan Sukses/Error */}
        {success && ( <p className="p-3 mb-4 bg-green-800 text-green-300 rounded-lg text-center font-medium shadow-inner">{success}</p> )}
        {error && ( <p className="p-3 mb-4 bg-red-800 text-red-300 rounded-lg text-center font-medium shadow-inner">{error}</p> )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama */}
          <input
            id="name"
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />

          {/* Input Email */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />

          {/* Input Password */}
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />

          {/* Input Role */}
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.01]"
          >
            Register
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Sudah punya akun? 
          <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 ml-1 transition duration-150">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}


// --- Komponen LoginPage (Halaman Masuk) ---
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Kredensial Mock Login: Gunakan user@app.com dan 123
    if (email === "user@app.com" && password === "123") {
      onLogin({ name: "Pengguna Uji", email });
      navigate('/dashboard'); // Arahkan ke dashboard setelah login
    } else {
        setError('Email atau Password salah. Gunakan user@app.com dan 123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50">
        <div className="text-center mb-6">
          <Zap className="w-10 h-10 mx-auto text-cyan-400 mb-2" />
          <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
        </div>

        {error && ( <p className="p-3 mb-4 bg-red-800 text-red-300 rounded-lg text-center font-medium shadow-inner">{error}</p> )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email (e.g., user@app.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password (e.g., 123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-600/30 hover:bg-cyan-500 transition-transform duration-200 transform hover:scale-[1.01]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Belum punya akun? 
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

// --- Komponen DashboardContent (Halaman Dashboard) ---
const DashboardContent = ({ user, onLogout }) => {
  const metrics = useMemo(() => ([
    { title: "Active Projects", value: "14", icon: <LayoutDashboard className="w-6 h-6 text-indigo-400" /> },
    { title: "Team Members", value: "8", icon: <User className="w-6 h-6 text-green-400" /> },
    { title: "Task Completion", value: "92%", icon: <Zap className="w-6 h-6 text-yellow-400" /> },
    { title: "Settings Updated", value: "3 days ago", icon: <Settings className="w-6 h-6 text-pink-400" /> },
  ]), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Zap className="w-6 h-6 text-indigo-600 mr-2" />
          Creative Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-red-600 text-white font-semibold text-sm rounded-full shadow-md hover:bg-red-700 transition-all duration-200 transform hover:scale-[1.05]"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 md:p-10 rounded-2xl shadow-xl mb-8 text-white">
          <h2 className="text-4xl font-extrabold mb-2">
            Login Sukses!
          </h2>
          <p className="text-xl font-light">
            Selamat Datang, **{user?.name || 'Pengguna Kreatif'}**! Mari kita wujudkan ide-ide brilian hari ini.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2">Overview Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-medium text-gray-500">{metric.title}</p>
                {metric.icon}
              </div>
              <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Placeholder Content Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Tasks</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150">
              <span className="text-gray-700">Review monthly report</span>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Open</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150">
              <span className="text-gray-700">Organize sprint planning meeting</span>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Open</button>
            </li>
          </ul>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full p-4 bg-gray-800 text-center text-gray-400 text-sm mt-8">
        &copy; {new Date().getFullYear()} CreativeApp Dashboard. All rights reserved.
      </footer>
    </div>
  );
};


// --- Komponen App Utama (Menggunakan Router) ---
// Ini adalah komponen yang bertanggung jawab untuk menentukan tampilan mana
// yang akan muncul berdasarkan URL (path: /, /login, /register, /dashboard)
const AuthWrapper = () => {
    const [authState, dispatch] = useReducer(authReducer, { isLoggedIn: false, user: null });
    const navigate = useNavigate();

    const handleLogin = (user) => {
        dispatch({ type: 'LOGIN', payload: user });
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <Routes>
            {/* 1. Route untuk Halaman Register (Ini yang Anda cari) */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* 2. Route untuk Halaman Login */}
            <Route path="/login" element={
                authState.isLoggedIn ? (
                    <DashboardContent user={authState.user} onLogout={handleLogout} />
                ) : (
                    <LoginPage onLogin={handleLogin} />
                )
            } />

            {/* 3. Route untuk Halaman Dashboard */}
            <Route path="/dashboard" element={
                authState.isLoggedIn ? (
                    <DashboardContent user={authState.user} onLogout={handleLogout} />
                ) : (
                    <LoginPage onLogin={handleLogin} /> 
                )
            } />
            
            {/* 4. Default route (/) */}
            <Route path="/" element={
                authState.isLoggedIn ? (
                    <DashboardContent user={authState.user} onLogout={handleLogout} />
                ) : (
                    <LoginPage onLogin={handleLogin} />
                )
            } />
        </Routes>
    );
}

// Router harus diletakkan di luar component yang menggunakan hooks
const App = () => {
    return (
        <Router>
            <AuthWrapper />
        </Router>
    );
};

export default App;