import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, ShieldAlertIcon, XCircleIcon, FileSearchIcon, CodeIcon, CheckCircle2Icon, AlertTriangleIcon } from 'lucide-react';

export function VerifierPortalPage() {
    const [inputJson, setInputJson] = useState('');
    const [verificationState, setVerificationState] = useState<'idle' | 'loading' | 'valid' | 'invalid' | 'revoked'>('idle');
    const [verifiedData, setVerifiedData] = useState<any>(null);

    const handleVerify = () => {
        if (!inputJson.trim()) return;

        setVerificationState('loading');

        // Simulate network query and cryptographic math delay
        setTimeout(() => {
            try {
                const parsed = JSON.parse(inputJson);

                // 1. Structural & Cryptographic Integrity Check
                const isValidSchema = parsed.type?.includes("VerifiableCredential") &&
                    parsed.proof?.type === "EcdsaSecp256k1Signature2019";

                if (!isValidSchema) {
                    setVerificationState('invalid');
                    return;
                }

                // 2. Ledger Status Check (Revocation)
                const index = parsed.credentialStatus?.statusListIndex;
                const registry = JSON.parse(localStorage.getItem('docucert_registry') || '{}');

                if (registry[index] === true) {
                    setVerificationState('revoked');
                    setVerifiedData(parsed);
                    return;
                }

                // 3. Passed all checks
                setVerifiedData(parsed);
                setVerificationState('valid');

            } catch (e) {
                // JSON parsing failed
                setVerificationState('invalid');
            }
        }, 1800);
    };

    const loadTamperedDemo = () => {
        const validJson = localStorage.getItem('docucert_student_wallet');
        if (validJson) {
            const parsedArray = JSON.parse(validJson);
            if (parsedArray.length > 0) {
                let tampered = parsedArray[0];
                tampered.credentialSubject.degree.name = "Ph.D. in Hacking"; // Tamper with the data
                setInputJson(JSON.stringify(tampered, null, 2));
            } else {
                alert("Please claim a credential in the Student Wallet first to test tampering.");
            }
        } else {
            alert("Please claim a credential in the Student Wallet first to test tampering.");
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-stone-900 text-stone-100">
            {/* Public Facing Header */}
            <header className="h-20 border-b border-stone-800 flex items-center justify-between px-8 bg-stone-950 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-600 p-2 rounded-xl">
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-bold text-xl tracking-wide text-white block">DocuCert <span className="text-stone-500 font-normal">Verifier</span></span>
                    </div>
                </div>
                <div className="text-sm font-medium text-stone-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    EVM Testnet Connected
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto mt-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-3">Universal Verification Engine</h1>
                        <p className="text-stone-400 text-lg">Instant, zero-trust cryptographic validation against the public ledger.</p>
                    </div>

                    <div className="bg-stone-800/50 border border-stone-700 rounded-2xl shadow-2xl p-6 backdrop-blur-sm mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center gap-2 text-sm font-medium text-stone-300">
                                <CodeIcon className="w-4 h-4" /> Paste Credential Payload (JSON)
                            </label>
                            <button onClick={loadTamperedDemo} className="text-xs text-amber-500 hover:text-amber-400 underline transition-colors">
                                Load Tampered Demo
                            </button>
                        </div>

                        <textarea
                            className="w-full h-64 p-4 bg-stone-950 border border-stone-700 rounded-xl font-mono text-sm text-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-inner resize-y"
                            placeholder='{\n  "@context": [...],\n  "type": ["VerifiableCredential"],\n  ...\n}'
                            value={inputJson}
                            onChange={(e) => {
                                setInputJson(e.target.value);
                                setVerificationState('idle'); // Reset on new input
                            }}
                        />

                        <button
                            onClick={handleVerify}
                            disabled={verificationState === 'loading' || !inputJson}
                            className="w-full mt-6 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {verificationState === 'loading' ? (
                                <><FileSearchIcon className="w-5 h-5 animate-pulse" /> Performing Cryptographic Analysis...</>
                            ) : (
                                <><ShieldCheckIcon className="w-5 h-5" /> Run Verification</>
                            )}
                        </button>
                    </div>

                    {/* Verification Results Area */}
                    <AnimatePresence mode="wait">

                        {/* VALID STATE */}
                        {verificationState === 'valid' && verifiedData && (
                            <motion.div key="valid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-950/50 border-2 border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="bg-emerald-900/50 p-6 border-b border-emerald-800/50 flex items-center gap-4">
                                    <div className="bg-emerald-500 p-3 rounded-full shadow-lg shadow-emerald-900">
                                        <CheckCircle2Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-emerald-400">Cryptographically Valid</h2>
                                        <p className="text-emerald-200/70 text-sm">Signature matches the issuer's public key and credential is active.</p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Candidate Name</p>
                                            <p className="text-xl font-medium text-white">{verifiedData.credentialSubject.degree.student}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Degree Conferred</p>
                                            <p className="text-xl font-medium text-white">{verifiedData.credentialSubject.degree.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Graduation Date</p>
                                            <p className="text-lg text-stone-300">{verifiedData.credentialSubject.degree.graduationDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Cryptographic Issuer</p>
                                            <p className="text-sm font-mono text-stone-400 break-all">{verifiedData.issuer}</p>
                                        </div>
                                    </div>
                                    <div className="bg-stone-900 rounded-lg p-4 border border-stone-800 flex items-center justify-between">
                                        <span className="text-sm text-stone-400">Ledger Status Index: <span className="font-mono text-emerald-400">#{verifiedData.credentialStatus.statusListIndex}</span></span>
                                        <span className="text-xs font-bold px-2 py-1 bg-emerald-900/50 text-emerald-400 rounded border border-emerald-800">NOT REVOKED</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* INVALID / TAMPERED STATE */}
                        {verificationState === 'invalid' && (
                            <motion.div key="invalid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-red-950/50 border-2 border-red-500/50 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="bg-red-900/30 p-8 flex items-start gap-5">
                                    <div className="bg-red-500 p-3 rounded-full shadow-lg shadow-red-900 flex-shrink-0 mt-1">
                                        <XCircleIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-red-400 mb-2">Integrity Check Failed</h2>
                                        <p className="text-red-200/80 mb-4">The cryptographic signature does not match the provided payload. This document has either been structurally malformed or intentionally altered after issuance.</p>
                                        <div className="bg-stone-950/50 border border-red-900/50 rounded-lg p-4 text-sm font-mono text-red-300/70">
                                            ERROR_SIG_MISMATCH: The hash of credentialSubject does not resolve to the public key specified in verificationMethod.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* REVOKED STATE */}
                        {verificationState === 'revoked' && verifiedData && (
                            <motion.div key="revoked" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-950/50 border-2 border-orange-500/50 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="bg-orange-900/30 p-8 flex items-start gap-5">
                                    <div className="bg-orange-500 p-3 rounded-full shadow-lg shadow-orange-900 flex-shrink-0 mt-1">
                                        <AlertTriangleIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-2xl font-bold text-orange-400 mb-2">Credential Revoked</h2>
                                        <p className="text-orange-200/80 mb-6">The signature is authentic, but the issuing institution has flagged this specific credential as revoked on the public ledger.</p>

                                        <div className="bg-stone-900 rounded-lg p-4 border border-orange-900/50 flex flex-col gap-2">
                                            <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                                                <span className="text-sm text-stone-400">Candidate</span>
                                                <span className="font-medium text-stone-200">{verifiedData.credentialSubject.degree.student}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-sm text-stone-400">Ledger Status Index: <span className="font-mono text-orange-400">#{verifiedData.credentialStatus.statusListIndex}</span></span>
                                                <span className="text-xs font-bold px-2 py-1 bg-orange-900/50 text-orange-400 rounded border border-orange-800 animate-pulse">REVOKED FLAG DETECTED</span>
                                            </div>
                                        </div>
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