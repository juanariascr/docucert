import { motion } from 'framer-motion';

interface UploadTabsProps {
    activeTab: 'csv' | 'manual';
    onChange: (tab: 'csv' | 'manual') => void;
}

export function UploadTabs({ activeTab, onChange }: UploadTabsProps) {
    const tabs = [
        { id: 'csv', label: 'Bulk Upload (CSV)' },
        { id: 'manual', label: 'Manual Entry' }
    ] as const;

    return (
        <div className="flex border-b border-stone-200 mb-6">
            {tabs.map((tab) =>
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`relative px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-amber-700' : 'text-stone-500 hover:text-stone-700'}`}>
                    {tab.label}
                    {activeTab === tab.id &&
                        <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                    }
                </button>
            )}
        </div>
    );
}