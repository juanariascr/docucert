import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FingerprintIcon, ShieldCheckIcon, DownloadIcon, Share2Icon, AwardIcon, QrCodeIcon, WalletCardsIcon, ChevronDownIcon } from 'lucide-react';
import QRCode from 'react-qr-code';

export function StudentWalletPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // Data State
    const [pendingClaims, setPendingClaims] = useState<any[]>([]);
    const [localWallet, setLocalWallet] = useState<any[]>([]);

    // Internal Wallet Tabs & Sharing State
    const [walletTab, setWalletTab] = useState<'credentials' | 'share'>('credentials');
    const [selectedVcForShare, setSelectedVcForShare] = useState<any>(null);

    const STUDENT_EMAIL = 'jariasmartinez@scu.edu';

    useEffect(() => {
        const allIssued = JSON.parse(localStorage.getItem('docucert_issued') || '[]');
        const myIssued = allIssued.filter((vc: any) => vc.credentialSubject.degree.studentEmail === STUDENT_EMAIL);

        const myWallet = JSON.parse(localStorage.getItem('docucert_student_wallet') || '[]');
        setLocalWallet(myWallet);

        // Set a default credential to share if the wallet isn't empty
        if (myWallet.length > 0) {
            setSelectedVcForShare(myWallet[0]);
        }

        const walletIds = myWallet.map((vc: any) => vc.id);
        const unclaimed = myIssued.filter((vc: any) => !walletIds.includes(vc.id));
        setPendingClaims(unclaimed);
    }, []);

    const handleAuthenticate = () => {
        setIsAuthenticating(true);
        setTimeout(() => {
            setIsAuthenticating(false);
            setIsAuthenticated(true);
        }, 1200);
    };

    const handleClaimCredential = (vc: any) => {
        const updatedWallet = [vc, ...localWallet];
        setLocalWallet(updatedWallet);
        setPendingClaims(pendingClaims.filter(claim => claim.id !== vc.id));

        if (!selectedVcForShare) {
            setSelectedVcForShare(vc);
        }

        localStorage.setItem('docucert_student_wallet', JSON.stringify(updatedWallet));
    };

    const handleExportJSON = (vc: any) => {
        navigator.clipboard.writeText(JSON.stringify(vc, null, 2));
        alert('Credential JSON payload copied to clipboard! You can share this with an employer or paste it into the Verifier portal.');
    };

    // --- AUTHENTICATION VIEW ---
    if (!isAuthenticated) {
        return (
            <div className="flex-1 flex items-center justify-center bg-stone-100 min-h-screen">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-stone-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FingerprintIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-2">Wallet Authentication</h2>
                    <p className="text-stone-500 mb-8">Welcome back, Juan Diego. Please verify your identity to access your self-sovereign credentials.</p>

                    <button
                        onClick={handleAuthenticate}
                        disabled={isAuthenticating}
                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70">
                        {isAuthenticating ? (
                            <span className="animate-pulse">Verifying Biometrics...</span>
                        ) : (
                            <>Authenticate via FaceID / Passkey</>
                        )}
                    </button>
                </motion.div>
            </div>
        );
    }

    // --- WALLET VIEW ---
    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf9]">
            <header className="bg-white border-b border-stone-200 flex flex-col flex-shrink-0 shadow-sm z-10">
                <div className="h-16 flex items-center justify-between px-8 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-600 p-1.5 rounded-lg">
                            <ShieldCheckIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-stone-900 tracking-wide">My Digital Identity</span>
                    </div>
                    <div className="text-sm font-medium text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
                        {STUDENT_EMAIL}
                    </div>
                </div>

                {/* Internal Wallet Tabs */}
                <div className="flex px-8 gap-6 mt-2">
                    <button
                        onClick={() => setWalletTab('credentials')}
                        className={`pb-3 pt-2 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${walletTab === 'credentials' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}>
                        <WalletCardsIcon className="w-4 h-4" /> My Credentials
                    </button>
                    <button
                        onClick={() => setWalletTab('share')}
                        className={`pb-3 pt-2 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${walletTab === 'share' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}>
                        <QrCodeIcon className="w-4 h-4" /> Share & Verify
                    </button>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">

                    <AnimatePresence mode="wait">
                        {/* TAB 1: MY CREDENTIALS */}
                        {walletTab === 'credentials' && (
                            <motion.div key="credentials" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">

                                {/* Pending Claims Section */}
                                {pendingClaims.length > 0 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm overflow-hidden">
                                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                            </span>
                                            Pending Credential Claims
                                        </h3>
                                        <div className="space-y-4">
                                            {pendingClaims.map(claim => (
                                                <div key={claim.id} className="bg-white border border-blue-100 p-4 rounded-lg flex items-center justify-between shadow-sm">
                                                    <div>
                                                        <p className="font-semibold text-stone-900">{claim.credentialSubject.degree.name}</p>
                                                        <p className="text-sm text-stone-500">Issued by: {claim.issuer}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleClaimCredential(claim)}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                                                        <DownloadIcon className="w-4 h-4" /> Store in Wallet
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stored Credentials Section */}
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Secured Credentials</h2>
                                    {localWallet.length === 0 ? (
                                        <div className="text-center py-20 bg-white border-2 border-dashed border-stone-200 rounded-2xl">
                                            <p className="text-stone-500">Your wallet is currently empty.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {localWallet.map((vc) => (
                                                <div key={vc.id} className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
                                                    <div className="p-8 md:p-12 bg-[#fffdfa] border-b border-stone-200 flex flex-col items-center text-center relative">
                                                        <div className="absolute top-0 left-0 w-full h-full border-8 border-double border-stone-200 m-2 rounded-lg pointer-events-none" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}></div>
                                                        <AwardIcon className="w-16 h-16 text-amber-500 mb-6" />
                                                        <h4 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Official Academic Record</h4>
                                                        <h2 className="text-4xl font-serif text-stone-900 mb-2">{vc.credentialSubject.degree.name}</h2>
                                                        <p className="text-lg text-stone-600 font-serif italic mb-8">Awarded to</p>
                                                        <h3 className="text-3xl font-serif text-stone-900 mb-8">{vc.credentialSubject.degree.student}</h3>
                                                        <div className="flex items-center justify-center gap-10 w-full mt-4">
                                                            <div className="text-left">
                                                                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Graduation Date</p>
                                                                <p className="font-mono text-stone-800">{vc.credentialSubject.degree.graduationDate}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">GPA</p>
                                                                <p className="font-mono text-stone-800 font-bold">{vc.credentialSubject.degree.gpa}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Cryptographic Issuer</p>
                                                                <p className="font-mono text-sm text-stone-800">{vc.issuer}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-stone-50 p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-lg border border-emerald-200">
                                                            <ShieldCheckIcon className="w-4 h-4" />
                                                            <span className="text-xs font-bold uppercase tracking-wider">Cryptographically Secured</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedVcForShare(vc);
                                                                setWalletTab('share');
                                                            }}
                                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                                                            <QrCodeIcon className="w-4 h-4" /> Generate QR Code
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 2: SHARE & VERIFY */}
                        {walletTab === 'share' && (
                            <motion.div key="share" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col items-center justify-center py-8">

                                <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden">
                                    <div className="p-6 border-b border-stone-200 bg-stone-50 text-center">
                                        <h2 className="text-xl font-bold text-stone-900 mb-1">Verifier Presentation</h2>
                                        <p className="text-sm text-stone-500">Present this to an employer to instantly verify your credentials.</p>
                                    </div>

                                    <div className="p-8 flex flex-col items-center">
                                        {localWallet.length === 0 ? (
                                            <p className="text-stone-500 text-center py-10">You have no credentials in your wallet to share.</p>
                                        ) : (
                                            <>
                                                {/* Credential Selector */}
                                                <div className="w-full relative mb-8">
                                                    <select
                                                        className="w-full appearance-none bg-white border border-stone-300 text-stone-700 py-2.5 px-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                        value={selectedVcForShare?.id || ''}
                                                        onChange={(e) => {
                                                            const selected = localWallet.find(vc => vc.id === e.target.value);
                                                            setSelectedVcForShare(selected);
                                                        }}>
                                                        {localWallet.map(vc => (
                                                            <option key={vc.id} value={vc.id}>
                                                                {vc.credentialSubject.degree.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDownIcon className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                </div>

                                                {/* The QR Code */}
                                                <div className="bg-white p-4 border-2 border-stone-200 rounded-xl shadow-inner mb-8">
                                                    {selectedVcForShare && (
                                                        <QRCode
                                                            value={JSON.stringify(selectedVcForShare)}
                                                            size={220}
                                                            level="L" // Low error correction to handle large JSON density
                                                            fgColor="#1c1917" // stone-900
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 mb-6 w-full justify-center">
                                                    <ShieldCheckIcon className="w-5 h-5" />
                                                    <span className="text-sm font-semibold">Ready to Scan</span>
                                                </div>

                                                <button
                                                    onClick={() => handleExportJSON(selectedVcForShare)}
                                                    className="w-full px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                                                    <Share2Icon className="w-4 h-4" /> Copy Raw JSON Payload
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    );
}