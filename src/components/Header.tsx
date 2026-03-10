import { BellIcon, SearchIcon } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-stone-500">Data Management</span>
                <span className="text-stone-300">/</span>
                <span className="font-medium text-stone-900">Upload Students</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="pl-9 pr-4 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all w-64" />
                </div>

                <button className="relative text-stone-400 hover:text-stone-600 transition-colors">
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
}
