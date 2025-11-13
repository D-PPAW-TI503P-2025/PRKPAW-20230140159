import React, { useState } from 'react';
import { LogOut, LayoutDashboard, User, Settings, Zap } from 'lucide-react'; // Using lucide-react for icons

// Mock Login Page (handles the initial state transition)
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simplified login logic for this single-file demo
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50">
        <div className="text-center mb-6">
          <Zap className="w-10 h-10 mx-auto text-cyan-400 mb-2" />
          <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email (e.g., user@example.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password (e.g., 123456)"
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
      </div>
    </div>
  );
};

// Enhanced Dashboard Content
const DashboardContent = ({ onLogout }) => {
    
  const metrics = [
    { title: "Active Projects", value: "14", icon: <LayoutDashboard className="w-6 h-6 text-indigo-400" /> },
    { title: "Team Members", value: "8", icon: <User className="w-6 h-6 text-green-400" /> },
    { title: "Task Completion", value: "92%", icon: <Zap className="w-6 h-6 text-yellow-400" /> },
    { title: "Settings Updated", value: "3 days ago", icon: <Settings className="w-6 h-6 text-pink-400" /> },
  ];

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
            Selamat Datang, **Pengguna Kreatif**! Mari kita wujudkan ide-ide brilian hari ini.
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
      <footer className="w-full p-4 bg-gray-800 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} CreativeApp Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

// Main Application Component
const App = () => {
  // Use state to manage authentication status (simulating a token check)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Start as logged in for the dashboard view

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // navigate('/login'); // Not allowed, so we just change state
    setIsLoggedIn(false);
  };

  return (
    <div className="font-sans">
      {isLoggedIn ? (
        <DashboardContent onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;