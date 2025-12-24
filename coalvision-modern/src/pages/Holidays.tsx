import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Star } from 'lucide-react';
import type { Holiday } from '../types';

const Holidays: React.FC = () => {
    const holidays: Holiday[] = [
        { date: '16-Sep-2024', reason: 'Eid' },
        { date: '02-Oct-2024', reason: 'Gandhi Jayanti' },
        { date: '01-Nov-2024', reason: 'Diwali' },
        { date: '15-Nov-2024', reason: 'Guru Nanak Jayanti' },
        { date: '25-Dec-2024', reason: 'Christmas Day' },
        { date: '01-Jan-2025', reason: "New Year's Day" },
        { date: '26-Jan-2025', reason: 'Republic Day' },
        { date: '25-Mar-2025', reason: 'Holi' },
        { date: '29-Mar-2025', reason: 'Good Friday' },
        { date: '08-Apr-2025', reason: 'Ram Navami' },
        { date: '01-May-2025', reason: 'Labour Day' },
        { date: '15-Aug-2025', reason: 'Independence Day' },
        { date: '16-Sep-2025', reason: 'Eid' },
        { date: '02-Oct-2025', reason: 'Gandhi Jayanti' },
        { date: '01-Nov-2025', reason: 'Diwali' },
        { date: '15-Nov-2025', reason: 'Guru Nanak Jayanti' },
        { date: '25-Dec-2025', reason: 'Christmas Day' },
    ];

    const getHolidayColor = (reason: string) => {
        const lowerReason = reason.toLowerCase();
        if (lowerReason.includes('diwali') || lowerReason.includes('holi')) return 'from-orange-500 to-pink-500';
        if (lowerReason.includes('eid')) return 'from-green-500 to-emerald-600';
        if (lowerReason.includes('christmas')) return 'from-red-500 to-red-700';
        if (lowerReason.includes('republic') || lowerReason.includes('independence')) return 'from-orange-400 via-white to-green-500';
        if (lowerReason.includes('gandhi')) return 'from-amber-500 to-yellow-600';
        return 'from-blue-500 to-blue-700';
    };

    const groupedHolidays = useMemo(() => {
        const groups: { [key: string]: Holiday[] } = {};
        holidays.forEach(holiday => {
            const year = holiday.date.split('-')[2];
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(holiday);
        });
        return groups;
    }, []);

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
                    <h1 className="text-xl font-bold text-white">Holidays</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-500/25 mb-4">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Coal India Worker Holidays</h1>
                    <p className="text-slate-400 mt-2">National Holidays Calendar</p>
                </motion.div>

                {/* Holidays by Year */}
                {Object.entries(groupedHolidays).map(([year, yearHolidays]) => (
                    <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-5 h-5 text-amber-400" />
                            <h2 className="text-xl font-bold text-white">{year}</h2>
                            <span className="text-sm text-slate-400">({yearHolidays.length} holidays)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {yearHolidays.map((holiday, index) => (
                                <motion.div
                                    key={`${year}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="card p-4 border-l-4 cursor-default"
                                    style={{
                                        borderLeftColor: `hsl(${(index * 30) % 360}, 70%, 50%)`
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getHolidayColor(holiday.reason)} flex items-center justify-center text-white shadow-lg`}>
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{holiday.reason}</p>
                                                <p className="text-sm text-slate-400">{holiday.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </main>
        </div>
    );
};

export default Holidays;
