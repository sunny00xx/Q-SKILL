import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Glassmorphism Card */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative group">

                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="p-8 md:p-10 relative z-10">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-slate-400 text-sm">Enter your credentials to access the portal</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1">Email Address</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-sm opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                                    <div className="relative flex items-center bg-slate-900/50 border border-white/10 rounded-xl focus-within:border-blue-500/50 focus-within:bg-slate-900/80 transition-all duration-300">
                                        <Mail className="ml-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border-none text-slate-200 placeholder-slate-600 focus:ring-0 py-4 pl-3 pr-4"
                                            placeholder="admin@hotel.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold ml-1">Password</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-sm opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                                    <div className="relative flex items-center bg-slate-900/50 border border-white/10 rounded-xl focus-within:border-purple-500/50 focus-within:bg-slate-900/80 transition-all duration-300">
                                        <Lock className="ml-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" size={20} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-transparent border-none text-slate-200 placeholder-slate-600 focus:ring-0 py-4 pl-3 pr-4"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="w-full group relative flex items-center justify-center p-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <span className="relative flex items-center font-bold text-white tracking-wide">
                                    Sign In
                                    <ArrowRight
                                        className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                                        size={20}
                                    />
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 text-center bg-white/5 mx-4 py-2 rounded-lg border border-white/5">
                            <p className="text-xs text-slate-400 font-mono">
                                <span className="text-blue-400">DEMO:</span> any email / any password
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
