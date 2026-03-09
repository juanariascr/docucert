import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OverviewPage } from './pages/OverviewPage'; // Import new page
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { StudentWalletPage } from './pages/StudentWalletPage';
import { VerifierPortalPage } from './pages/VerifierPortalPage';

export function App() {
  // Set the Overview Presentation as the default view on load
  const [activeView, setActiveView] = useState('Project Overview');

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Route the Project Overview to the presentation component */}
      {activeView === 'Project Overview' && <OverviewPage setActiveView={setActiveView} />}

      {activeView === 'Dashboard' && <DashboardPage setActiveView={setActiveView} />}
      {activeView === 'Upload Students' && <UploadPage />}
      {activeView === 'Certificates' && <CertificatesPage />}
      {activeView === 'Student Wallet' && <StudentWalletPage />}
      {activeView === 'Verifier Portal' && <VerifierPortalPage />}

      {activeView === 'Settings' && (
        <div className="flex-1 bg-[#fafaf9] p-8 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-stone-400">Settings Page Coming Soon</h2>
        </div>
      )}
    </div>
  );
}