import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Clock,
    User,
    FileText,
    ListTodo,
    AlertTriangle,
    Wrench,
    Paperclip,
    Download,
    Plus
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import type { Handover } from '../types';

const ShiftHandover: React.FC = () => {
    const [handovers, setHandovers] = useState<Handover[]>([]);
    const [formData, setFormData] = useState({
        shiftDate: '',
        supervisor: '',
        importantNotes: '',
        pendingTasks: '',
        safetyConcerns: '',
        equipmentStatus: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const { shiftDate, supervisor, importantNotes, pendingTasks, safetyConcerns, equipmentStatus } = formData;

        doc.setFontSize(18);
        doc.setTextColor(0, 102, 204);
        doc.text("Shift Handover Log", 10, 15);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date/Time: ${shiftDate}`, 10, 30);
        doc.text(`Supervisor: ${supervisor}`, 10, 40);

        doc.setFontSize(11);
        doc.text("Important Notes:", 10, 55);
        doc.setFontSize(10);
        const notesLines = doc.splitTextToSize(importantNotes, 180);
        doc.text(notesLines, 10, 62);

        let yPos = 62 + (notesLines.length * 5) + 10;

        doc.setFontSize(11);
        doc.text("Pending Tasks:", 10, yPos);
        doc.setFontSize(10);
        const tasksLines = doc.splitTextToSize(pendingTasks, 180);
        doc.text(tasksLines, 10, yPos + 7);

        yPos += (tasksLines.length * 5) + 17;

        doc.setFontSize(11);
        doc.text("Safety Concerns:", 10, yPos);
        doc.setFontSize(10);
        const concernsLines = doc.splitTextToSize(safetyConcerns, 180);
        doc.text(concernsLines, 10, yPos + 7);

        yPos += (concernsLines.length * 5) + 17;

        doc.setFontSize(11);
        doc.text("Equipment Status:", 10, yPos);
        doc.setFontSize(10);
        const equipmentLines = doc.splitTextToSize(equipmentStatus, 180);
        doc.text(equipmentLines, 10, yPos + 7);

        doc.save(`Handover_${shiftDate.replace(/[:\s]/g, '_')}.pdf`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.shiftDate || !formData.supervisor || !formData.importantNotes) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            // Add to local state
            const newHandover: Handover = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString()
            };

            setHandovers(prev => [newHandover, ...prev]);

            // Generate PDF
            generatePDF();

            // Reset form
            setFormData({
                shiftDate: '',
                supervisor: '',
                importantNotes: '',
                pendingTasks: '',
                safetyConcerns: '',
                equipmentStatus: ''
            });

            toast.success('Handover submitted and PDF downloaded!');
        } catch (error) {
            toast.error('Failed to submit handover');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
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
                        <h1 className="text-xl font-bold text-white">Shift Handover Log System</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                {/* Recent Handovers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        Recent Handovers
                    </h2>

                    {handovers.length > 0 ? (
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                            {handovers.map((handover, index) => (
                                <motion.div
                                    key={handover.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 bg-slate-700/50 rounded-lg border border-white/5"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-white">{handover.shiftDate}</span>
                                        <span className="text-sm text-slate-400">by {handover.supervisor}</span>
                                    </div>
                                    <p className="text-sm text-slate-300 line-clamp-2">{handover.importantNotes}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p>No handovers recorded yet</p>
                        </div>
                    )}
                </motion.div>

                {/* Handover Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                >
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-green-400" />
                        Create a New Handover
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Shift Date/Time */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <Clock className="w-4 h-4" />
                                    Shift Date/Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    name="shiftDate"
                                    value={formData.shiftDate}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                />
                            </div>

                            {/* Supervisor */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <User className="w-4 h-4" />
                                    Shift Supervisor *
                                </label>
                                <input
                                    type="text"
                                    name="supervisor"
                                    value={formData.supervisor}
                                    onChange={handleInputChange}
                                    className="input"
                                    placeholder="Enter supervisor name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <FileText className="w-4 h-4" />
                                Important Notes *
                            </label>
                            <textarea
                                name="importantNotes"
                                value={formData.importantNotes}
                                onChange={handleInputChange}
                                rows={3}
                                className="input resize-none"
                                placeholder="Enter important notes for the upcoming shift..."
                                required
                            />
                        </div>

                        {/* Pending Tasks */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <ListTodo className="w-4 h-4" />
                                Pending Tasks
                            </label>
                            <textarea
                                name="pendingTasks"
                                value={formData.pendingTasks}
                                onChange={handleInputChange}
                                rows={3}
                                className="input resize-none"
                                placeholder="List any pending tasks..."
                            />
                        </div>

                        {/* Safety Concerns */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                Safety Concerns
                            </label>
                            <textarea
                                name="safetyConcerns"
                                value={formData.safetyConcerns}
                                onChange={handleInputChange}
                                rows={3}
                                className="input resize-none"
                                placeholder="Note any safety concerns..."
                            />
                        </div>

                        {/* Equipment Status */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <Wrench className="w-4 h-4" />
                                Equipment Status
                            </label>
                            <textarea
                                name="equipmentStatus"
                                value={formData.equipmentStatus}
                                onChange={handleInputChange}
                                rows={3}
                                className="input resize-none"
                                placeholder="Describe equipment status..."
                            />
                        </div>

                        {/* File Attachment */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <Paperclip className="w-4 h-4" />
                                Attachments
                            </label>
                            <input
                                type="file"
                                multiple
                                className="input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary w-full py-3"
                        >
                            <Download className="w-5 h-5" />
                            {isSubmitting ? 'Submitting...' : 'Submit Handover & Download PDF'}
                        </motion.button>
                    </form>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-slate-400 text-sm border-t border-white/5">
                © 2024 Shift Handover Log System
            </footer>
        </div>
    );
};

export default ShiftHandover;
