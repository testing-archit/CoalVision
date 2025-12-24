import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    AlertTriangle,
    Shield,
    Flame,
    Droplets,
    Radio,
    Building2,
    Beaker,
    Stethoscope,
    Users,
    ChevronDown,
    ExternalLink,
    ArrowUp
} from 'lucide-react';

interface ResponseTopic {
    id: string;
    title: string;
    icon: React.ReactNode;
    conditions: string;
    plan: string;
    link?: string;
    color: string;
}

const ResponsePlan: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const topics: ResponseTopic[] = [
        {
            id: 'evacuation',
            title: 'Emergency Evacuation Procedures',
            icon: <Users className="w-6 h-6" />,
            conditions: 'Hazardous gases, fires, explosions, structural failures.',
            plan: 'Exit routes, communication protocols, assembly points.',
            color: 'from-red-500 to-red-700'
        },
        {
            id: 'incident-reporting',
            title: 'Incident Detection & Reporting',
            icon: <Radio className="w-6 h-6" />,
            conditions: 'Unusual sensor readings, machinery shutdowns, worker distress.',
            plan: 'Immediate reporting mechanisms, who to notify, information to collect.',
            color: 'from-amber-500 to-amber-700'
        },
        {
            id: 'medical-emergencies',
            title: 'Medical Emergencies',
            icon: <Stethoscope className="w-6 h-6" />,
            conditions: 'Accidents, sudden health issues.',
            plan: 'First aid, emergency medical assistance, transport to medical facilities.',
            link: 'https://singrauli.nic.in/en/public-utility-category/hospitals/',
            color: 'from-pink-500 to-pink-700'
        },
        {
            id: 'rescue-operations',
            title: 'Rescue Operations',
            icon: <Shield className="w-6 h-6" />,
            conditions: 'Trapped miners, equipment failures blocking exits.',
            plan: 'Rescue teams, specialized equipment, coordination with external services.',
            color: 'from-blue-500 to-blue-700'
        },
        {
            id: 'hazardous-materials',
            title: 'Hazardous Material Spills',
            icon: <Beaker className="w-6 h-6" />,
            conditions: 'Chemical spills, fuel spills.',
            plan: 'Containment, protective equipment, decontamination.',
            color: 'from-purple-500 to-purple-700'
        },
        {
            id: 'fire-response',
            title: 'Fire Response',
            icon: <Flame className="w-6 h-6" />,
            conditions: 'Smoke, fire detection.',
            plan: 'Fire suppression, extinguishers, evacuation if needed.',
            link: 'https://singrauli.nic.in/en/district-helpline/fire-brigade/',
            color: 'from-orange-500 to-orange-700'
        },
        {
            id: 'communication-breakdown',
            title: 'Communication Breakdown',
            icon: <Radio className="w-6 h-6" />,
            conditions: 'Loss of communication between surface and underground teams.',
            plan: 'Backup systems, check-in intervals, alternative methods.',
            color: 'from-cyan-500 to-cyan-700'
        },
        {
            id: 'structural-integrity',
            title: 'Structural Integrity Compromise',
            icon: <Building2 className="w-6 h-6" />,
            conditions: 'Subsidence, cracks, structural issues.',
            plan: 'Area evacuation, structural assessments, shoring up.',
            color: 'from-slate-500 to-slate-700'
        },
        {
            id: 'flooding-events',
            title: 'Flooding Events',
            icon: <Droplets className="w-6 h-6" />,
            conditions: 'Water ingress, surface floods.',
            plan: 'Pump deployment, water diversion, safe evacuation.',
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 'chemical-exposure',
            title: 'Chemical Exposure',
            icon: <Beaker className="w-6 h-6" />,
            conditions: 'Toxic gases, dust, chemicals.',
            plan: 'Removal of exposed personnel, PPE use, air quality monitoring.',
            color: 'from-green-500 to-green-700'
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10" id="top">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link to="/safety">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-ghost"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative py-12 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-xl shadow-red-500/25 mb-4">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Trigger Access Response Plan</h1>
                    <p className="text-slate-400">Safety of Mining Workers</p>
                </motion.div>
            </div>

            {/* Response Topics */}
            <main className="max-w-4xl mx-auto px-4 pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card mb-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">Response Plan Topics</h2>

                    <div className="space-y-3">
                        {topics.map((topic, index) => (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="overflow-hidden rounded-lg border border-white/10"
                            >
                                <button
                                    onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
                                    className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white shadow-lg`}>
                                        {topic.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-medium text-white">{topic.title}</h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedId === topic.id ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedId === topic.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-4 bg-slate-800/50 space-y-3">
                                                <div>
                                                    <p className="text-sm text-slate-400 mb-1">Conditions:</p>
                                                    <p className="text-slate-200">{topic.conditions}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-400 mb-1">Response Plan:</p>
                                                    <p className="text-slate-200">{topic.plan}</p>
                                                </div>
                                                {topic.link && (
                                                    <a
                                                        href={topic.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                                    >
                                                        Access Emergency Resources
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Back to Top */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-ghost"
                    >
                        <ArrowUp className="w-4 h-4" />
                        Back to Top
                    </motion.button>
                </motion.div>
            </main>
        </div>
    );
};

export default ResponsePlan;
