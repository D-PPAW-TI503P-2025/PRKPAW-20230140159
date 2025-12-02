import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Ikon menggunakan heroicons untuk tampilan yang lebih bersih daripada SVG mentah
import { Eye, EyeOff } from 'lucide-react'; // Mengganti SVG dengan ikon Lucide/Heroicons standar (asumsi Lucide atau heroicons tersedia atau bisa diinstal)

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Fungsionalitas LOGIN tetap SAMA
            const res = await axios.post("http://localhost:3001/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.2,
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gray-950 p-4 sm:p-6 overflow-hidden">
            
            {/* Background Orbs/Glow Effect */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative bg-gray-900/80 backdrop-blur-md 
                p-8 md:p-12 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] 
                border border-gray-700/50 w-full max-w-sm sm:max-w-md z-10"
            >
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white text-center tracking-tight">
                        Selamat Datang
                    </h1>
                    <p className="text-gray-400 text-center mt-2">
                        Silakan login untuk mengakses dashboard.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 rounded-lg 
                            bg-gray-800 border border-gray-700 text-white 
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                            placeholder-gray-500 transition duration-200 shadow-inner"
                            placeholder="nama.anda@perusahaan.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border 
                                border-gray-700 text-white focus:ring-2 focus:ring-purple-500 
                                focus:border-purple-500 placeholder-gray-500 transition duration-200 pr-12 shadow-inner"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {/* Menggunakan ikon yang lebih modern, Anda mungkin perlu menginstal 'lucide-react' atau 'heroicons' */}
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-400 bg-red-900/30 p-2 rounded-md text-sm text-center border border-red-800"
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r 
                        from-purple-600 to-indigo-600 text-white font-bold 
                        text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-400/50 
                        transition duration-300 ease-in-out tracking-wide uppercase"
                    >
                        Masuk
                    </motion.button>
                </form>

                <p className="text-gray-400 text-center mt-8 text-sm">
                    Belum punya akun?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-purple-400 font-semibold hover:text-purple-300 transition duration-200 focus:outline-none"
                    >
                        Daftar Sekarang
                    </button>
                </p>
            </motion.div>
        </div>
    );
}