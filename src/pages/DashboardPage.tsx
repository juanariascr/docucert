import { motion } from 'framer-motion';
import { BuildingIcon, WalletIcon, ShieldCheckIcon, ArrowRightIcon, DatabaseIcon, FingerprintIcon, FileSearchIcon } from 'lucide-react';

export function DashboardPage({ setActiveView }: { setActiveView: (view: string) => void }) {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf9]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-stone-900">DocuCert</span>
                    <span className="text-stone-300">/</span>
                    <span className="text-stone-500">Platform Overview</span>
                </div>
                <div className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Triangle of Trust Architecture
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-10 text-center max-w-2xl mx-auto mt-4">
                        <h1 className="text-3xl font-bold text-stone-900 mb-3">Welcome to DocuCert</h1>
                        <p className="text-stone-500 text-lg">
                            A secure, decentralized platform enabling academic institutions to issue tamper-proof Verifiable Credentials utilizing W3C standards and EVM smart contracts.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        {/* WORKFLOW 1: ISSUER */}
                        <motion.div variants={cardVariants} className="bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                            <div className="h-2 bg-blue-600 w-full"></div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BuildingIcon className="w-7 h-7 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-stone-900 mb-2">1. The Issuer Journey</h2>
                                <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wider">Batch Issuance</p>
                                <p className="text-stone-600 text-sm mb-6 flex-1">
                                    The University Registrar uploads a graduate roster. The system automatically generates unique JSON-LD credentials, cryptographically signs them with the institution's private key, and anchors the revocation index to the blockchain.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-stone-500">
                                    <li className="flex items-center gap-2"><DatabaseIcon className="w-4 h-4 text-blue-400" /> CSV Batch Processing</li>
                                    <li className="flex items-center gap-2"><ShieldCheckIcon className="w-4 h-4 text-blue-400" /> ECDSA Cryptographic Signing</li>
                                    <li className="flex items-center gap-2"><ArrowRightIcon className="w-4 h-4 text-blue-400" /> Smart Contract Anchoring</li>
                                </ul>
                                <button
                                    onClick={() => setActiveView('Upload Students')}
                                    className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Launch Registrar Portal <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                        {/* WORKFLOW 2: HOLDER */}
                        <motion.div variants={cardVariants} className="bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                            <div className="h-2 bg-emerald-500 w-full"></div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <WalletIcon className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h2 className="text-xl font-bold text-stone-900 mb-2">2. The Holder Journey</h2>
                                <p className="text-sm font-semibold text-emerald-600 mb-4 uppercase tracking-wider">Claim & Storage</p>
                                <p className="text-stone-600 text-sm mb-6 flex-1">
                                    The student receives a secure link, authenticates their identity, and assumes self-sovereign custody of their digital diploma. The credential is mathematically bound to their identity and safely stored locally in their digital wallet.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-stone-500">
                                    <li className="flex items-center gap-2"><FingerprintIcon className="w-4 h-4 text-emerald-400" /> Biometric Authentication</li>
                                    <li className="flex items-center gap-2"><WalletIcon className="w-4 h-4 text-emerald-400" /> Self-Sovereign Custody</li>
                                    <li className="flex items-center gap-2"><ArrowRightIcon className="w-4 h-4 text-emerald-400" /> Presentation & QR Generation</li>
                                </ul>
                                <button
                                    onClick={() => setActiveView('Student Wallet')}
                                    className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Open Identity Wallet <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                        {/* WORKFLOW 3: VERIFIER */}
                        <motion.div variants={cardVariants} className="bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                            <div className="h-2 bg-amber-500 w-full"></div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileSearchIcon className="w-7 h-7 text-amber-600" />
                                </div>
                                <h2 className="text-xl font-bold text-stone-900 mb-2">3. The Verifier Journey</h2>
                                <p className="text-sm font-semibold text-amber-600 mb-4 uppercase tracking-wider">Trustless Validation</p>
                                <p className="text-stone-600 text-sm mb-6 flex-1">
                                    An employer receives the student's payload or scans their QR code. The engine instantly verifies the cryptographic signature against the issuer's public key and queries the blockchain's Bitstring Status List to ensure it hasn't been revoked.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-stone-500">
                                    <li className="flex items-center gap-2"><ShieldCheckIcon className="w-4 h-4 text-amber-400" /> Signature Integrity Check</li>
                                    <li className="flex items-center gap-2"><DatabaseIcon className="w-4 h-4 text-amber-400" /> DID Resolution</li>
                                    <li className="flex items-center gap-2"><ArrowRightIcon className="w-4 h-4 text-amber-400" /> On-Chain Revocation Query</li>
                                </ul>
                                <button
                                    onClick={() => setActiveView('Verifier Portal')}
                                    className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Access Verifier Engine <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
}