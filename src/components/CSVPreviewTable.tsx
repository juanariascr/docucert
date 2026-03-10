import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, AlertCircleIcon, TrashIcon } from 'lucide-react';
import { simulateBackendProcessing } from '../utils/crypto';

const MOCK_DATA = [
    { id: 1, name: 'Sarah Chen', major: 'Computer Science', date: 'May 15 2026', gpa: '3.92', email: 'jariasmartinez@scu.edu', valid: true },
    { id: 2, name: 'Marcus Johnson', major: 'Business Administration', date: 'May 15 2026', gpa: '3.45', email: 'jariasmartinez@scu.edu', valid: true },
    { id: 3, name: 'Priya Patel', major: 'Biomedical Engineering', date: 'May 15 2026', gpa: '3.88', email: 'jariasmartinez@scu.edu', valid: true },
    { id: 4, name: "James O'Brien", major: 'English Literature', date: 'May 15 2026', gpa: '3.60', email: 'jariasmartinez@scu.edu', valid: true },
    { id: 5, name: 'Aisha Mohammed', major: 'Data Science', date: 'May 15 2026', gpa: '3.95', email: '', valid: false, error: 'Missing email' },
    { id: 6, name: 'David Kim', major: 'Psychology', date: 'May 15 2026', gpa: '3.71', email: 'jariasmartinez@scu.edu', valid: true }
];

export function CSVPreviewTable() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const validRecords = MOCK_DATA.filter((d) => d.valid);
    const errorCount = MOCK_DATA.length - validRecords.length;

    const handleBatchSubmit = async () => {
        setIsProcessing(true);
        await simulateBackendProcessing(validRecords);
        setIsProcessing(false);
        setIsComplete(true);
        alert(`${validRecords.length} credentials successfully minted and anchored!`);
    };

    return (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
                <div>
                    <h3 className="text-base font-semibold text-stone-900">Data Preview</h3>
                    <p className="text-sm text-stone-500 mt-1">Found {MOCK_DATA.length} records. {validRecords.length} ready to import, {errorCount} need attention.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-600 transition-colors flex items-center gap-2">
                        <TrashIcon className="w-4 h-4" /> Remove Selected
                    </button>
                    <button
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleBatchSubmit}
                        disabled={isProcessing || isComplete}>
                        {isProcessing ? 'Processing Batch...' : isComplete ? 'Batch Complete' : 'Submit All Valid'}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                        <tr>
                            <th className="px-4 py-3 w-12 text-center"><input type="checkbox" className="rounded border-stone-300 text-amber-600 focus:ring-amber-500" /></th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Major</th>
                            <th className="px-4 py-3">Graduation Date</th>
                            <th className="px-4 py-3">GPA</th>
                            <th className="px-4 py-3">Student Email</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {MOCK_DATA.map((row, index) => (
                            <motion.tr key={row.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className={`hover:bg-stone-50/80 transition-colors ${!row.valid ? 'bg-red-50/30' : ''}`}>
                                <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded border-stone-300 text-amber-600 focus:ring-amber-500" /></td>
                                <td className="px-4 py-3">
                                    {row.valid ? (
                                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
                                            <CheckCircleIcon className="w-4 h-4" /> <span className="text-xs font-medium">Valid</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md w-fit" title={row.error}>
                                            <AlertCircleIcon className="w-4 h-4" /> <span className="text-xs font-medium">Warning</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 font-medium text-stone-900">{row.name}</td>
                                <td className="px-4 py-3 text-stone-600">{row.major}</td>
                                <td className="px-4 py-3 text-stone-600">{row.date}</td>
                                <td className="px-4 py-3 text-stone-600">{row.gpa}</td>
                                <td className="px-4 py-3">{row.email ? <span className="text-stone-600">{row.email}</span> : <span className="text-amber-600 text-xs italic">{row.error}</span>}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}