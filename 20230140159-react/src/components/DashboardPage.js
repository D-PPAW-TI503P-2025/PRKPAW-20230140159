import React, { useEffect, useState } from "react";
import { Home, CheckCircle, BarChart3, LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [namaUser, setNamaUser] = useState("");

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decode = jwtDecode(token);
                setNamaUser(decode.nama || "User");
            }
        } catch (err) {
            console.error("Token error:", err);
        }
    }, []);

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(" ");
        return parts.length > 1
            ? parts[0][0] + parts[1][0]
            : parts[0][0];
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-[#0a0a0f] text-white p-6">

            {/* Sidebar */}
            <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 bg-[#12121a]/60 backdrop-blur-xl border border-[#2a2a38] 
                shadow-2xl rounded-2xl p-6 space-y-10 h-full relative"
            >
                {/* Glow Effect Sidebar */}
                <div className="absolute inset-0 rounded-2xl border border-purple-800/20 shadow-[0_0_25px_rgba(150,70,255,0.15)] pointer-events-none" />

                {/* Profile */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 
                        flex items-center justify-center text-lg font-bold shadow-xl shadow-purple-900/40">
                        {getInitials(namaUser)}
                    </div>

                    <div>
                        <p className="font-semibold">{namaUser}</p>
                        <p className="text-xs text-gray-400">Online • Dashboard</p>
                    </div>
                </div>

                {/* Menu + Logout in one group */}
                <div className="space-y-4">

                    {/* Menu items */}
                    <SidebarItem icon={<Home size={20} />} label="Dashboard" active />
                    <SidebarItem icon={<CheckCircle size={20} />} label="Presensi" />
                    <SidebarItem icon={<BarChart3 size={20} />} label="Laporan" />

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg text-red-400 
                        hover:text-red-300 hover:bg-red-900/20 hover:translate-x-1 transition"
                    >
                        <LogOut size={20} /> Logout
                    </button>

                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 ml-6">

                {/* Header Soft Glow */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-[#1a1a25]/70 border border-[#333344]
                    p-8 rounded-3xl shadow-[0_0_25px_rgba(120,80,255,0.15)] backdrop-blur-xl overflow-hidden"
                >
                    {/* Soft Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-indigo-700/20 to-pink-700/20 blur-xl opacity-50"></div>

                    <div className="relative">
                        <h1 className="text-4xl font-extrabold flex items-center gap-2 text-white">
                            Selamat Datang, {namaUser}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Dashboard Website Presensi Mahasiswa
                        </p>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                    {/* Presensi */}
                    <GlowCard color="purple">
                        <h3 className="text-2xl font-semibold mb-2">Presensi</h3>
                        <p className="text-gray-400">Kelola & lihat data presensi</p>
                    </GlowCard>

                    {/* Laporan */}
                    <GlowCard color="blue">
                        <h3 className="text-2xl font-semibold mb-2">Laporan</h3>
                        <p className="text-gray-400">Akses laporan lengkap sistem</p>
                    </GlowCard>

                </div>

            </div>
        </div>
    );
}

/* ---------------- Sidebar Component ---------------- */

function SidebarItem({ icon, label, active }) {
    return (
        <button
            className={`flex items-center gap-3 px-2 py-2 rounded-lg 
            transition-all ${
                active
                    ? "text-purple-300 font-semibold bg-purple-900/30 border border-purple-600/20 shadow-[0_0_12px_rgba(140,60,255,0.18)]"
                    : "text-gray-300 hover:text-purple-300 hover:bg-purple-900/20"
            }`}
        >
            {icon} {label}
        </button>
    );
}

/* ---------------- Glow Card Component ---------------- */

function GlowCard({ color, children }) {
    const colorClass = {
        purple: "shadow-purple-600/40 hover:shadow-purple-700/50 border-purple-600/20",
        blue: "shadow-blue-600/40 hover:shadow-blue-700/50 border-blue-600/20",
    }[color];

    return (
        <motion.div
            whileHover={{ scale: 1.04 }}
            className={`p-6 rounded-3xl bg-[#11111a]/60 border backdrop-blur-xl shadow-xl 
            cursor-pointer transition ${colorClass}`}
        >
            {children}
        </motion.div>
    );
}