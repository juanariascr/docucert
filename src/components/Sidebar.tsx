import { GraduationCapIcon, LayoutDashboardIcon, UploadCloudIcon, FileTextIcon, SettingsIcon, WalletIcon, FileSearchIcon, PresentationIcon } from 'lucide-react';

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const navItems = [
        { name: 'Project Overview', icon: PresentationIcon }, // ADDED HERE
        { name: 'Dashboard', icon: LayoutDashboardIcon },
        { name: 'Upload Students', icon: UploadCloudIcon },
        { name: 'Certificates', icon: FileTextIcon },
        { name: 'Student Wallet', icon: WalletIcon },
        { name: 'Verifier Portal', icon: FileSearchIcon },
        { name: 'Settings', icon: SettingsIcon }
    ];

    return (
        <aside className="w-64 bg-slate-900 h-screen flex flex-col text-slate-300 flex-shrink-0 border-r border-slate-800">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-3 text-white">
                    <div className="bg-amber-600 p-1.5 rounded-lg">
                        <GraduationCapIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg tracking-wide">DocuCert</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => setActiveView(item.name)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${isActive ? 'bg-slate-800 text-white relative' : 'hover:bg-slate-800/50 hover:text-white'}`}>
                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r-full" />}
                            <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-slate-400'}`} />
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
                        AD
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-medium text-white">Admin User</span>
                        <span className="text-xs text-slate-400">University Registrar</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}