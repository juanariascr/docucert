import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PresentationIcon, ShieldAlertIcon, NetworkIcon, CodeIcon, LayersIcon, ListChecksIcon } from 'lucide-react';

export function OverviewPage({ setActiveView }: { setActiveView: (view: string) => void }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 'title',
            icon: <PresentationIcon className="w-20 h-20 text-amber-500 mb-6 mx-auto" />,
            title: "DocuCert: Education Digital Diplomas & Certificates",
            content: (
                <div className="text-center space-y-8 mt-4">
                    <p className="text-2xl text-stone-500 font-medium tracking-wide">CSEN 296A-1 Blockchain Project</p>
                    <div className="py-12">
                        <h3 className="text-4xl font-serif text-stone-900 mb-6 leading-tight">Architecting a Secure, <br />Decentralized Platform</h3>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                            Empowering academic institutions to issue tamper-proof Verifiable Credentials (VCs) utilizing EVM Smart Contracts and W3C Identity Standards.
                        </p>
                    </div>
                    <div className="pt-10 border-t border-stone-200 inline-block px-16">
                        <p className="text-xl font-bold text-stone-900 mb-1">Juan Diego Arias Martinez</p>
                        <p className="text-lg text-stone-500">Product Manager & Engineer</p>
                    </div>
                </div>
            )
        },
        {
            id: 'problem',
            icon: <ShieldAlertIcon className="w-16 h-16 text-red-500 mb-6" />,
            title: "The Problem Landscape",
            content: (
                <div className="space-y-8">
                    <p className="text-2xl text-stone-700 leading-relaxed">
                        Validating a person's diploma, certificate, or transcript poses significant challenges and opens the door to massive credential fraud.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-6xl font-black text-red-600 mb-4 drop-shadow-sm">200K</h4>
                            <p className="text-lg text-red-900 font-medium leading-snug">fraudulent degrees are awarded globally each year.</p>
                        </div>
                        <div className="bg-orange-50 border border-orange-100 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-6xl font-black text-orange-600 mb-4 drop-shadow-sm">500K</h4>
                            <p className="text-lg text-orange-900 font-medium leading-snug">Americans currently hold fake degrees.</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-6xl font-black text-amber-600 mb-4 drop-shadow-sm">5%</h4>
                            <p className="text-lg text-amber-900 font-medium leading-snug">estimate of annual revenues lost to fraud schemes involving unqualified hires.</p>
                        </div>
                    </div>
                    <p className="text-lg text-stone-500 italic mt-6 border-l-4 border-stone-300 pl-4">
                        Background checks are manual, costly, and slow, eroding trust and damaging institutional reputation.
                    </p>
                </div>
            )
        },
        {
            id: 'solution',
            icon: <NetworkIcon className="w-16 h-16 text-emerald-500 mb-6" />,
            title: "The Solution: Triangle of Trust",
            content: (
                <div className="flex flex-col items-center">
                    <p className="text-2xl text-stone-700 text-center max-w-4xl mb-12 leading-relaxed">
                        DocuCert operates on a decentralized Public Key Infrastructure (PKI) model consisting of three primary stakeholder groups.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <div className="bg-white border-2 border-stone-200 p-8 rounded-2xl shadow-md text-center hover:border-emerald-300 transition-colors">
                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-stone-400">1</div>
                            <h4 className="text-2xl font-bold text-stone-900 mb-4">The Issuer<br /><span className="text-lg text-stone-500 font-normal">(The Authority)</span></h4>
                            <p className="text-lg text-stone-600 leading-relaxed">Universities cryptographically sign diplomas and anchor them to an EVM revocation registry.</p>
                        </div>
                        <div className="bg-white border-2 border-stone-200 p-8 rounded-2xl shadow-md text-center hover:border-emerald-300 transition-colors">
                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-stone-400">2</div>
                            <h4 className="text-2xl font-bold text-stone-900 mb-4">The Holder<br /><span className="text-lg text-stone-500 font-normal">(The Owner)</span></h4>
                            <p className="text-lg text-stone-600 leading-relaxed">Students maintain self-sovereign ownership of their data in a localized, secure digital wallet.</p>
                        </div>
                        <div className="bg-white border-2 border-stone-200 p-8 rounded-2xl shadow-md text-center hover:border-emerald-300 transition-colors">
                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-stone-400">3</div>
                            <h4 className="text-2xl font-bold text-stone-900 mb-4">The Verifier<br /><span className="text-lg text-stone-500 font-normal">(The Consumer)</span></h4>
                            <p className="text-lg text-stone-600 leading-relaxed">Employers instantly verify mathematical authenticity without intermediaries or delays.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'matrix',
            icon: <ListChecksIcon className="w-16 h-16 text-indigo-500 mb-6" />,
            title: "Feature Prioritization Matrix",
            content: (
                <div className="space-y-6">
                    <p className="text-xl text-stone-700 mb-6">Mapping stakeholder pain points to functional requirements across the product lifecycle.</p>

                    <div className="overflow-hidden rounded-2xl border-2 border-stone-200 shadow-sm bg-white">
                        <table className="w-full text-left text-lg">
                            <thead className="bg-stone-100 border-b-2 border-stone-200 text-stone-800">
                                <tr>
                                    <th className="px-8 py-5 font-bold">Feature</th>
                                    <th className="px-8 py-5 font-bold">Priority</th>
                                    <th className="px-8 py-5 font-bold">Implementation Phase</th>
                                    <th className="px-8 py-5 font-bold">Complexity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">University Login & DID Creation</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold uppercase tracking-wider">P0 (Critical)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wider">MVP</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">Medium</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">Batch Credential Issuance</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold uppercase tracking-wider">P0 (Critical)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wider">MVP</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">High</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">Public Verification Page</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold uppercase tracking-wider">P0 (Critical)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wider">MVP</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">Low</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">Revocation Logic (Status List)</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold uppercase tracking-wider">P0 (Critical)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wider">MVP</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">High</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">Selective Disclosure (Privacy)</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold uppercase tracking-wider">P1 (High)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold tracking-wider">V2 Rollout</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">Very High</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">LinkedIn Integration</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold uppercase tracking-wider">P2 (Medium)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold tracking-wider">V2 Rollout</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">Medium</td>
                                </tr>
                                <tr className="hover:bg-stone-50 transition-colors">
                                    <td className="px-8 py-5 font-medium text-stone-900">Paid API for Background Checks</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-sm font-bold uppercase tracking-wider">P3 (Low)</span></td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-bold tracking-wider">Future</span></td>
                                    <td className="px-8 py-5 text-stone-600 font-medium">Medium</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            id: 'architecture',
            icon: <LayersIcon className="w-16 h-16 text-blue-500 mb-6" />,
            title: "Data Privacy & Architecture",
            content: (
                <div className="space-y-8">
                    <p className="text-2xl text-stone-700 leading-relaxed">
                        To ensure strict compliance with GDPR (Right to be Forgotten) and FERPA, DocuCert explicitly separates the data payload from the cryptographic proof.
                    </p>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-3">Off-Chain (Private)</h4>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-4 marker:text-slate-400">
                                <li>Personally Identifiable Information (PII)</li>
                                <li>Student Name, GPA, and Degree Data</li>
                                <li>Stored strictly in the User's Local Wallet</li>
                                <li>Transmitted peer-to-peer via W3C JSON-LD</li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-blue-50 border-2 border-blue-200 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-3">On-Chain (Public)</h4>
                            <ul className="list-disc list-inside text-lg text-blue-800 space-y-4 marker:text-blue-500">
                                <li>Decentralized Public Key Infrastructure (DPKI)</li>
                                <li>Issuer's DID (Decentralized Identifier)</li>
                                <li>W3C Bitstring Status List (Revocation Registry)</li>
                                <li>Zero gas fees for employers to verify</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'stack',
            icon: <CodeIcon className="w-16 h-16 text-purple-500 mb-6" />,
            title: "Technology Stack",
            content: (
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-2xl font-bold text-stone-900 mb-2">Presentation Layer</h4>
                        <p className="text-lg text-purple-600 font-medium mb-4">React.js, Vite, Tailwind CSS</p>
                        <p className="text-lg text-stone-600 leading-relaxed">Component-based UI ensuring high performance. Node.js polyfills enabled for browser-native cryptographic hashing.</p>
                    </div>
                    <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-2xl font-bold text-stone-900 mb-2">Identity Layer</h4>
                        <p className="text-lg text-purple-600 font-medium mb-4">Veramo Framework, W3C VCs</p>
                        <p className="text-lg text-stone-600 leading-relaxed">TypeScript-native decentralized identity framework managing the JSON-LD canonicalization and signatures.</p>
                    </div>
                    <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-2xl font-bold text-stone-900 mb-2">Application Layer</h4>
                        <p className="text-lg text-purple-600 font-medium mb-4">Java Spring Boot, PostgreSQL</p>
                        <p className="text-lg text-stone-600 leading-relaxed">Enterprise backend handling CSV parsing, business logic, and secure off-chain signing using the University's HSM.</p>
                    </div>
                    <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-2xl font-bold text-stone-900 mb-2">Trust Layer</h4>
                        <p className="text-lg text-purple-600 font-medium mb-4">EVM Testnet, Solidity</p>
                        <p className="text-lg text-stone-600 leading-relaxed">Ethereum Virtual Machine providing the immutable ledger for public keys and the instant global revocation registry.</p>
                    </div>
                </div>
            )
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-stone-900 overflow-hidden relative">

            {/* Presentation Header */}
            <header className="h-20 flex items-center justify-between px-10 z-10 text-stone-400">
                <div className="text-base font-bold tracking-widest uppercase">DocuCert Project Overview</div>
                <div className="text-base font-medium bg-stone-800 px-4 py-1.5 rounded-full">Slide {currentSlide + 1} of {slides.length}</div>
            </header>

            {/* Slide Content Area */}
            <main className="flex-1 flex items-center justify-center p-8 z-10">
                <div className="w-full max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-[#fafaf9] rounded-[2rem] shadow-2xl p-12 md:p-20 min-h-[650px] flex flex-col"
                        >
                            <div className={currentSlide === 0 ? "text-center" : ""}>
                                {slides[currentSlide].icon}
                                <h2 className={`text-5xl font-black text-stone-900 mb-10 ${currentSlide === 0 ? "mx-auto" : ""}`}>
                                    {slides[currentSlide].title}
                                </h2>
                            </div>
                            <div className="flex-1">
                                {slides[currentSlide].content}
                            </div>

                            {/* Call to action on the last slide */}
                            {currentSlide === slides.length - 1 && (
                                <div className="mt-16 text-center animate-in fade-in zoom-in duration-500 delay-300">
                                    <button
                                        onClick={() => setActiveView('Dashboard')}
                                        className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-2xl font-bold text-2xl shadow-xl transition-all flex items-center gap-4 mx-auto hover:scale-105 active:scale-95">
                                        Enter the DocuCert Prototype
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Presentation Controls */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 z-10">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-5 rounded-full bg-stone-800/80 backdrop-blur-sm text-stone-300 hover:bg-stone-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg">
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-5 rounded-full bg-stone-800/80 backdrop-blur-sm text-stone-300 hover:bg-stone-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg">
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-amber-600 blur-[150px]"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900 blur-[150px]"></div>
            </div>
        </div>
    );
}