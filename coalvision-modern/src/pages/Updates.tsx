import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    TrendingUp,
    Users,
    Factory,
    Leaf,
    Heart
} from 'lucide-react';

const Updates: React.FC = () => {
    const updates = [
        {
            id: 1,
            title: 'Example Update',
            content: 'This is a static example update. Real updates will be fetched dynamically.',
            date: 'August 31, 2024',
            workerCount: 2000,
            safetyTraining: 'Completed',
            production: {
                total: '5000 tons',
                increase: '5%'
            },
            environment: {
                airQuality: 'Moderate',
                waterUsage: '2000 cubic meters'
            },
            community: {
                projects: '3 ongoing projects',
                workshops: '2 conducted last month'
            }
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-ghost"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </motion.button>
                    </Link>
                    <h1 className="text-xl font-bold text-white">Daily Updates</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-500/25 mb-4">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Daily Updates on Coal Mines of India</h1>
                </motion.div>

                {/* Updates List */}
                <div className="space-y-6">
                    {updates.map((update, index) => (
                        <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card hover:border-blue-500/30"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">{update.title}</h2>
                                <span className="text-sm text-slate-400">{update.date}</span>
                            </div>

                            <p className="text-slate-300 mb-6">{update.content}</p>

                            {/* Labor Data */}
                            <div className="p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    <h3 className="font-medium text-white">Labor Data</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p className="text-slate-300">
                                        <span className="text-slate-400">Workers:</span> {update.workerCount}
                                    </p>
                                    <p className="text-slate-300">
                                        <span className="text-slate-400">Safety Training:</span> {update.safetyTraining}
                                    </p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Production */}
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Factory className="w-5 h-5 text-amber-400" />
                                        <h4 className="font-medium text-white text-sm">Production Data</h4>
                                    </div>
                                    <p className="text-sm text-slate-300">Total: {update.production.total}</p>
                                    <p className="text-sm text-emerald-400">+{update.production.increase} Monthly</p>
                                </div>

                                {/* Environment */}
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Leaf className="w-5 h-5 text-green-400" />
                                        <h4 className="font-medium text-white text-sm">Environmental Impact</h4>
                                    </div>
                                    <p className="text-sm text-slate-300">Air Quality: {update.environment.airQuality}</p>
                                    <p className="text-sm text-slate-300">Water: {update.environment.waterUsage}</p>
                                </div>

                                {/* Community */}
                                <div className="p-4 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Heart className="w-5 h-5 text-pink-400" />
                                        <h4 className="font-medium text-white text-sm">Community</h4>
                                    </div>
                                    <p className="text-sm text-slate-300">{update.community.projects}</p>
                                    <p className="text-sm text-slate-300">{update.community.workshops}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Updates;
