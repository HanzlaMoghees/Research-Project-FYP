import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { RepositoryView } from './components/repository/RepositoryView';
import { FeaturedView } from './components/featured/FeaturedView';
import { ProjectDetailPage } from './components/repository/ProjectDetailPage';
import { StudentProjectsView } from './components/projects/StudentProjectsView';
import { SupervisorPortalView } from './components/supervisor/SupervisorPortalView';
import { AdminConsoleView } from './components/admin/AdminConsoleView';
import { AnalyticsDashboardView } from './components/dashboard/AnalyticsDashboardView';

import { CreateProjectModal } from './components/projects/CreateProjectModal';
import { MilestoneDetailModal } from './components/milestones/MilestoneDetailModal';
import { DocumentViewerModal } from './components/milestones/DocumentViewerModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileModal } from './components/auth/ProfileModal';
import { PersonaBanner } from './components/layout/PersonaBanner';
import { LocalRunModal } from './components/common/LocalRunModal';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar with 3-Zone Contract */}
      <Navbar />

      {/* Role State Banner & Local Run Guide Trigger */}
      <PersonaBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'repository' && <RepositoryView />}
        {activeView === 'featured' && <FeaturedView />}
        {activeView === 'project_detail' && <ProjectDetailPage />}
        {activeView === 'student_projects' && <StudentProjectsView />}
        {activeView === 'supervisor_portal' && <SupervisorPortalView />}
        {activeView === 'admin_console' && <AdminConsoleView />}
        {activeView === 'analytics_dashboard' && <AnalyticsDashboardView />}
      </main>

      {/* Global Academic Repository Footer */}
      <Footer />

      {/* Modals & Portals */}
      <CreateProjectModal />
      <MilestoneDetailModal />
      <DocumentViewerModal />
      <NotificationDrawer />
      <AuthModal />
      <ProfileModal />
      <LocalRunModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
