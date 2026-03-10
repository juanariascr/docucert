import { useState, useEffect } from 'react';
import { ShieldCheckIcon, ShieldAlertIcon, SearchIcon, BanIcon, CopyIcon } from 'lucide-react';

export function CertificatesPage() {
    const [credentials, setCredentials] = useState<any[]>([]);
    const [registry, setRegistry] = useState<Record<string, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');

    // Load data on component mount
    useEffect(() => {
        const savedVCs = JSON.parse(localStorage.getItem('docucert_issued') || '[]');
        const savedRegistry = JSON.parse(localStorage.getItem('docucert_registry') || '{}');

        // Reverse so the newest ones are at the top
        setCredentials(savedVCs.reverse());
        setRegistry(savedRegistry);
    }, []);

    const handleRevoke = (index: string) => {
        if (window.confirm('Are you sure you want to revoke this credential? This action will permanently invalidate it on the blockchain.')) {
            const updatedRegistry = { ...registry, [index]: true }; // true means revoked
            setRegistry(updatedRegistry);
            localStorage.setItem('docucert_registry', JSON.stringify(updatedRegistry));
        }
    };

    const copyToClipboard = (vc: any) => {
        navigator.clipboard.writeText(JSON.stringify(vc, null, 2));
        alert('Credential JSON copied to clipboard! You can paste this into the Verifier portal.');
    };

    const filteredCredentials = credentials.filter(vc =>
        vc.credentialSubject.degree.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vc.credentialSubject.degree.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf9]">
            {/* Mini Header for this specific page */}
            <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 flex-shrink-0">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-stone-500">Data Management</span>
                    <span className="text-stone-300">/</span>
                    <span className="font-medium text-stone-900">Issued Certificates</span>
                </div>
                <div className="relative">
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search students or majors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all w-72" />
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-stone-900">Issued Credentials Vault</h1>
                        <p className="text-stone-500 mt-1">Manage, audit, and revoke Verifiable Credentials anchored to the DocuCert registry.</p>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
                        {credentials.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-stone-500">No credentials have been issued yet.</p>
                                <p className="text-sm text-stone-400 mt-1">Go to the 'Upload Students' tab to mint your first batch.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Student Name</th>
                                            <th className="px-6 py-4">Major</th>
                                            <th className="px-6 py-4">Status List Index</th>
                                            <th className="px-6 py-4">Ledger Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {filteredCredentials.map((vc, i) => {
                                            const index = vc.credentialStatus.statusListIndex;
                                            const isRevoked = registry[index];

                                            return (
                                                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-stone-900">{vc.credentialSubject.degree.student}</td>
                                                    <td className="px-6 py-4 text-stone-600">{vc.credentialSubject.degree.name}</td>
                                                    <td className="px-6 py-4 font-mono text-xs text-stone-500">#{index}</td>
                                                    <td className="px-6 py-4">
                                                        {isRevoked ? (
                                                            <div className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2.5 py-1 rounded-md w-fit border border-red-100">
                                                                <ShieldAlertIcon className="w-4 h-4" />
                                                                <span className="text-xs font-semibold tracking-wide uppercase">Revoked</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-100">
                                                                <ShieldCheckIcon className="w-4 h-4" />
                                                                <span className="text-xs font-semibold tracking-wide uppercase">Valid</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right space-x-3">
                                                        <button
                                                            onClick={() => copyToClipboard(vc)}
                                                            className="text-stone-400 hover:text-blue-600 transition-colors tooltip"
                                                            title="Copy JSON Payload">
                                                            <CopyIcon className="w-4 h-4 inline" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRevoke(index)}
                                                            disabled={isRevoked}
                                                            className={`text-sm font-medium transition-colors ${isRevoked ? 'text-stone-300 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}>
                                                            <BanIcon className="w-4 h-4 inline mr-1" />
                                                            Revoke
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}