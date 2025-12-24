import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Shield,
    AlertTriangle,
    ClipboardCheck,
    Wrench,
    FileText,
    ExternalLink,
    LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SafetyManagement: React.FC = () => {
    const { logout } = useAuth();

    const safetyItems = [
        { id: 1, text: 'Ensure all employees have completed safety training.', anchor: 'safety-training' },
        { id: 2, text: 'Regularly inspect safety equipment and replace as necessary.', anchor: 'inspect-equipment' },
        { id: 3, text: 'Conduct monthly safety drills for fire and earthquake preparedness.', anchor: 'safety-drills' },
        { id: 4, text: 'Maintain a clean and organized workspace to prevent accidents.', anchor: 'workspace-maintenance' },
        { id: 5, text: 'Report and document all incidents immediately.', anchor: 'incident-reporting' },
    ];

    const maintenanceSections = [
        {
            title: 'Section 1: Equipment Check',
            description: 'Details about regular equipment checks and maintenance schedules.'
        },
        {
            title: 'Section 2: Safety Audits',
            description: 'Information on conducting safety audits to ensure compliance.'
        },
        {
            title: 'Section 3: Preventive Measures',
            description: 'Guidelines for implementing preventive maintenance measures.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-ghost"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Go Back
                            </motion.button>
                        </Link>
                    </div>
                    <button onClick={() => logout()} className="btn btn-ghost text-sm">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative py-12 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/25 mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Safety Management</h1>
                    <p className="text-slate-400">Under DGMS Guidelines</p>

                    <Link to="/response-plan">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 btn bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            TARP (Trigger Access Response Plan)
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <main className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Scheduled Maintenance */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="card h-full">
                            <div className="flex items-center gap-2 mb-4">
                                <Wrench className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-semibold text-white">Scheduled Maintenance</h2>
                            </div>

                            <div className="space-y-4">
                                {maintenanceSections.map((section, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-blue-500"
                                    >
                                        <h3 className="font-medium text-white mb-1">{section.title}</h3>
                                        <p className="text-sm text-slate-400">{section.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Safety Checklist */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="card">
                            <div className="flex items-center gap-2 mb-4">
                                <ClipboardCheck className="w-5 h-5 text-emerald-400" />
                                <h2 className="text-lg font-semibold text-white">Safety Checklist</h2>
                            </div>

                            <ul className="space-y-3">
                                {safetyItems.map((item, index) => (
                                    <motion.li
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="p-4 bg-slate-700/50 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
                                    >
                                        <a
                                            href={`#${item.anchor}`}
                                            className="flex items-center gap-3 text-slate-200 group-hover:text-emerald-400 transition-colors"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-medium">
                                                {item.id}
                                            </span>
                                            {item.text}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 card"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-semibold text-white">Reports & Documentation</h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="http://www.ismenvis.nic.in/Database/Mining_Accidents_in_India_24483.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-ghost border border-white/10"
                            >
                                <FileText className="w-4 h-4" />
                                Past Reports
                                <ExternalLink className="w-3 h-3" />
                            </motion.button>
                        </a>

                        <a
                            href="https://docs.google.com/document/d/1yKGdlR-f_0Es_KPplbGagiN0gbisJxPs6AfrJtnZBNw/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary"
                            >
                                <FileText className="w-4 h-4" />
                                Latest Reports
                                <ExternalLink className="w-3 h-3" />
                            </motion.button>
                        </a>

                        <a
                            href="https://docs.google.com/document/d/1yKGdlR-f_0Es_KPplbGagiN0gbisJxPs6AfrJtnZBNw/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/25"
                            >
                                <FileText className="w-4 h-4" />
                                Add Reports
                                <ExternalLink className="w-3 h-3" />
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default SafetyManagement;
