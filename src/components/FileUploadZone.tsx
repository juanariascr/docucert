import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FileTextIcon, XIcon } from 'lucide-react';

interface FileUploadZoneProps {
    onFileSelect: (file: File) => void;
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                setSelectedFile(file);
                onFileSelect(file);
            } else {
                alert('Please upload a valid CSV file.');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (selectedFile) {
        return (
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                        <FileTextIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-stone-900">{selectedFile.name}</h4>
                        <p className="text-xs text-stone-500">{(selectedFile.size / 1024).toFixed(2)} KB • Ready to process</p>
                    </div>
                </div>
                <button onClick={handleRemoveFile} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${isDragging ? 'border-amber-500 bg-amber-50/50' : 'border-stone-300 bg-white hover:border-amber-400 hover:bg-stone-50'}`}>
                <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadCloudIcon className={`w-7 h-7 ${isDragging ? 'text-amber-600' : 'text-stone-500'}`} />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-1">Drag & drop your CSV file here</h3>
                <p className="text-sm text-stone-500 mb-6">or click to browse from your computer</p>
                <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-sm">
                    Browse Files
                </button>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <div className="mt-0.5">
                    <FileTextIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-blue-900">CSV Format Requirements</h4>
                    <p className="text-sm text-blue-700 mt-1">
                        Expected columns: <span className="font-mono bg-blue-100 px-1 py-0.5 rounded">Name</span>, <span className="font-mono bg-blue-100 px-1 py-0.5 rounded">Major</span>, <span className="font-mono bg-blue-100 px-1 py-0.5 rounded">Graduation Date</span>, <span className="font-mono bg-blue-100 px-1 py-0.5 rounded">Student Email</span>
                    </p>
                </div>
            </div>
        </div>
    );
}