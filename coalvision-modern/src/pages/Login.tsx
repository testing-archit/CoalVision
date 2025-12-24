import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pickaxe, User, Lock, Loader2, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!identifier.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        const success = await login(identifier, password);

        if (success) {
            toast.success('Welcome to Coal Vision!');
            navigate('/dashboard');
        } else {
            toast.error(error || 'Login failed');
        }

        setIsSubmitting(false);
    };

    const features = [
        { icon: <Shield className="w-5 h-5" />, text: 'Secure Authentication' },
        { icon: <Zap className="w-5 h-5" />, text: 'Real-time Updates' },
        { icon: <Sparkles className="w-5 h-5" />, text: 'Safety Management' },
    ];

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        }}
                        animate={{
                            y: [null, Math.random() * -600 - 100],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                        }}
                    />
                ))}

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Left Side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16"
            >
                <div className="max-w-lg">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
                                <Pickaxe className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white">Coal Vision</h1>
                                <p className="text-blue-300/80">Coal India Limited</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                            Empowering Workers with
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Digital Safety</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Comprehensive worker management system for shift handovers, safety protocols, and real-time emergency response.
                        </p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="space-y-4"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center gap-3 text-slate-300"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    {feature.icon}
                                </div>
                                <span>{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6"
                    >
                        <div>
                            <p className="text-3xl font-bold text-white">50K+</p>
                            <p className="text-slate-400 text-sm">Active Workers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">24/7</p>
                            <p className="text-slate-400 text-sm">Safety Support</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">100+</p>
                            <p className="text-slate-400 text-sm">Mining Sites</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-8 lg:hidden"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-500/25 mb-4">
                            <Pickaxe className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Coal Vision</h1>
                        <p className="text-slate-400">Coal India Limited Worker Portal</p>
                    </motion.div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative"
                    >
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />

                        <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                                Welcome Back
                            </h2>
                            <p className="text-slate-400 text-center mb-8">
                                Sign in to access your dashboard
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Identifier Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Registration ID / Email / Phone
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity" />
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                                            <input
                                                type="text"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="Enter your identifier"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity" />
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="Enter your password"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-600 bg-slate-700/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                                        />
                                        <span className="group-hover:text-white transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 5 }}
                                                className="text-lg"
                                            >
                                                →
                                            </motion.span>
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                                <span className="text-slate-500 text-sm">or</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                            </div>

                            {/* Help Link */}
                            <p className="text-center text-slate-400 text-sm">
                                Need assistance?{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                                    Contact Support
                                </a>
                            </p>
                        </div>
                    </motion.div>

                    {/* App Store Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex justify-center gap-4 mt-8"
                    >
                        <a href="#" className="opacity-60 hover:opacity-100 transition-opacity transform hover:scale-105">
                            <img
                                src="/assets/googleplay.jpeg"
                                alt="Google Play"
                                className="h-11 rounded-lg shadow-lg"
                            />
                        </a>
                        <a href="#" className="opacity-60 hover:opacity-100 transition-opacity transform hover:scale-105">
                            <img
                                src="/assets/appstore.jpeg"
                                alt="App Store"
                                className="h-11 rounded-lg shadow-lg"
                            />
                        </a>
                    </motion.div>

                    {/* Footer */}
                    <p className="text-center text-slate-500 text-xs mt-8">
                        © 2024 Coal India Limited. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
