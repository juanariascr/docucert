import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import { simulateBackendProcessing } from '../utils/crypto';

const MAJORS = [
    'Computer Science', 'Business Administration', 'Biomedical Engineering',
    'English Literature', 'Data Science', 'Psychology', 'Mechanical Engineering', 'Nursing'
];

export function ManualEntryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '', major: '', date: '', email: 'jariasmartinez@scu.edu'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await simulateBackendProcessing([formData]);

        setIsSubmitting(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
            setFormData({ name: '', major: '', date: '', email: 'jariasmartinez@scu.edu' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 max-w-2xl">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-stone-900">Add Student Record</h3>
                <p className="text-sm text-stone-500 mt-1">Enter details for a single student certificate generation.</p>
            </div>

            <AnimatePresence mode="wait">
                {showSuccess ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-green-50 border border-green-200 rounded-lg p-6 text-center py-12">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="text-lg font-medium text-green-900 mb-2">Record Added Successfully</h4>
                        <p className="text-green-700 text-sm mb-6">The student data has been saved and is ready for certificate generation.</p>
                        <button onClick={() => setShowSuccess(false)} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors shadow-sm">
                            <PlusIcon className="w-4 h-4" /> Add Another Student
                        </button>
                    </motion.div>
                ) : (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-stone-700">Full Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Jane Doe" className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-stone-700">Major</label>
                                <select name="major" required value={formData.major} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-700">
                                    <option value="" disabled>Select a major...</option>
                                    {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-stone-700">Graduation Date</label>
                                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-700" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-stone-700">Student Email</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-stone-100 border border-stone-300 text-stone-500 cursor-not-allowed rounded-lg text-sm focus:outline-none" readOnly />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                            <button type="button" className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                                {isSubmitting ? 'Saving...' : 'Save Record'}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}