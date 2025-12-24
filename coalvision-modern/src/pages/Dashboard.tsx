import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    MapPin,
    Briefcase,
    IdCard,
    ArrowRightLeft,
    Shield,
    Bell,
    Calendar,
    TrendingUp,
    AlertTriangle,
    X,
    LogOut,
    CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAlerts, dismissAlert as dismissAlertDb } from '../services/database';
import type { Alert } from '../services/database';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoadingAlerts, setIsLoadingAlerts] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        // Load alerts from PostgreSQL
        const loadAlerts = async () => {
            const alertsData = await getAlerts();
            setAlerts(alertsData);
            setIsLoadingAlerts(false);
        };

        loadAlerts();
    }, [user, navigate]);

    const dismissAlert = async (alertId: number) => {
        try {
            await dismissAlertDb(alertId);
            setAlerts(alerts.filter(a => a.id !== alertId));
            toast.success('Alert dismissed');
        } catch (error) {
            toast.error('Failed to dismiss alert');
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
    };

    const tasks = [
        { id: 1, title: 'Inspect equipment in section A', type: 'urgent' },
        { id: 2, title: 'Assign team to clean area B', type: 'delegate' },
        { id: 3, title: 'Complete daily safety report', type: 'normal' },
        { id: 4, title: 'Review shift handover notes', type: 'normal' },
    ];

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'badge-success';
            case 'inactive': return 'badge-danger';
            case 'on leave': return 'badge-warning';
            default: return 'badge-info';
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'supervisor': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                            <img src="/assets/logo.jpeg" alt="Logo" className="w-8 h-8 rounded" />
                        </div>
                        <span className="font-bold text-lg text-white">Coal Vision</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/updates" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Updates
                        </Link>
                        <Link to="/holidays" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Holidays
                        </Link>
                    </nav>

                    <button onClick={handleLogout} className="btn btn-ghost text-sm">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold text-white mb-6">Profile Summary</h1>

                    <div className="card">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Picture */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center overflow-hidden">
                                    <User className="w-16 h-16 text-slate-400" />
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-sm text-slate-400">Name</p>
                                        <p className="font-semibold text-white">{user.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-400">Status:</span>
                                        <span className={`badge ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                        <span className={`badge ${getRoleBadge(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <IdCard className="w-5 h-5 text-green-400" />
                                    <div>
                                        <p className="text-sm text-slate-400">Enroll ID</p>
                                        <p className="font-semibold text-white">{user.enroll_id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-sm text-slate-400">Position</p>
                                        <p className="font-semibold text-white">{user.position}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-orange-400" />
                                    <div>
                                        <p className="text-sm text-slate-400">Site of Work</p>
                                        <p className="font-semibold text-white">{user.site}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                            <Link to="/shift-handover">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-primary"
                                >
                                    <ArrowRightLeft className="w-4 h-4" />
                                    Shift Handover
                                </motion.button>
                            </Link>
                            <Link to="/safety">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/25"
                                >
                                    <Shield className="w-4 h-4" />
                                    Safety Management
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Tasks & Alerts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tasks Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-semibold text-white">Tasks</h3>
                        </div>

                        <ul className="space-y-3">
                            {tasks.map((task, index) => (
                                <motion.li
                                    key={task.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`p-3 rounded-lg border-l-4 ${task.type === 'urgent'
                                            ? 'bg-red-500/10 border-red-500'
                                            : task.type === 'delegate'
                                                ? 'bg-amber-500/10 border-amber-500'
                                                : 'bg-slate-700/50 border-slate-500'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-200">{task.title}</span>
                                        {task.type === 'urgent' && (
                                            <span className="badge badge-danger text-xs">Urgent</span>
                                        )}
                                        {task.type === 'delegate' && (
                                            <span className="badge badge-warning text-xs">Delegate</span>
                                        )}
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Alerts Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Bell className="w-5 h-5 text-amber-400" />
                            <h3 className="text-lg font-semibold text-white">Alerts</h3>
                            {alerts.length > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {alerts.length}
                                </span>
                            )}
                        </div>

                        {isLoadingAlerts ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="skeleton h-16 rounded-lg" />
                                ))}
                            </div>
                        ) : alerts.length > 0 ? (
                            <ul className="space-y-3 max-h-64 overflow-y-auto">
                                <AnimatePresence>
                                    {alerts.map((alert) => (
                                        <motion.li
                                            key={alert.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className={`p-3 rounded-lg border ${alert.priority === 'high'
                                                    ? 'bg-red-500/10 border-red-500/30'
                                                    : 'bg-amber-500/10 border-amber-500/30'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2">
                                                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.priority === 'high' ? 'text-red-400' : 'text-amber-400'
                                                        }`} />
                                                    <div>
                                                        <p className="font-medium text-white">{alert.title}</p>
                                                        <p className="text-sm text-slate-300">{alert.message}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => dismissAlert(alert.id)}
                                                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-slate-400" />
                                                </button>
                                            </div>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-slate-400">
                                <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                <p>No alerts at the moment</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
