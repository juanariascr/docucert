import React, { useState } from 'react';
import { Header } from '../components/Header';
import { UploadTabs } from '../components/UploadTabs';
import { FileUploadZone } from '../components/FileUploadZone';
import { CSVPreviewTable } from '../components/CSVPreviewTable';
import { ManualEntryForm } from '../components/ManualEntryForm';

export function UploadPage() {
    const [activeTab, setActiveTab] = useState<'csv' | 'manual'>('csv');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf9]">
            <Header />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-stone-900">Upload Student Data</h1>
                        <p className="text-stone-500 mt-1">Import graduating class data to generate certificates.</p>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 mb-8">
                        <UploadTabs activeTab={activeTab} onChange={setActiveTab} />
                        <div className="mt-6">
                            {activeTab === 'csv' ? (
                                <div className="max-w-3xl">
                                    <FileUploadZone onFileSelect={setUploadedFile} />
                                </div>
                            ) : (
                                <ManualEntryForm />
                            )}
                        </div>
                    </div>

                    {activeTab === 'csv' && uploadedFile && <CSVPreviewTable />}
                </div>
            </main>
        </div>
    );
}